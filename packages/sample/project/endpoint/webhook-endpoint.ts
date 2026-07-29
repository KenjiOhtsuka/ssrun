import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const webhookEndpoint: EndpointDefinition = {
    name: "webhook",
    method: HttpMethod.POST,
    path: "/api/webhook",
    contentTypes: ["application/json"]
}
