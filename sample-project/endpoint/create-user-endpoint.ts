import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const createUserEndpoint: EndpointDefinition = {
    name: "create user",
    method: HttpMethod.POST,
    path: "/api/users",
    contentTypes: ["application/json"]
}
