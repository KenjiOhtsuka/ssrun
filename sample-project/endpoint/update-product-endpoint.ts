import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const updateProductEndpoint: EndpointDefinition = {
    name: "update product",
    method: HttpMethod.PATCH,
    path: "/api/products/{id}",
    contentTypes: ["application/json"]
}
