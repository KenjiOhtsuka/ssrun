import type { RequestDefinition, RequestInput } from "@kenjiotsuka/ssrun/core/Request.js";
import { logoutEndpoint } from "../endpoint/logout-endpoint.js";

export const logout: RequestDefinition = {
    name: "logout",
    endpoint: logoutEndpoint,
    origin: "{{origin}}"
};

export const logoutInput: RequestInput = {
    headers: {
        "Authorization": "Bearer {{token}}"
    }
};
