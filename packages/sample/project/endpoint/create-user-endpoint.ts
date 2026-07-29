import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const createUserEndpoint: EndpointDefinition = {
    name: "create user",
    method: HttpMethod.POST,
    path: "/api/users",
    contentTypes: ["application/json"]
}
