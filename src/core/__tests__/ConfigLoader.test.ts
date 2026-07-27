import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { ConfigLoader } from "../ConfigLoader.js";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

function makeTmpDir(): string {
  const dir = join(tmpdir(), `ssrun-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(dir, { recursive: true });
  return dir;
}

function writeFile(dir: string, relPath: string, content: string) {
  const full = join(dir, relPath);
  mkdirSync(join(full, ".."), { recursive: true });
  writeFileSync(full, content, "utf-8");
}

describe("ConfigLoader", () => {
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    savedEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = savedEnv;
  });

  it("loads from config/default.ts", async () => {
    const dir = makeTmpDir();
    try {
      writeFile(dir, "config/default.ts", `
        export default {
          API_URL: "http://default.example.com",
          TIMEOUT: "5000"
        };
      `);

      const loader = new ConfigLoader();
      const ctx = await loader.load(dir, "prod");

      assert.strictEqual(ctx.get("API_URL"), "http://default.example.com");
      assert.strictEqual(ctx.get("TIMEOUT"), "5000");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("env-specific config overrides default", async () => {
    const dir = makeTmpDir();
    try {
      writeFile(dir, "config/default.ts", `
        export default {
          API_URL: "http://default.example.com",
          TIMEOUT: "5000"
        };
      `);
      writeFile(dir, "config/staging.ts", `
        export default {
          API_URL: "http://staging.example.com"
        };
      `);

      const loader = new ConfigLoader();
      const ctx = await loader.load(dir, "staging");

      assert.strictEqual(ctx.get("API_URL"), "http://staging.example.com");
      assert.strictEqual(ctx.get("TIMEOUT"), "5000");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("handles missing config files gracefully", async () => {
    const dir = makeTmpDir();
    try {
      const loader = new ConfigLoader();
      const ctx = await loader.load(dir, "nonexistent");

      assert.strictEqual(ctx.get("anything"), undefined);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("loads .env file", async () => {
    const dir = makeTmpDir();
    try {
      writeFile(dir, ".env", "FROM_DOTENV=hello\nANOTHER=value");

      const loader = new ConfigLoader();
      const ctx = await loader.load(dir, "dev");

      assert.strictEqual(ctx.get("FROM_DOTENV"), "hello");
      assert.strictEqual(ctx.get("ANOTHER"), "value");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("env-specific .env overrides base .env", async () => {
    const dir = makeTmpDir();
    try {
      writeFile(dir, ".env", "SHARED_KEY=base\nBASE_ONLY=from_base");
      writeFile(dir, ".staging.env", "SHARED_KEY=env_specific\nENV_ONLY=from_env");

      const loader = new ConfigLoader();
      const ctx = await loader.load(dir, "staging");

      assert.strictEqual(ctx.get("SHARED_KEY"), "env_specific");
      assert.strictEqual(ctx.get("BASE_ONLY"), "from_base");
      assert.strictEqual(ctx.get("ENV_ONLY"), "from_env");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("process.env values are included in context", async () => {
    const dir = makeTmpDir();
    try {
      process.env.SSRUN_TEST_VAR = "from_process_env";

      const loader = new ConfigLoader();
      const ctx = await loader.load(dir, "dev");

      assert.strictEqual(ctx.get("SSRUN_TEST_VAR"), "from_process_env");
    } finally {
      delete process.env.SSRUN_TEST_VAR;
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
