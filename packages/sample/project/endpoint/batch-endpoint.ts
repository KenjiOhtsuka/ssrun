import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const batchEndpoint: EndpointDefinition = {
    name: "batch process",
    method: HttpMethod.POST,
    path: "/api/batch",
    contentTypes: ["application/json"]
}
