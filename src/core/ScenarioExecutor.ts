import type { Context } from "./Context.js";
import type { AssertionDefinition, ScenarioDefinition } from "./Scenario.js";

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
    ): Promise<void> {
        for (const step of scenario.steps) {
            if (step.duration != null) {
                console.log(
                    `[SCENARIO] Waiting for ${step.duration} ms`
                );
                await new Promise(resolve => setTimeout(resolve, step.duration));
            } else if (step.request != null) {
                const request = step.request;
                console.log(
                    `[SCENARIO] ${request.name}`
                );

                const response =
                    await this.requestExecutor.execute(
                        step.request,
                        step.input ?? null,
                        context
                    );
                if (step.assert) {
                    await this.assertResponse(step.assert, response);
                }
                if (step.exports) {
                    const body = await response.json();
                    for (
                        let [contextKey, responseKey] of Object.entries(step.exports)
                    ) {
                        context.set(contextKey, body[responseKey]);
                    }
                }

                console.log(
                    `[STATUS] ${response.status}`
                );
            } else {
                throw new Error("Invalid step");
            }
        }
    }

    private async assertResponse(
        assert: AssertionDefinition | ((res: Response, body: any) => void | Promise<void>),
        response: Response
    ) {
        // Response は一度 json() を読むと消費されるので clone が必要
        const cloned = response.clone();
        const body = await cloned.json().catch(() => null);

        try {
            // ① 関数形式の assertion
            if (typeof assert === "function") {
                await assert(response, body);
                return;
            }

            // ② オブジェクト形式の assertion（status, headers, json）
            if (assert.status !== undefined && assert.status !== response.status) {
                throw new Error(`Expected status ${assert.status}, got ${response.status}`);
            }

            if (assert.headers) {
                for (const [key, expected] of Object.entries(assert.headers)) {
                    const actual = response.headers.get(key);
                    if (actual !== expected) {
                        throw new Error(`Header ${key}: expected ${expected}, got ${actual}`);
                    }
                }
            }

            if (assert.json) {
                for (const [key, expected] of Object.entries(assert.json)) {
                    if (expected === "exists") {
                        if (!(key in body)) {
                            throw new Error(`Expected body.${key} to exist`);
                        }
                    } else if (body[key] !== expected) {
                        throw new Error(`body.${key}: expected ${expected}, got ${body[key]}`);
                    }
                }
            }
        } catch (err: any) {
            throw new Error(`[ASSERTION FAILED] ${err.message}`);
        }
    }

}
