import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const deleteProductEndpoint: EndpointDefinition = {
    name: "delete product",
    method: HttpMethod.DELETE,
    path: "/api/products/{id}"
}
