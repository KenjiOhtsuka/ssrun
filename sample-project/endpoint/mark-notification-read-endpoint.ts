import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const markNotificationReadEndpoint: EndpointDefinition = {
    name: "mark notification read",
    method: HttpMethod.PUT,
    path: "/api/notifications/{id}/read"
}
