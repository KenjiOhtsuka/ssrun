import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { refreshTokenEndpoint } from "../endpoint/refresh-token-endpoint.js";

export const refreshToken: RequestDefinition = {
    name: "refresh-token",
    endpoint: refreshTokenEndpoint,
    origin: "{{origin}}"
};

export const refreshTokenInput: RequestInput = {
    headers: {
        "Authorization": "Bearer {{refreshToken}}"
    }
};
