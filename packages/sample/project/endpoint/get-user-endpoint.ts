import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const getUserEndpoint: EndpointDefinition = {
    name: "get user",
    method: HttpMethod.GET,
    path: "/api/users/{id}",
    parameters: []
}
