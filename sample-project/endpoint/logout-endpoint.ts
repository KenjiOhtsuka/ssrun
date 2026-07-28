import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const logoutEndpoint: EndpointDefinition = {
    name: "logout",
    method: HttpMethod.POST,
    path: "/logout",
    headers: [
        { name: "Authorization", required: true }
    ]
}
