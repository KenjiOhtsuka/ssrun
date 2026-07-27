import type { EndpointDefinition } from "../../src/core/EndpointDefinition.js";
import { HttpMethod } from "../../src/core/HttpMethod.js";

export const analyticsSummaryEndpoint: EndpointDefinition = {
    name: "analytics summary",
    method: HttpMethod.GET,
    path: "/api/analytics/summary",
    parameters: [
        { name: "period", required: false }
    ]
}
