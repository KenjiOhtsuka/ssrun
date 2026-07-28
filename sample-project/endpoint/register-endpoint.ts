import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const registerEndpoint: EndpointDefinition = {
    name: "register",
    method: HttpMethod.POST,
    path: "/register",
    contentTypes: ["application/json"]
}
