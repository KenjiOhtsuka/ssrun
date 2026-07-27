import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Context } from "../Context.js";

describe("Context", () => {
  it("stores and retrieves values", () => {
    const ctx = new Context();
    ctx.set("key", "value");
    assert.strictEqual(ctx.get("key"), "value");
  });

  it("returns undefined for missing keys", () => {
    const ctx = new Context();
    assert.strictEqual(ctx.get("missing"), undefined);
  });

  it("overwrites existing values", () => {
    const ctx = new Context();
    ctx.set("key", "first");
    ctx.set("key", "second");
    assert.strictEqual(ctx.get("key"), "second");
  });

  it("copies values from base context", () => {
    const base = new Context();
    base.set("a", 1);
    base.set("b", "two");

    const child = new Context(base);
    assert.strictEqual(child.get("a"), 1);
    assert.strictEqual(child.get("b"), "two");
  });

  it("child modifications do not affect base", () => {
    const base = new Context();
    base.set("x", 10);

    const child = new Context(base);
    child.set("x", 20);
    child.set("y", 30);

    assert.strictEqual(base.get("x"), 10);
    assert.strictEqual(base.get("y"), undefined);
  });

  it("base modifications do not affect child", () => {
    const base = new Context();
    base.set("x", 10);

    const child = new Context(base);
    base.set("x", 99);
    base.set("z", 100);

    assert.strictEqual(child.get("x"), 10);
    assert.strictEqual(child.get("z"), undefined);
  });

  it("supports generic type parameter", () => {
    const ctx = new Context();
    ctx.set("count", 42);
    const count = ctx.get<number>("count");
    assert.strictEqual(count, 42);
  });

  it("entries returns all key-value pairs", () => {
    const ctx = new Context();
    ctx.set("a", 1);
    ctx.set("b", 2);

    const entries = [...ctx.entries()];
    assert.deepStrictEqual(entries, [
      ["a", 1],
      ["b", 2],
    ]);
  });

  it("stores various types", () => {
    const ctx = new Context();
    ctx.set("string", "hello");
    ctx.set("number", 123);
    ctx.set("boolean", true);
    ctx.set("array", [1, 2, 3]);
    ctx.set("object", { nested: true });
    ctx.set("null", null);

    assert.strictEqual(ctx.get("string"), "hello");
    assert.strictEqual(ctx.get("number"), 123);
    assert.strictEqual(ctx.get("boolean"), true);
    assert.deepStrictEqual(ctx.get("array"), [1, 2, 3]);
    assert.deepStrictEqual(ctx.get("object"), { nested: true });
    assert.strictEqual(ctx.get("null"), null);
  });
});
