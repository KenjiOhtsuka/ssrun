import { Context } from "./Context.js";
import type { SuiteDefinition } from "./Suite.js";
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
    ): Promise<void> {
        SuiteExecutor.validate(suite);

        console.log(
            `[SUITE] ${suite.name}`
        );

        const parallelSteps = []
        for (const step of suite.steps) {
            if (step.parallel) {
                parallelSteps.push(step);
            } else {
                if (parallelSteps.length > 0) {
                    await Promise.all(
                        parallelSteps.map(step => this.scenarioExecutor.execute(step.scenario, new Context(globalContext)))
                    );
                    parallelSteps.length = 0;
                }
                console.log(`[SUITE] Scenario: ${step.scenario.name}`);
                await this.scenarioExecutor.execute(step.scenario, new Context(globalContext));
            }
        }
        if (parallelSteps.length > 0) {
            await Promise.all(
                parallelSteps.map(step => this.scenarioExecutor.execute(step.scenario, new Context(globalContext)))
            );
        }
    }
}