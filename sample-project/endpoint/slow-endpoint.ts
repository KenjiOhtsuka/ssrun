import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const slowEndpoint: EndpointDefinition = {
    name: "slow endpoint",
    method: HttpMethod.GET,
    path: "/api/slow/endpoint"
}
