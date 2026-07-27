import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const deleteCacheEndpoint: EndpointDefinition = {
    name: "delete cache",
    method: HttpMethod.DELETE,
    path: "/api/cache/{key}"
}
