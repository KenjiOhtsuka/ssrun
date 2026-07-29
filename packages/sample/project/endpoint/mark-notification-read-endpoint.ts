import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const markNotificationReadEndpoint: EndpointDefinition = {
    name: "mark notification read",
    method: HttpMethod.PUT,
    path: "/api/notifications/{id}/read"
}
