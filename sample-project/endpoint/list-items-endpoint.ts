import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const listItemsEndpoint: EndpointDefinition = {
    name: "list items",
    method: HttpMethod.GET,
    path: "/api/items"
}
