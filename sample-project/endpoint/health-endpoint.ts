import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const healthEndpoint: EndpointDefinition = {
    name: "health check",
    method: HttpMethod.GET,
    path: "/api/health"
}
