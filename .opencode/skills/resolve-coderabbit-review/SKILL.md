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
   And extract the unresolved comments from CodeRabbit (identified by the username `coderabbit`).

2. **Validate Reasonableness**
   Validate reasonableness of each comment based on the following criteria:
   * Does it improve code safety (bug prevention, security)?
   * Does it align with the project's naming conventions, architecture, and purpose?
   * Is it a false positive or misunderstanding of intentional design by CodeRabbit?

3. **Respond to Comments**
   * **When a comment is deemed reasonable:**
     1. Modify the code in the specified file as per the comment.
     2. Review the changes, and if everything is correct, commit and push the changes.
     3. Leave a concise reply comment on the PR stating "CodeRabbit's comment has been addressed as suggested."
   * **When a comment is deemed unreasonable:**
     1. Do not modify the code.
     2. Document the reasons for deeming the comment unnecessary (technical reasoning, existing specifications, intentional design, etc.).
     3. Use `gh pr comment` to leave a clear and understandable reply to CodeRabbit (and the reviewer) explaining why the comment was not acted upon.

## Warnings
* Avoid emotional responses; always respond with technical reasoning and clarity.
