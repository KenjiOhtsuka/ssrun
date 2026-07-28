import { Context } from "./Context.js";
import type { SuiteDefinition, SuiteStep } from "./Suite.js";
import type { ScenarioResult, SuiteResult } from "./Result.js";
import { ScenarioExecutor } from "./ScenarioExecutor.js";

export class SuiteExecutor {
    constructor(
        private readonly scenarioExecutor: ScenarioExecutor
    ) {
    }

    static validate(suite: SuiteDefinition): void {
        for (const step of suite.steps) {
            ScenarioExecutor.validate(step.scenario);
        }
    }

    async execute(
        suite: SuiteDefinition,
        globalContext: Context
    ): Promise<SuiteResult> {
        SuiteExecutor.validate(suite);

        const results: ScenarioResult[] = [];
        const start = Date.now();

        const parallelSteps = [];
        for (const step of suite.steps) {
            if (step.parallel) {
                parallelSteps.push(step);
            } else {
                if (parallelSteps.length > 0) {
                    const parallelResults = await this.executeParallel(parallelSteps, globalContext);
                    results.push(...parallelResults);
                    parallelSteps.length = 0;
                }
                console.log(`[SCENARIO] ${step.scenario.name}`);
                try {
                    const result = await this.scenarioExecutor.execute(step.scenario, new Context(globalContext));
                    results.push(result);
                } catch (err: any) {
                    results.push({
                        name: step.scenario.name,
                        steps: [],
                        duration: 0,
                        success: false,
                        passed: 0,
                        failed: 1,
                        skipped: 0
                    });
                    console.log(`  [FAIL] ${step.scenario.name} — ${err.message ?? String(err)}`);
                }
            }
        }
        if (parallelSteps.length > 0) {
            const parallelResults = await this.executeParallel(parallelSteps, globalContext);
            results.push(...parallelResults);
        }

        const duration = Date.now() - start;
        const passed = results.filter(r => r.success).length;
        const failed = results.filter(r => !r.success).length;
        const success = failed === 0;

        console.log(`========================================`);
        console.log(`  ${suite.name}: ${passed} passed, ${failed} failed (${results.length} total)`);
        console.log(`========================================\n`);

        return {
            name: suite.name,
            scenarios: results,
            duration,
            success,
            passed,
            failed
        };
    }

    private async executeParallel(
        steps: SuiteStep[],
        globalContext: Context
    ): Promise<ScenarioResult[]> {
        const results = await Promise.allSettled(
            steps.map(async (step) => {
                console.log(`[SCENARIO] ${step.scenario.name}`);
                return this.scenarioExecutor.execute(step.scenario, new Context(globalContext));
            })
        );

        return results.map((r, i) => {
            if (r.status === "fulfilled") {
                return r.value;
            } else {
                const reason = r.reason instanceof Error ? r.reason.message : String(r.reason);
                console.log(`  [FAIL] ${steps[i]!!.scenario.name} — ${reason}`);
                return {
                    name: steps[i]!!.scenario.name,
                    steps: [],
                    duration: 0,
                    success: false,
                    passed: 0,
                    failed: 1,
                    skipped: 0
                };
            }
        });
    }
}
