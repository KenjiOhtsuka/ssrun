---
name: resolve-coderabbit-review
description: Get CodeRabbit review comments on a GitHub PR, validate their reasonableness, and either modify the code or reply to the PR with a comment.
---

# Resolve CodeRabbit Review Comments

## Prerequisites

Before starting, derive the owner/repo and PR number from the current context:
```bash
# Get owner/repo from the git remote
gh repo view --json nameWithOwner --jq .nameWithOwner
# Or for the current PR number
gh pr view --json number --jq .number
```

## Process

1. **Get Comments**

   There are two types of CodeRabbit comments:

   **a) Inline review comments** (attached to specific lines/files). Retrieve them with:
   ```bash
   gh api "/repos/{owner}/{repo}/pulls/{pr}/comments" --jq '.[] | select(.user.login | startswith("coderabbit")) | {id: .id, path: .path, body: .body[0:200]}'
   ```
   Extract comments from CodeRabbit (identified by the bot user `coderabbitai` or `coderabbitai[bot]`). A comment is considered unresolved if:
   - It has no reply from the author, OR
   - The latest reply is from CodeRabbit (indicating the conversation is still open)

   **b) Review-level comments** (summary, nitpick list in the review body). Retrieve with:
   ```bash
   gh pr view {pr} --json reviews --jq '.reviews[] | select(.author.login | startswith("coderabbit")) | .body[0:500]'
   ```

   If `gh` fails or returns no CodeRabbit comments, report the issue and stop.

   **Note for Windows/PowerShell:** Complex `jq` filters with regex (`test()`), `contains()`, or `startswith()` may fail due to quoting issues. If so, save the output to a file and parse with PowerShell:
   ```powershell
   gh api "/repos/{owner}/{repo}/pulls/{pr}/comments" | Out-File comments.json
   # Then use ConvertFrom-Json to filter
   ```

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
     4. Reply to each inline comment thread individually using its comment ID:
        ```bash
        gh api "/repos/{owner}/{repo}/pulls/{pr}/comments/{comment_id}/replies" \
          --field body="Addressed: [brief summary of change]"
        ```
        If the reply body contains special characters (parentheses, quotes), use a file:
        ```powershell
        $body = "Addressed: detailed description"
        $body | gh api "/repos/{owner}/{repo}/pulls/{pr}/comments/{comment_id}/replies" --field body=@-
        ```
     5. (Optional) Leave a PR-level summary of all changes:
        ```bash
        gh pr comment {pr} --body "Summary of all fixes..."
        ```

   * **When a comment is unreasonable:**
     1. Do not modify the code.
     2. Document the reasons for deeming the comment unnecessary (technical reasoning, existing specifications, intentional design, etc.).
     3. Reply to the specific inline comment thread explaining why the comment was not acted upon:
        ```bash
        gh api "/repos/{owner}/{repo}/pulls/{pr}/comments/{comment_id}/replies" \
          --field body="Skipped: [technical reasoning]"
        ```

## Warnings
* Avoid emotional responses; always respond with technical reasoning and clarity.
* Never commit without running tests first — a "fix" that breaks tests is worse than no fix.
* Always reply to each inline comment individually — a single PR summary is not sufficient for resolution.
* If unsure about a comment, ask for clarification rather than guessing.
