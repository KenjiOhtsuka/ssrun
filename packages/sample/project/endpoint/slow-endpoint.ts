import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const slowEndpoint: EndpointDefinition = {
    name: "slow endpoint",
    method: HttpMethod.GET,
    path: "/api/slow/endpoint"
}
