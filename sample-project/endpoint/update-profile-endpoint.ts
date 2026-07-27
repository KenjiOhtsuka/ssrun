import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const updateProfileEndpoint: EndpointDefinition = {
    name: "update profile",
    method: HttpMethod.PUT,
    path: "/profile",
    headers: [
        { name: "Authorization", required: true }
    ],
    contentTypes: ["application/json"]
}
