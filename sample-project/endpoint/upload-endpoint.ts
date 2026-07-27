import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const uploadEndpoint: EndpointDefinition = {
    name: "upload file",
    method: HttpMethod.POST,
    path: "/api/upload",
    contentTypes: ["multipart/form-data"]
}
