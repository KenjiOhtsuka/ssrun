import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const uploadEndpoint: EndpointDefinition = {
    name: "upload file",
    method: HttpMethod.POST,
    path: "/api/upload",
    contentTypes: ["multipart/form-data"]
}
