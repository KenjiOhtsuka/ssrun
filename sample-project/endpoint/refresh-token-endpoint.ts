import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const refreshTokenEndpoint: EndpointDefinition = {
    name: "refresh token",
    method: HttpMethod.POST,
    path: "/auth/refresh",
    headers: [
        { name: "Authorization", required: true }
    ]
}
