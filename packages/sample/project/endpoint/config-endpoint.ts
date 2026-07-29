import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const configEndpoint: EndpointDefinition = {
    name: "get config",
    method: HttpMethod.GET,
    path: "/api/config"
}
