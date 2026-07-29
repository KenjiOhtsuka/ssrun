# AGENTS.md

## Build

```bash
npm run build
```

Outputs to `packages/core/dist/`.

## Test

```bash
npm test
```

Runs unit tests via `node:test`. Test files live in `packages/core/src/core/__tests__/`.

## Run

```bash
npx tsx packages/core/src/main.ts --project <projectRoot> --env <environment> --run <target>
```

Targets:
- `scenario:<name>` — Run a scenario
- `suite:<name>` — Run a suite
- `request:<name>` — Run a single request (supports `--input`, `--origin`, `--path`, `--query`, `--header`, `--body`)

## Project Structure

```text
packages/
  core/
    src/
      main.ts              # CLI entry point, argument parsing, executor orchestration
      core/
        ConfigLoader.ts    # Loads config files (.env, config/*.ts) into global context
        Context.ts         # Variable store (global + request-scoped)
        EndpointDefinition.ts
        HeaderDefinition.ts
        HttpMethod.ts
        ParameterDefinition.ts
        Request.ts         # Request definition
        RequestExecutor.ts # Executes a single API request
        ResolvedRequestDefinition.ts
        Result.ts          # RequestResult, StepResult, ScenarioResult, SuiteResult
        Scenario.ts        # Ordered list of requests + assertion types
        ScenarioExecutor.ts
        Suite.ts           # Ordered list of scenarios (supports parallel blocks)
        SuiteExecutor.ts
        __tests__/         # Unit tests (node:test + node:assert)
          Context.test.ts
          ConfigLoader.test.ts
          RequestExecutor.test.ts
  sample/
    project/               # Sample test project (endpoints, requests, scenarios, config)
    mappings/              # WireMock stub definitions (JSON)
```

## Key Conventions

- **TypeScript with ESM imports** (`.js` extensions in import paths).
- **Executor pattern**: Each level (Request, Scenario, Suite) has a dedicated executor class.
- **Context**: Global context is shared; request context is scenario-scoped and takes priority.
- **Text interpolation**: Use `{{ variable }}` syntax in request bodies, headers, and parameters.
- **Config priority** (highest to lowest): `.{env}.env` → `.env` → `config/{env}.ts` → `config/default.ts`.
- **Default environment**: `dev`.
- **Assertions**: Scenarios support `assert` blocks with `status`, `headers`, and `json` checks.
- **Failure handling**: Scenarios stop on first failure; remaining steps are skipped. Suites execute all scenarios.
- **Exit code**: `0` = all pass, `1` = any failure.
- **Self-review**: Before committing, load the `self-review` skill to run through a review checklist.
- **PR review**: For reviewing GitHub Pull Requests from multiple perspectives (security, correctness, efficiency, etc.), use the `pr-review` agent.

## User Project Layout

Users structure test projects as:
- `endpoint/` — Endpoint definitions (method, path, params)
- `request/` — Request definitions (endpoint + origin)
- `scenario/` — Scenarios (ordered request sequences with assertions)
- `suite/` — Suites (ordered scenario sequences, parallel blocks)
- `config/` — Environment-specific config files
