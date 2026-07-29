# ssrun — Scenario & Suite Runner CLI

`ssrun` is a lightweight command-line runner for API testing based on **Scenarios** and **Suites**.
It allows you to describe API flows as TypeScript modules and execute them as ordered or parallel sequences.

- Scenario execution (multiple requests forming a flow)
- Suite execution (multiple scenarios forming a larger flow)
- Parallel execution blocks
- Context isolation per scenario
- Assertions on status codes, headers, and JSON response bodies
- Wait steps between requests
- Environment-specific configuration
- Exit code `1` on any failure

`ssrun` is designed for developers who want to test API behavior as **flows**, not isolated calls.

---

## Features

- **Scenario Runner**
  Execute a sequence of API requests with shared context, assertions, and exports.

- **Suite Runner**
  Execute multiple scenarios in order, or in parallel blocks.

- **Parallel Execution**
  Consecutive steps marked with `parallel: true` are executed concurrently.

- **Context Isolation**
  Each scenario receives its own context instance derived from the global context.

- **Assertions**
  Validate response status, headers, and JSON body fields after each request.

- **Wait Steps**
  Insert delays between requests with `duration` (milliseconds).

- **Environment Configuration**
  Load config from `.env`, `.dev.env`, `config/default.ts`, and `config/{env}.ts`.

- **Reporting**
  pytest-style output with pass/fail/skip status, timing, and summary counts.

---

## Installation

Global installation:

```bash
npm install -g @kenjiotsuka/ssrun
```

Or run via npx:

```bash
npx @kenjiotsuka/ssrun --project ./my-api-tests --run scenario:login
```

---

## Usage

### Run a Scenario

```bash
ssrun --project ./my-api-tests --run scenario:login-profile
```

### Run a Suite

```bash
ssrun --project ./my-api-tests --run suite:full-flow
```

### Run a Single Request

```bash
ssrun --project ./my-api-tests --run request:get-user --path id=1
```

With inline parameters:

```bash
ssrun --project ./my-api-tests --run request:login \
  --body '{"username":"admin","password":"secret"}'
```

### Multiple Targets

```bash
ssrun --project ./my-api-tests \
  --run scenario:setup \
  --run scenario:main-test \
  --run scenario:teardown
```

### CLI Options

| Flag | Description |
|------|-------------|
| `--project <dir>` | Project root directory (default: cwd) |
| `--env <name>` | Environment name (default: `dev`) |
| `--run <target>` | Target to run (`scenario:<name>`, `suite:<name>`, `request:<name>`) |
| `--input <name>` | Use predefined input from `request/input/<name>.ts` |
| `--path key=value` | Path parameter (repeatable) |
| `--query key=value` | Query parameter (repeatable) |
| `--header key=value` | Header (repeatable) |
| `--body <json>` | Request body (JSON string) |

---

## Project Structure

A typical test project:

```text
my-api-tests/
  endpoint/
    user.ts          # GET /api/users/{id}
    login.ts         # POST /api/auth/login
  request/
    get-user.ts      # Combines endpoint + origin
    post-login.ts
  scenario/
    login-profile.ts # Sequences requests with assertions
  config/
    default.ts       # Shared config (origin, credentials)
    dev.ts           # Dev-specific overrides
  .env               # Environment variables
  .dev.env           # Dev-specific env variables
```

---

## Scenario Definition Example

```typescript
import { login, loginInput } from "../request/post-login.js";
import { profile, profileInput } from "../request/get-profile.js";

import type { ScenarioDefinition } from "@kenjiotsuka/ssrun/core/Scenario.js";

export const loginProfileScenario: ScenarioDefinition = {
  name: "login-profile",

  steps: [
    {
      request: login,
      input: loginInput,
      exports: { token: "token" },
      assert: {
        status: 200,
        json: { tokenType: "Bearer" }
      }
    },
    {
      request: profile,
      input: profileInput,
      assert: {
        status: 200,
        json: { name: "Taro" }
      }
    }
  ]
};
```

### Assertions

```typescript
assert: {
  status: 200,
  headers: { "content-type": "application/json" },
  json: { id: 1, name: "expected-name" }
}
```

### Wait Steps

```typescript
{
  duration: 1000  // wait 1 second before next step
}
```

### Exports

```typescript
exports: { variableName: "responseKey" }
```

Exports map context variable names to top-level response body keys.

---

## Suite Definition Example

```typescript
import { loginProfileScenario } from "../scenario/login-profile.js";
import { userCrudScenario } from "../scenario/user-crud.js";

import type { SuiteDefinition } from "@kenjiotsuka/ssrun/core/Suite.js";

export const fullFlowSuite: SuiteDefinition = {
  name: "full-flow",

  steps: [
    { scenario: loginProfileScenario },
    { scenario: userCrudScenario, parallel: true }
  ]
};
```

---

## Configuration

Config is loaded in priority order (highest wins):

1. `.{env}.env` (e.g., `.dev.env`)
2. `.env`
3. `config/{env}.ts` (e.g., `config/dev.ts`)
4. `config/default.ts`

All config values are available via `{{ variableName }}` interpolation in requests.

---

## Context Interpolation

Use `{{ variable }}` syntax in request bodies, headers, and parameters:

```typescript
{
  headers: { Authorization: "{{ token }}" },
  body: { userId: "{{ userId }}" }
}
```

Variables are resolved from the context at execution time.

---

## Exit Codes

- `0` — All scenarios and requests passed
- `1` — Any assertion failure or error

---

## Development

This project uses npm workspaces:

```text
ssrun/
├── packages/
│   ├── core/       ← @kenjiotsuka/ssrun (framework source)
│   └── sample/
│       ├── project/  ← Sample test project
│       └── mappings/ ← WireMock stubs
├── tsconfig.base.json
└── package.json
```

```bash
npm install
npm test          # Run unit tests
npm run build     # Build core to dist/
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## License

MIT
