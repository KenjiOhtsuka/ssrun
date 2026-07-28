import type { Context } from "./Context.js";
import type { AssertionDefinition, ScenarioDefinition } from "./Scenario.js";
import type { RequestResult, ScenarioResult, StepResult } from "./Result.js";

import { RequestExecutor } from "./RequestExecutor.js";

export class ScenarioExecutor {

    constructor(
        private readonly requestExecutor =
            new RequestExecutor()
    ) {
    }

    static validate(scenario: ScenarioDefinition): void {
        for (const step of scenario.steps) {
            if (step.duration == null && step.request == null) {
                throw new Error(`Invalid step in scenario ${scenario.name}: either duration or request must be specified`);
            }
        }
    }

    async execute(
        scenario: ScenarioDefinition,
        context: Context
    ): Promise<ScenarioResult> {
        const steps: StepResult[] = [];
        let failed = false;
        const start = Date.now();

        for (const step of scenario.steps) {
            if (failed) {
                const stepType: "request" | "wait" = step.request != null ? "request" : "wait";
                const stepName = stepType === "request"
                    ? (step.request?.name ?? "request")
                    : `wait ${step.duration}ms`;
                steps.push({
                    name: stepName,
                    type: stepType,
                    duration: 0,
                    success: false,
                    skipped: true
                });
                continue;
            }

            if (step.duration != null) {
                const waitStart = Date.now();
                console.log(`  [WAIT] ${step.duration}ms`);
                await new Promise(resolve => setTimeout(resolve, step.duration));
                steps.push({
                    name: `wait ${step.duration}ms`,
                    type: "wait",
                    duration: Date.now() - waitStart,
                    success: true,
                    skipped: false
                });
            } else if (step.request != null) {
                const request = step.request;
                const result = await this.requestExecutor.execute(
                    request,
                    step.input ?? null,
                    context
                );

                if (!result.success) {
                    steps.push({
                        name: result.name,
                        type: "request",
                        duration: result.duration,
                        success: false,
                        statusCode: result.status,
                        error: result.error,
                        skipped: false
                    });
                    failed = true;
                    console.log(`  [FAIL] ${result.name} (${result.duration}ms) — ${result.error}`);
                    continue;
                }

                let assertError: string | undefined;
                if (step.assert) {
                    try {
                        await this.assertResponse(step.assert, result);
                    } catch (err: any) {
                        assertError = err.message;
                    }
                }

                if (step.exports) {
                    const body = result.body;
                    if (body && typeof body === "object") {
                        for (
                            let [contextKey, responseKey] of Object.entries(step.exports)
                        ) {
                            context.set(contextKey, (body as Record<string, unknown>)[responseKey]);
                        }
                    }
                }

                const stepSuccess = assertError == null;
                steps.push({
                    name: result.name,
                    type: "request",
                    duration: result.duration,
                    success: stepSuccess,
                    statusCode: result.status,
                    error: assertError,
                    skipped: false
                });

                if (stepSuccess) {
                    console.log(`  [PASS] ${result.name} (${result.duration}ms)`);
                } else {
                    console.log(`  [FAIL] ${result.name} (${result.duration}ms) — ${assertError}`);
                    failed = true;
                }
            } else {
                throw new Error("Invalid step");
            }
        }

        const duration = Date.now() - start;
        const passed = steps.filter(s => s.success && !s.skipped).length;
        const failedCount = steps.filter(s => !s.success && !s.skipped).length;
        const skipped = steps.filter(s => s.skipped).length;
        const success = failedCount === 0;

        console.log(`\n===== ${scenario.name}: ${passed} passed, ${failedCount} failed, ${skipped} skipped (${steps.length} total) =====\n`);

        return {
            name: scenario.name,
            steps,
            duration,
            success,
            passed,
            failed: failedCount,
            skipped
        };
    }

    private async assertResponse(
        assert: AssertionDefinition | ((result: RequestResult, body: any) => void | Promise<void>),
        result: RequestResult
    ) {
        const body = result.body;

        try {
            // ① 関数形式の assertion
            if (typeof assert === "function") {
                await assert(result, body);
                return;
            }

            // ② オブジェクト形式の assertion（status, headers, json）
            if (assert.status !== undefined && assert.status !== result.status) {
                throw new Error(`Expected status ${assert.status}, got ${result.status}`);
            }

            if (assert.headers && result.headers) {
                for (const [headerKey, expectedValue] of Object.entries(assert.headers)) {
                    const actualValue = result.headers[headerKey.toLowerCase()];
                    if (actualValue === undefined) {
                        throw new Error(`Expected header ${headerKey} to exist`);
                    }
                    if (actualValue !== expectedValue) {
                        throw new Error(`Expected header ${headerKey} "${expectedValue}", got "${actualValue}"`);
                    }
                }
            }

            if (assert.json && body && typeof body === "object") {
                for (const [key, expected] of Object.entries(assert.json)) {
                    if (expected === "exists") {
                        if (!(key in body)) {
                            throw new Error(`Expected body.${key} to exist`);
                        }
                    } else if ((body as Record<string, unknown>)[key] !== expected) {
                        throw new Error(`body.${key}: expected ${expected}, got ${(body as Record<string, unknown>)[key]}`);
                    }
                }
            }
        } catch (err: any) {
            throw new Error(`[ASSERTION FAILED] ${err.message}`);
        }
    }

}
