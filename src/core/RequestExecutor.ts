// RequestExecutor.ts

import { Context } from "./Context.js";
import type { RequestDefinition, RequestInput } from "./Request.js";

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

        return url;
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

            headers: resolvedHeaders
        };
    }

    async execute(
        request: RequestDefinition,
        input: RequestInput | null = null,
        context: Context | null = null
    ): Promise<Response> {

        const resolved =
            this.resolve(
                request,
                input,
                context
            );
        console.log(
            `[REQUEST] ${resolved.method} ${resolved.url}`
        );
        return fetch(
            resolved.url,
            {
                method: resolved.method,
                headers: resolved.headers
            }
        );
    }
}
