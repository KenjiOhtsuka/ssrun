import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const updateOrderStatusEndpoint: EndpointDefinition = {
    name: "update order status",
    method: HttpMethod.PUT,
    path: "/api/orders/{id}/status",
    contentTypes: ["application/json"]
}
