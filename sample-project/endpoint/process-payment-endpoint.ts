import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const processPaymentEndpoint: EndpointDefinition = {
    name: "process payment",
    method: HttpMethod.POST,
    path: "/api/payment/process",
    contentTypes: ["application/json"]
}
