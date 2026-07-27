import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const listOrdersEndpoint: EndpointDefinition = {
    name: "list orders",
    method: HttpMethod.GET,
    path: "/api/orders",
    parameters: [
        { name: "status", required: false },
        { name: "page", required: false }
    ]
}
