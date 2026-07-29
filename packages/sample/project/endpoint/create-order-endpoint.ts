import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const createOrderEndpoint: EndpointDefinition = {
    name: "create order",
    method: HttpMethod.POST,
    path: "/api/orders",
    contentTypes: ["application/json"]
}
