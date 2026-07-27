import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const listUsersEndpoint: EndpointDefinition = {
    name: "list users",
    method: HttpMethod.GET,
    path: "/api/users"
}
