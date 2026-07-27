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

```bash
java -jar wiremock-standalone-3.13.2.jar --root-dir sample-project
# In another terminal (Windows):
cmd /c test.cmd
```

Or run a single scenario:

```bash
npx tsx src/main.ts --run scenario:login-profile --project sample-project
```

## Project Structure

- `src/core/` — Framework source code
- `src/core/__tests__/` — Unit tests (`node:test` + `node:assert`)
- `sample-project/` — Sample test project with WireMock mappings
- `mappings/` — WireMock stub definitions (JSON)
- `__files/` — WireMock response body files

## Adding Tests

Test files go in `src/core/__tests__/` and follow the `*.test.ts` naming convention. Tests use Node.js built-in `node:test` and `node:assert/strict`.

```bash
# Run a single test file
npx tsx --test src/core/__tests__/Context.test.ts

# Run all tests
npm test
```

## Mock Server

The sample project uses WireMock for mock API responses. Mappings are in `mappings/` as JSON files. Response bodies can be static JSON or loaded from `__files/`.

WireMock 3.x note: catch-all mappings (empty `urlPattern` or `url`) will match before more specific patterns. Remove catch-alls or use priority to avoid conflicts.
