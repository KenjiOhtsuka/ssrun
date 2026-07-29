import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const createProductEndpoint: EndpointDefinition = {
    name: "create product",
    method: HttpMethod.POST,
    path: "/api/products",
    contentTypes: ["application/json"]
}
