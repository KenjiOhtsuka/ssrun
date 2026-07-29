import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const listOrdersEndpoint: EndpointDefinition = {
    name: "list orders",
    method: HttpMethod.GET,
    path: "/api/orders",
    parameters: [
        { name: "status", required: false },
        { name: "page", required: false }
    ]
}
