# Project Structure

## Purpose

- Develop a Framework for API testing and automation.
- The framework enables to create each endpoint test case and scenario and suite wise execution.
- The user write test in following structure:
  - Endpoint -> Request -> Scenario -> Suite
  - Suite contains Scenario, and Scenario composed of Requests.
  - Request is the actual API call to Endpoint with input parameters and expected output.

## Endpoint Definition

- Each endpoint represents API specification.

```ts
export interface EndpointDefinition {
    name: string;
    method: HttpMethod;
    path: string;
    contentTypes?: string[];
    accepts?: string[];
    headers?: HeaderDefinition[];
    parameters?: ParameterDefinition[];
}
```

## Request Definition and Request Input

- Each request represents how to call the endpoint.

```ts
export interface RequestDefinition {
    name: string;
    endpoint: EndpointDefinition;
    origin: string;
}
```

```ts
export interface RequestInput {
    path?: Record<string, string>;
    query?: Record<string, string>;
    headers?: Record<string, string>;
    body?: unknown;
}
```

## Parameter Definition

- Each parameter represents the input parameters for the endpoint.

```ts
export interface ParameterDefinition {
    name: string;
    // in: 'path' | 'query' | 'header' | 'body';
    required: boolean;
    description?: string;
}
```

## Header Definition

- Each header represents the input headers for the endpoint.

```ts
export interface HeaderDefinition {
    name: string;
    required: boolean;
    description?: string;
}
```

## Context

- Each context contains variables for the test execution.

```ts
export class Context {
    set(key: string, value: unknown): void;
    get(key: string): unknown;
    entries(): Record<string, unknown>;
}
```

- There are 2 kinds of context:
  - Global Context: It is shared across all the test cases and scenarios.
  - Request Context: It is specific to a test case or scenario.
- Request context is prior to Global context.

## Config Loader

- Config loader loads the configuration files and configure global context.
- configuration files:
  - 1 (highest priority): .{env}.env
  - 2: .env
  - 3: config/{env}.ts
  - 4 (lowest priority): config/default.ts
- env is 'dev' as default. It is designated with `--env` option in command line.

## File Structure

- The user compose test project as follows:

```text
sample-project/
|-- config/
|   |-- default.ts
|   `-- dev.ts
|-- endpoint/
|   |-- get-user-endpoint.ts
|   |-- post-login-endpoint.ts
|   `-- get-profile-endpoint.ts
|-- request/
|   |-- get-user-request.ts
|   |-- post-login-request.ts
|   `-- get-profile-request.ts
|-- scenario/
|   `-- login-profile-scenario.ts
|-- suite/
|   `-- login-profile-suite.ts
|-- .env
`-- .dev.env
```

## Text Interpolation

- `{{ }}` is used for text interpolation in the test case. It can be used in request body, headers, and parameters.
  When the internal variable is not defined, it won't be replaced.

## Executor

- RequestExecutor handles the request execution and response validation.
- ScenarioExecutor handles the scenario execution and response validation.
- SuiteExecutor handles the suite execution and response validation.



