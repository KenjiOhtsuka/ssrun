import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const getProfileEndpoint : EndpointDefinition = {
    name: "get profile",
    method: HttpMethod.GET,
    path: "/profile",
    headers: [
        { name: "Authorization", required: true }
    ]
}
