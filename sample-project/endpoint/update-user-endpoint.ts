import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const updateUserEndpoint: EndpointDefinition = {
    name: "update user",
    method: HttpMethod.PUT,
    path: "/api/users/{id}",
    contentTypes: ["application/json"]
}
