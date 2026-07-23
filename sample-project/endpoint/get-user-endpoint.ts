import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const getUserEndpoint: EndpointDefinition = {
    name: "get user",
    method: HttpMethod.GET,
    path: "/api/users/{id}",
    parameters: []
}
