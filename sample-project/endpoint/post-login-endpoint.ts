import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const postLoginEndpoint: EndpointDefinition = {
    name: "post login",
    method: HttpMethod.POST,
    path: "/login",
    parameters: []
}
