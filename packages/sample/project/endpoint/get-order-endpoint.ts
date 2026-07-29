import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const getOrderEndpoint: EndpointDefinition = {
    name: "get order",
    method: HttpMethod.GET,
    path: "/api/orders/{id}"
}
