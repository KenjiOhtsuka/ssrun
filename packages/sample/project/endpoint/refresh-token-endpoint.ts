import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const refreshTokenEndpoint: EndpointDefinition = {
    name: "refresh token",
    method: HttpMethod.POST,
    path: "/auth/refresh",
    headers: [
        { name: "Authorization", required: true }
    ]
}
