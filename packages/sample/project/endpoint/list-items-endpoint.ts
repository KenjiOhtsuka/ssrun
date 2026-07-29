import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const listItemsEndpoint: EndpointDefinition = {
    name: "list items",
    method: HttpMethod.GET,
    path: "/api/items"
}
