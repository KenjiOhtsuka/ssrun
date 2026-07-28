import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const getUserPostsEndpoint: EndpointDefinition = {
    name: "get user posts",
    method: HttpMethod.GET,
    path: "/api/users/{id}/posts"
}
