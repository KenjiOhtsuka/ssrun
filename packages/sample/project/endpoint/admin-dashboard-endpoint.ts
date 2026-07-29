import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const adminDashboardEndpoint: EndpointDefinition = {
    name: "admin dashboard",
    method: HttpMethod.GET,
    path: "/api/admin/dashboard",
    headers: [
        { name: "Authorization", required: true }
    ]
}
