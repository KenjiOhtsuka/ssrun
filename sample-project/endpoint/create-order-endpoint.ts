import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const createOrderEndpoint: EndpointDefinition = {
    name: "create order",
    method: HttpMethod.POST,
    path: "/api/orders",
    contentTypes: ["application/json"]
}
