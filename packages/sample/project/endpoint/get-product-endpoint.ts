import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const getProductEndpoint: EndpointDefinition = {
    name: "get product",
    method: HttpMethod.GET,
    path: "/api/products/{id}"
}
