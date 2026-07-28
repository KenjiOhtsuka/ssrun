import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const createProductEndpoint: EndpointDefinition = {
    name: "create product",
    method: HttpMethod.POST,
    path: "/api/products",
    contentTypes: ["application/json"]
}
