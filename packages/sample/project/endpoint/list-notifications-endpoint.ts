import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const listNotificationsEndpoint: EndpointDefinition = {
    name: "list notifications",
    method: HttpMethod.GET,
    path: "/api/notifications"
}
