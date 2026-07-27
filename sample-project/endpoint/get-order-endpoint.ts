import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const getOrderEndpoint: EndpointDefinition = {
    name: "get order",
    method: HttpMethod.GET,
    path: "/api/orders/{id}"
}
