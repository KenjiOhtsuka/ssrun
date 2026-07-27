// RequestExecutor.ts

import { Context } from "./Context.js";
import type { RequestDefinition, RequestInput } from "./Request.js";
import type { RequestResult } from "./Result.js";

export class RequestExecutor {

    private resolveString(
        text: string,
        context: Context
    ): string {
        return text.replace(
            /\{\{\s*(.*?)\s*\}\}/g,
            (_, key) => {
                const value = context.get(key.trim());

                return value == null
                    ? ""
                    : String(value);
            }
        );
    }

    private resolveUrl(
        origin: string,
        path: string,
        context: Context,
        input: RequestInput | null = null
    ): string {
        let url = `${origin}${path}`;
        url = this.resolveString(url, context);
        if (input?.path) {
            for (const [key, value] of Object.entries(input.path)) {
                url = url.replace(
                    new RegExp(`\\{\\s*${key}\\s*\\}`, "g"),
                    String(value)
                );
            }
        }

        if (input?.query) {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(input.query)) {
                params.set(key, this.resolveString(String(value), context));
            }
            const qs = params.toString();
            if (qs) {
                url += (url.includes("?") ? "&" : "?") + qs;
            }
        }

        return url;
    }

    private resolveBody(
        body: unknown,
        context: Context
    ): unknown {
        if (body == null) return undefined;
        if (typeof body === "string") return this.resolveString(body, context);
        if (typeof body === "object") {
            const resolved: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
                if (typeof value === "string") {
                    resolved[key] = this.resolveString(value, context);
                } else {
                    resolved[key] = value;
                }
            }
            return resolved;
        }
        return body;
    }

    resolve(
        request: RequestDefinition,
        input: RequestInput | null = null,
        context: Context | null = null
    ) {
        if (context == null) context = new Context();

        const headers = {
            ...(input?.headers ?? {})
        };

        const resolvedHeaders: Record<string, string> = {};
        for (const [headerKey, headerValue] of Object.entries(headers)) {
            resolvedHeaders[headerKey] =
                this.resolveString(
                    headerValue?.toString() ?? "",
                    context
                );
        }

        return {
            method: request.endpoint.method,

            name: this.resolveString(
                request.name ?? "",
                context
            ),

            url: this.resolveUrl(
                request.origin,
                request.endpoint.path,
                context,
                input
            ),

            headers: resolvedHeaders,

            body: this.resolveBody(input?.body ?? null, context)
        };
    }

    async execute(
        request: RequestDefinition,
        input: RequestInput | null = null,
        context: Context | null = null
    ): Promise<RequestResult> {
        if (context == null) context = new Context();

        const resolved = this.resolve(request, input, context);
        const start = Date.now();

        try {
            const hasBody = resolved.body != null;
            const response = await fetch(
                resolved.url,
                {
                    method: resolved.method,
                    headers: {
                        ...resolved.headers,
                        ...(hasBody ? { "Content-Type": "application/json" } : {})
                    },
                    body: hasBody
                        ? JSON.stringify(resolved.body)
                        : null
                }
            );

            const body = await response.json().catch(() => null);

            return {
                name: resolved.name,
                method: resolved.method,
                url: resolved.url,
                status: response.status,
                duration: Date.now() - start,
                success: true,
                body
            };
        } catch (err: any) {
            return {
                name: resolved.name,
                method: resolved.method,
                url: resolved.url,
                status: 0,
                duration: Date.now() - start,
                success: false,
                error: err.message ?? String(err)
            };
        }
    }
}
