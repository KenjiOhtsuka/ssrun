import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const listProductsEndpoint: EndpointDefinition = {
    name: "list products",
    method: HttpMethod.GET,
    path: "/api/products",
    parameters: [
        { name: "category", required: false },
        { name: "page", required: false },
        { name: "limit", required: false }
    ]
}
