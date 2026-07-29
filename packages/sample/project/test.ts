#!/usr/bin/env node
import { spawn } from "node:child_process";
import process from "node:process";

import { fileURLToPath } from "node:url";
import path from "node:path";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const projectFlag = "--project";
const projectDir = dirname;

interface Target {
  label: string;
  args: string[];
}

const targets: Target[] = [
  { label: "scenario:login-profile",     args: ["--run", "scenario:login-profile"] },
  { label: "scenario:get-login-profile", args: ["--run", "scenario:get-login-profile"] },
  { label: "scenario:user-crud",         args: ["--run", "scenario:user-crud"] },
  { label: "scenario:product-crud",      args: ["--run", "scenario:product-crud"] },
  { label: "scenario:order-crud",        args: ["--run", "scenario:order-crud"] },
  { label: "scenario:auth-flow",         args: ["--run", "scenario:auth-flow"] },
  { label: "scenario:full-app",          args: ["--run", "scenario:full-app"] },

  { label: "request:health-check",       args: ["--run", "request:health-check"] },
  { label: "request:list-users",         args: ["--run", "request:list-users"] },
  { label: "request:get-user",           args: ["--run", "request:get-user", "--path", "id=1"] },
  { label: "request:create-user",        args: ["--run", "request:create-user", "--body", JSON.stringify({ name: "New User", email: "new@example.com" })] },
  { label: "request:update-user",        args: ["--run", "request:update-user", "--path", "id=1"] },
  { label: "request:delete-user",        args: ["--run", "request:delete-user", "--path", "id=1"] },
  { label: "request:post-login",         args: ["--run", "request:post-login", "--body", JSON.stringify({ username: "administrator", password: "dev-password" })] },
  { label: "request:register",           args: ["--run", "request:register"] },
  { label: "request:get-profile",        args: ["--run", "request:get-profile", "--header", "Authorization=Bearer abc123"] },
  { label: "request:update-profile",     args: ["--run", "request:update-profile", "--header", "Authorization=Bearer abc123"] },
  { label: "request:refresh-token",      args: ["--run", "request:refresh-token", "--header", "Authorization=Bearer refresh_xyz789"] },
  { label: "request:logout",             args: ["--run", "request:logout", "--header", "Authorization=Bearer abc123"] },
  { label: "request:list-products",      args: ["--run", "request:list-products", "--query", "category=electronics", "--query", "page=1", "--query", "limit=10"] },
  { label: "request:get-product",        args: ["--run", "request:get-product", "--path", "id=101"] },
  { label: "request:create-product",     args: ["--run", "request:create-product"] },
  { label: "request:update-product",     args: ["--run", "request:update-product", "--path", "id=101"] },
  { label: "request:delete-product",     args: ["--run", "request:delete-product", "--path", "id=101"] },
  { label: "request:list-orders",        args: ["--run", "request:list-orders"] },
  { label: "request:get-order",          args: ["--run", "request:get-order", "--path", "id=1001"] },
  { label: "request:create-order",       args: ["--run", "request:create-order"] },
  { label: "request:update-order-status", args: ["--run", "request:update-order-status", "--path", "id=1001"] },
  { label: "request:delete-order",       args: ["--run", "request:delete-order", "--path", "id=1001"] },
  { label: "request:search",             args: ["--run", "request:search", "--query", "q=test"] },
];

const labelWidth = targets.reduce((w, t) => Math.max(w, t.label.length), 0);

async function runTarget(target: Target): Promise<boolean> {
  return new Promise((resolve) => {
    const mainScript = path.join(dirname, "../../core/src/main.ts");
    const child = spawn(
      process.execPath,
      ["--import", "tsx", mainScript, projectFlag, projectDir, ...target.args],
      {
        stdio: "inherit",
      }
    );
    child.on("close", (code) => {
      resolve(code === 0);
    });
    child.on("error", () => {
      resolve(false);
    });
  });
}

async function main() {
  const results: { label: string; pass: boolean }[] = [];

  for (const target of targets) {
    console.log(`\n=== ${target.label} ===`);
    const pass = await runTarget(target);
    results.push({ label: target.label, pass });
  }

  const width = 60;
  console.log("\n" + "=".repeat(width));
  console.log("  Results");
  console.log("=".repeat(width));
  for (const r of results) {
    const status = r.pass ? "PASS" : "FAIL";
    const padded = r.label.padEnd(labelWidth);
    const prefix = r.pass ? "  " : "  ";
    console.log(`  ${padded}  ${status}`);
  }
  console.log("-".repeat(width));
  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass).length;
  console.log(`  ${passed} passed, ${failed} failed (${results.length} total)`);
  console.log("=".repeat(width) + "\n");

  if (failed > 0) process.exitCode = 1;
}

main();
