import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const getProductEndpoint: EndpointDefinition = {
    name: "get product",
    method: HttpMethod.GET,
    path: "/api/products/{id}"
}
