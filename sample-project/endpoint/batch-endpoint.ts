import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const batchEndpoint: EndpointDefinition = {
    name: "batch process",
    method: HttpMethod.POST,
    path: "/api/batch",
    contentTypes: ["application/json"]
}
