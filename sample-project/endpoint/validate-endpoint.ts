import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const validateEndpoint: EndpointDefinition = {
    name: "validate",
    method: HttpMethod.POST,
    path: "/api/validate",
    contentTypes: ["application/json"]
}
