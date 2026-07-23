import type { RequestDefinition, RequestInput }
    from "./Request.js";

export interface ScenarioDefinition {
    name: string;
    steps: ScenarioStep[];
}
/**
 * ScenarioStep represents a single step in a scenario, which can be either a request step or a wait step.
 * So either reqeuest or wait is required, but not both.
 */
export interface ScenarioStep {
    // for request step
    request?: RequestDefinition,
    input?: RequestInput,
    exports?: Record<string, string>,
    // for wait step
    duration?: number,
}
export interface ScenarioStepBase {
  name?: string;
}
export interface ScenarioRequestStep extends ScenarioStepBase {
  type: "request";
  request: RequestDefinition;
  input?: RequestInput;
  exports?: Record<string, string>;
}
export interface ScenarioWaitStep extends ScenarioStepBase {
  type: "wait";
  duration: number; // in milliseconds
}
export type ScenarioInnerStep = ScenarioRequestStep | ScenarioWaitStep;

export interface StepResult {
    step: ScenarioInnerStep;
    input: Record<string, any>;
    response: Response;
    output: Record<string, unknown>;
}

export interface ResponseResolver {
    resolve(
        response: Response,
    ): Promise<Record<string, unknown>>;
}
