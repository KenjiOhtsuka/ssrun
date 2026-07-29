import type { RequestDefinition, RequestInput } from "@kenjiotsuka/ssrun/core/Request.js";
import { updateProfileEndpoint } from "../endpoint/update-profile-endpoint.js";

export const updateProfile: RequestDefinition = {
    name: "update-profile",
    endpoint: updateProfileEndpoint,
    origin: "{{origin}}"
};

export const updateProfileInput: RequestInput = {
    headers: {
        "Authorization": "Bearer {{token}}"
    },
    body: {
        name: "Updated Name",
        address: "Osaka"
    }
};
