import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const webhookEndpoint: EndpointDefinition = {
    name: "webhook",
    method: HttpMethod.POST,
    path: "/api/webhook",
    contentTypes: ["application/json"]
}
