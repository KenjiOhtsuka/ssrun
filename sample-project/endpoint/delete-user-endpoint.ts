import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const deleteUserEndpoint: EndpointDefinition = {
    name: "delete user",
    method: HttpMethod.DELETE,
    path: "/api/users/{id}"
}
