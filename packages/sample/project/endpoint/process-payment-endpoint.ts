import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const processPaymentEndpoint: EndpointDefinition = {
    name: "process payment",
    method: HttpMethod.POST,
    path: "/api/payment/process",
    contentTypes: ["application/json"]
}
