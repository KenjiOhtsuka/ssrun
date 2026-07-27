# AGENTS.md

## Build

```bash
npm run build
```

Outputs to `dist/`.

## Run

```bash
npx tsx src/main.ts --project <projectRoot> --env <environment> --run <target>
```

Targets:
- `scenario:<name>` — Run a scenario
- `suite:<name>` — Run a suite
- `request:<name>` — Run a single request (supports `--input`, `--origin`, `--path`, `--query`, `--header`, `--body`)

## Project Structure

```text
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
    Scenario.ts        # Ordered list of requests
    ScenarioExecutor.ts
    Suite.ts           # Ordered list of scenarios (supports parallel blocks)
    SuiteExecutor.ts
```

## Key Conventions

- **TypeScript with ESM imports** (`.js` extensions in import paths).
- **Executor pattern**: Each level (Request, Scenario, Suite) has a dedicated executor class.
- **Context**: Global context is shared; request context is scenario-scoped and takes priority.
- **Text interpolation**: Use `{{ variable }}` syntax in request bodies, headers, and parameters.
- **Config priority** (highest to lowest): `.{env}.env` → `.env` → `config/{env}.ts` → `config/default.ts`.
- **Default environment**: `dev`.

## User Project Layout

Users structure test projects as:
- `endpoint/` — Endpoint definitions (method, path, params)
- `request/` — Request definitions (endpoint + origin)
- `scenario/` — Scenarios (ordered request sequences)
- `suite/` — Suites (ordered scenario sequences, parallel blocks)
- `config/` — Environment-specific config files
