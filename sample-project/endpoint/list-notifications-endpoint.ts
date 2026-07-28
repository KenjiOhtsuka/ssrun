import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const listNotificationsEndpoint: EndpointDefinition = {
    name: "list notifications",
    method: HttpMethod.GET,
    path: "/api/notifications"
}
