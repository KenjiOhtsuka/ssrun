import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const deleteUserEndpoint: EndpointDefinition = {
    name: "delete user",
    method: HttpMethod.DELETE,
    path: "/api/users/{id}"
}
