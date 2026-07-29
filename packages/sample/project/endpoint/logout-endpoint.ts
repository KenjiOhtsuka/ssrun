import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const logoutEndpoint: EndpointDefinition = {
    name: "logout",
    method: HttpMethod.POST,
    path: "/logout",
    headers: [
        { name: "Authorization", required: true }
    ]
}
