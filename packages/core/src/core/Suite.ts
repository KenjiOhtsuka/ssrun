import type { ScenarioDefinition } from "./Scenario.js";

export interface SuiteDefinition {
    name: string;
    steps: SuiteStep[];
}

export interface SuiteStep {
    scenario: ScenarioDefinition;
    parallel?: boolean;
}