---
name: resolve-coderabbit-review
description: Get CodeRabbit review comments on a GitHub PR, validate their reasonableness, and either modify the code or reply to the PR with a comment.
---

# Resolve CodeRabbit Review Comments

## Process

1. **Get Comments**
   Use the `gh` CLI tool to retrieve review comments from the specified PR (or the current branch's PR).
   ```bash
   gh pr view --json url,comments,reviews
   ```
   Extract comments from CodeRabbit (identified by the username `coderabbit`). A comment is considered unresolved if:
   - It has no reply from the author, OR
   - The latest reply is from CodeRabbit (indicating the conversation is still open)

   If `gh` fails or returns no CodeRabbit comments, report the issue and stop.

2. **Validate Reasonableness**
   Validate reasonableness of each comment based on the following criteria:
   * Does it improve code safety (bug prevention, security)?
   * Does it align with the project's naming conventions, architecture, and purpose?
   * Is it a false positive or misunderstanding of intentional design by CodeRabbit?

   If two comments contradict each other, prioritize based on:
   1. Safety/security over style
   2. Explicit project conventions over general best practices
   3. Simpler solutions over complex ones

3. **Respond to Comments**
   * **When a comment is reasonable:**
     1. Modify the code in the specified file as per the comment.
     2. Run tests and build to verify the change doesn't break anything:
        ```bash
        npm test
        npm run build
        ```
     3. If tests pass, commit and push the changes.
     4. Leave a concise reply comment on the PR explaining what was changed:
        ```bash
        gh pr comment --body "Addressed: [brief summary of change]"
        ```

   * **When a comment is unreasonable:**
     1. Do not modify the code.
     2. Document the reasons for deeming the comment unnecessary (technical reasoning, existing specifications, intentional design, etc.).
     3. Use `gh pr comment` to leave a clear and understandable reply to CodeRabbit (and the reviewer) explaining why the comment was not acted upon.

## Warnings
* Avoid emotional responses; always respond with technical reasoning and clarity.
* Never commit without running tests first — a "fix" that breaks tests is worse than no fix.
* If unsure about a comment, ask for clarification rather than guessing.
