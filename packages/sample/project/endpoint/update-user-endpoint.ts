import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const updateUserEndpoint: EndpointDefinition = {
    name: "update user",
    method: HttpMethod.PUT,
    path: "/api/users/{id}",
    contentTypes: ["application/json"]
}
