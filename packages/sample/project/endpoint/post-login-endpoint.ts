import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const postLoginEndpoint: EndpointDefinition = {
    name: "post login",
    method: HttpMethod.POST,
    path: "/login",
    parameters: []
}
