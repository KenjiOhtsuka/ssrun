import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const adminDashboardEndpoint: EndpointDefinition = {
    name: "admin dashboard",
    method: HttpMethod.GET,
    path: "/api/admin/dashboard",
    headers: [
        { name: "Authorization", required: true }
    ]
}
