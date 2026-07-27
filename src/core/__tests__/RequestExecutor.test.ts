import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RequestExecutor } from "../RequestExecutor.js";
import { Context } from "../Context.js";
import { HttpMethod } from "../HttpMethod.js";
import type { RequestDefinition } from "../Request.js";

function makeRequest(
  overrides: Partial<RequestDefinition> = {}
): RequestDefinition {
  return {
    origin: "http://localhost:8080",
    endpoint: {
      name: "test",
      method: HttpMethod.GET,
      path: "/api/test",
    },
    ...overrides,
  };
}

describe("RequestExecutor.resolve", () => {
  const executor = new RequestExecutor();

  it("resolves basic URL", () => {
    const result = executor.resolve(makeRequest());
    assert.strictEqual(result.url, "http://localhost:8080/api/test");
  });

  it("resolves path parameters", () => {
    const req = makeRequest({
      endpoint: { name: "test", method: HttpMethod.GET, path: "/api/users/{id}" },
    });
    const result = executor.resolve(req, { path: { id: 42 } });
    assert.strictEqual(result.url, "http://localhost:8080/api/users/42");
  });

  it("resolves multiple path parameters", () => {
    const req = makeRequest({
      endpoint: {
        name: "test",
        method: HttpMethod.GET,
        path: "/api/users/{userId}/posts/{postId}",
      },
    });
    const result = executor.resolve(req, {
      path: { userId: "abc", postId: 99 },
    });
    assert.strictEqual(result.url, "http://localhost:8080/api/users/abc/posts/99");
  });

  it("resolves query parameters", () => {
    const result = executor.resolve(makeRequest(), {
      query: { page: 1, limit: 10 },
    });
    assert.strictEqual(result.url, "http://localhost:8080/api/test?page=1&limit=10");
  });

  it("resolves context variables in URL", () => {
    const ctx = new Context();
    ctx.set("origin", "http://api.example.com");
    const req = makeRequest({ origin: "{{origin}}" });
    const result = executor.resolve(req, null, ctx);
    assert.strictEqual(result.url, "http://api.example.com/api/test");
  });

  it("path parameters use literal values from input", () => {
    const ctx = new Context();
    ctx.set("userId", "u-123");
    const req = makeRequest({
      endpoint: { name: "test", method: HttpMethod.GET, path: "/api/users/{id}" },
    });
    const result = executor.resolve(req, { path: { id: "u-123" } }, ctx);
    assert.strictEqual(result.url, "http://localhost:8080/api/users/u-123");
  });

  it("resolves object body with interpolation", () => {
    const ctx = new Context();
    ctx.set("name", "Alice");
    const result = executor.resolve(
      makeRequest({ endpoint: { name: "test", method: HttpMethod.POST, path: "/api/users" } }),
      { body: { username: "{{name}}", role: "admin" } },
      ctx
    );
    assert.deepStrictEqual(result.body, { username: "Alice", role: "admin" });
  });

  it("resolves string body with interpolation", () => {
    const ctx = new Context();
    ctx.set("token", "abc123");
    const result = executor.resolve(
      makeRequest({ endpoint: { name: "test", method: HttpMethod.POST, path: "/api/auth" } }),
      { body: '{"token":"{{token}}"}' },
      ctx
    );
    assert.strictEqual(result.body, '{"token":"abc123"}');
  });

  it("resolves headers with interpolation", () => {
    const ctx = new Context();
    ctx.set("token", "Bearer xyz789");
    const result = executor.resolve(
      makeRequest(),
      { headers: { Authorization: "{{token}}" } },
      ctx
    );
    assert.deepStrictEqual(result.headers, { Authorization: "Bearer xyz789" });
  });

  it("returns correct method", () => {
    const req = makeRequest({
      endpoint: { name: "test", method: HttpMethod.POST, path: "/api/data" },
    });
    const result = executor.resolve(req);
    assert.strictEqual(result.method, "POST");
  });

  it("returns resolved name", () => {
    const ctx = new Context();
    ctx.set("env", "staging");
    const req = makeRequest({ name: "test-{{env}}" });
    const result = executor.resolve(req, null, ctx);
    assert.strictEqual(result.name, "test-staging");
  });

  it("returns undefined body when no input body", () => {
    const result = executor.resolve(makeRequest());
    assert.strictEqual(result.body, undefined);
  });

  it("returns empty headers when no input headers", () => {
    const result = executor.resolve(makeRequest());
    assert.deepStrictEqual(result.headers, {});
  });

  it("uses default context when none provided", () => {
    const result = executor.resolve(makeRequest());
    assert.strictEqual(result.url, "http://localhost:8080/api/test");
  });

  it("replaces missing context variables with empty string", () => {
    const req = makeRequest({ origin: "{{missing_origin}}" });
    const result = executor.resolve(req);
    assert.strictEqual(result.url, "/api/test");
  });

  it("resolves path and query together", () => {
    const req = makeRequest({
      endpoint: { name: "test", method: HttpMethod.GET, path: "/api/users/{id}" },
    });
    const result = executor.resolve(req, {
      path: { id: 5 },
      query: { verbose: true },
    });
    assert.strictEqual(result.url, "http://localhost:8080/api/users/5?verbose=true");
  });

  it("resolves top-level string values in object body", () => {
    const ctx = new Context();
    ctx.set("city", "Tokyo");
    const result = executor.resolve(
      makeRequest({ endpoint: { name: "test", method: HttpMethod.PUT, path: "/api/profile" } }),
      {
        body: {
          name: "Bob",
          address: { city: "{{city}}", zip: "100-0001" },
        },
      },
      ctx
    );
    assert.deepStrictEqual(result.body, {
      name: "Bob",
      address: { city: "{{city}}", zip: "100-0001" },
    });
  });
});
