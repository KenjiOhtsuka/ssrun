import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const searchEndpoint: EndpointDefinition = {
    name: "search",
    method: HttpMethod.GET,
    path: "/api/search",
    parameters: [
        { name: "q", required: true },
        { name: "type", required: false }
    ]
}
