import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const getCacheEndpoint: EndpointDefinition = {
    name: "get cache",
    method: HttpMethod.GET,
    path: "/api/cache/{key}"
}
