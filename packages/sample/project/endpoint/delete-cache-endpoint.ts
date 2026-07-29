import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const deleteCacheEndpoint: EndpointDefinition = {
    name: "delete cache",
    method: HttpMethod.DELETE,
    path: "/api/cache/{key}"
}
