import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const deleteOrderEndpoint: EndpointDefinition = {
    name: "delete order",
    method: HttpMethod.DELETE,
    path: "/api/orders/{id}"
}
