import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const getCacheEndpoint: EndpointDefinition = {
    name: "get cache",
    method: HttpMethod.GET,
    path: "/api/cache/{key}"
}
