# Contributing to ssrun

## Development Setup

```bash
npm install
```

## Running Tests

Unit tests (no external dependencies):

```bash
npm test
```

Integration tests (requires WireMock):

Run WireMock in one terminal:
```bash
cd packages/sample
java -jar wiremock-standalone-3.13.2.jar
```
In another terminal:
```
node --import tsx packages/sample/project/test.ts
```

Or run a single scenario:

```bash
node --import tsx packages/core/src/main.ts --run scenario:login-profile --project packages/sample/project
```

## Project Structure

```
ssrun/
├── packages/
│   ├── core/                    ← @kenjiotsuka/ssrun (framework source)
│   │   ├── src/
│   │   │   ├── main.ts          ← CLI entry point
│   │   │   └── core/
│   │   │       ├── __tests__/   ← Unit tests (node:test + node:assert)
│   │   │       ├── ConfigLoader.ts
│   │   │       ├── Context.ts
│   │   │       └── ...
│   │   └── package.json
│   └── sample/
│       ├── project/             ← Sample test project
│       │   ├── endpoint/
│       │   ├── request/
│       │   ├── scenario/
│       │   ├── suite/
│       │   └── config/
│       └── mappings/            ← WireMock stub definitions (JSON)
├── tsconfig.base.json
└── package.json
```

## Adding Tests

Test files go in `packages/core/src/core/__tests__/` and follow the `*.test.ts` naming convention. Tests use Node.js built-in `node:test` and `node:assert/strict`.

```bash
# Run a single test file
node --import tsx --test packages/core/src/core/__tests__/Context.test.ts

# Run all tests
npm test
```

## Mock Server

The sample project uses WireMock for mock API responses. Mappings are in `packages/sample/mappings/` as JSON files. Response bodies can be static JSON or loaded from `__files/`.

WireMock 3.x notes:
- Catch-all mappings are fallback/default stubs, not automatically higher precedence than specific mappings. Equal-priority matches use the most recently added stub.
- Lower numeric priorities win (1 is highest). Assign catch-all mappings a higher numeric priority (e.g., `10`) so more specific mappings (priority `1` or default) take precedence.
