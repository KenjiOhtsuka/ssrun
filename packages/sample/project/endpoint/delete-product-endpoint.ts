import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const deleteProductEndpoint: EndpointDefinition = {
    name: "delete product",
    method: HttpMethod.DELETE,
    path: "/api/products/{id}"
}
