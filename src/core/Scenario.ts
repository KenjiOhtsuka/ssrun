import type { RequestDefinition, RequestInput }
    from "./Request.js";
import type { RequestResult } from "./Result.js";

export interface ScenarioDefinition {
    name: string;
    steps: ScenarioStep[];
}

export interface ScenarioStep {
    // for request step
    request?: RequestDefinition,
    input?: RequestInput,
    exports?: Record<string, string>,
    assert?: AssertionDefinition | ((result: RequestResult, body: any) => void | Promise<void>);

    // for wait step
    duration?: number,
}

export interface AssertionDefinition {
    status?: number;
    headers?: Record<string, string>;
    json?: Record<string, unknown>;
}
