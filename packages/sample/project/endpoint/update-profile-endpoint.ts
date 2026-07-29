import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const updateProfileEndpoint: EndpointDefinition = {
    name: "update profile",
    method: HttpMethod.PUT,
    path: "/profile",
    headers: [
        { name: "Authorization", required: true }
    ],
    contentTypes: ["application/json"]
}
