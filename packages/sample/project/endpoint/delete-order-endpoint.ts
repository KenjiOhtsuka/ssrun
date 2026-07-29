import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const deleteOrderEndpoint: EndpointDefinition = {
    name: "delete order",
    method: HttpMethod.DELETE,
    path: "/api/orders/{id}"
}
