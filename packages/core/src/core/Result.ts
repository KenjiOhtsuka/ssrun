export interface RequestResult {
    name: string;
    method: string;
    url: string;
    status: number;
    duration: number;
    success: boolean;
    body?: unknown;
    headers?: Record<string, string>;
    error?: string | undefined;
}

export interface StepResult {
    name: string;
    type: "request" | "wait";
    duration: number;
    success: boolean;
    statusCode?: number;
    error?: string | undefined;
    skipped: boolean;
}

export interface ScenarioResult {
    name: string;
    steps: StepResult[];
    duration: number;
    success: boolean;
    passed: number;
    failed: number;
    skipped: number;
}

export interface SuiteResult {
    name: string;
    scenarios: ScenarioResult[];
    duration: number;
    success: boolean;
    passed: number;
    failed: number;
}
