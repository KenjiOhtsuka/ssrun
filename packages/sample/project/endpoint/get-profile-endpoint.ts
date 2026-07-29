import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const getProfileEndpoint : EndpointDefinition = {
    name: "get profile",
    method: HttpMethod.GET,
    path: "/profile",
    headers: [
        { name: "Authorization", required: true }
    ]
}
