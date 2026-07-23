import type { Context } from "./Context.js";
import type { ScenarioDefinition } from "./Scenario.js";

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
}
