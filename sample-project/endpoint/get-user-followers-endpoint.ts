import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const getUserFollowersEndpoint: EndpointDefinition = {
    name: "get user followers",
    method: HttpMethod.GET,
    path: "/api/users/{id}/followers"
}
