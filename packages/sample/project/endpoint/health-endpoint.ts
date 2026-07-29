import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const healthEndpoint: EndpointDefinition = {
    name: "health check",
    method: HttpMethod.GET,
    path: "/api/health"
}
