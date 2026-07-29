import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const updateOrderStatusEndpoint: EndpointDefinition = {
    name: "update order status",
    method: HttpMethod.PUT,
    path: "/api/orders/{id}/status",
    contentTypes: ["application/json"]
}
