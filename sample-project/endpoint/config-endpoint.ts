import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const configEndpoint: EndpointDefinition = {
    name: "get config",
    method: HttpMethod.GET,
    path: "/api/config"
}
