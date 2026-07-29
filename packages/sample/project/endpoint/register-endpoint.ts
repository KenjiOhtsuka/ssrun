import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const registerEndpoint: EndpointDefinition = {
    name: "register",
    method: HttpMethod.POST,
    path: "/register",
    contentTypes: ["application/json"]
}
