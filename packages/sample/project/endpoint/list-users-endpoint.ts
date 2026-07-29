import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const listUsersEndpoint: EndpointDefinition = {
    name: "list users",
    method: HttpMethod.GET,
    path: "/api/users"
}
