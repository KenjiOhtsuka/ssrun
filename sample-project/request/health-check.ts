import type { RequestDefinition } from "../../src/core/Request.js";
import { healthEndpoint } from "../endpoint/health-endpoint.js";

export const healthCheck: RequestDefinition = {
    name: "health-check",
    endpoint: healthEndpoint,
    origin: "{{origin}}"
};
