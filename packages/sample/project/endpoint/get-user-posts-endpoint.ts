import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const getUserPostsEndpoint: EndpointDefinition = {
    name: "get user posts",
    method: HttpMethod.GET,
    path: "/api/users/{id}/posts"
}
