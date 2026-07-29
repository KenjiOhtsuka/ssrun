import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const updateProductEndpoint: EndpointDefinition = {
    name: "update product",
    method: HttpMethod.PATCH,
    path: "/api/products/{id}",
    contentTypes: ["application/json"]
}
