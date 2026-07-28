---
name: self-review
description: Review your own code changes before committing, ensuring they meet project conventions, type safety, and test coverage.
---

# Self-Review

Use this after making code changes and before committing. It ensures the changes are correct, consistent, and safe.

## Process

1. **Understand the diff**
   ```bash
   git diff
   ```
   Identify all modified files and the scope of changes.

2. **Run tests**
   ```bash
   npm test
   ```
   All tests must pass. If any fail, fix them before proceeding.

3. **Type-check**
   ```bash
   npx tsc --noEmit
   ```
   Ensure no type errors. The project uses `exactOptionalPropertyTypes` — use `error?: string | undefined` in type definitions where needed, not spread-based workarounds.

4. **Check against conventions**

   Verify the changes follow:

   - **Imports**: ESM with `.js` extensions (e.g., `import { X } from "./X.js"`)
   - **Executor pattern**: Request → Scenario → Suite, each with a dedicated executor class
   - **Context precedence**: global context shared, request context takes priority
   - **Text interpolation**: `{{ variable }}` syntax in bodies, headers, parameters
   - **Failure handling**: scenarios stop on first failure (remaining steps skipped), suites execute all
   - **Results**: structured types flowing back to `main.ts` for exit code control (`0` pass, `1` fail)
   - **Assertions**: `status`, `headers` (exact match), `json` (top-level key match)

5. **Review for common issues**

   - **Error handling**: no silent failures. Errors should propagate or be logged.
   - **Edge cases**: null/undefined inputs, empty arrays/objects, missing context variables resolve to `""`
   - **Type safety**: avoid `any` where practical. Use proper TypeScript types.
   - **Naming**: match existing conventions (camelCase, descriptive names)
   - **Scope creep**: each change should address only its intended purpose

6. **WireMock-specific checks** (if modifying mappings)

   - Catch-all stubs need higher numeric priority (e.g., `10`) so specific mappings take precedence
   - `urlPattern` does full-string matching — account for trailing query params: `($|\\?.*)`
   - `matchesJsonPath` with multiple `bodyPatterns` only applies the last entry — use combined filters: `$[?(@.field1 && @.field2)]`
   - Header matchers don't support `startsWith` — use `matches` with regex
   - `notMatchesJsonPath` is not supported — use ordering instead

## Checklist

- [ ] Tests pass (`npm test`)
- [ ] No type errors (`npx tsc --noEmit`)
- [ ] ESM imports with `.js` extensions
- [ ] Error handling covers edge cases
- [ ] Change is scoped to its intended purpose
- [ ] No unnecessary files modified
- [ ] Commit message matches project style
