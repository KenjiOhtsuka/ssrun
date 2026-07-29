import type { EndpointDefinition } from "@kenjiotsuka/ssrun/core/EndpointDefinition.js";
import { HttpMethod } from "@kenjiotsuka/ssrun/core/HttpMethod.js";

export const analyticsSummaryEndpoint: EndpointDefinition = {
    name: "analytics summary",
    method: HttpMethod.GET,
    path: "/api/analytics/summary",
    parameters: [
        { name: "period", required: false }
    ]
}
