import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const getUserFollowersEndpoint: EndpointDefinition = {
    name: "get user followers",
    method: HttpMethod.GET,
    path: "/api/users/{id}/followers"
}
