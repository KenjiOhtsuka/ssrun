import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const searchEndpoint: EndpointDefinition = {
    name: "search",
    method: HttpMethod.GET,
    path: "/api/search",
    parameters: [
        { name: "q", required: true },
        { name: "type", required: false }
    ]
}
