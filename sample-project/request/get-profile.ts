import type { RequestDefinition, RequestInput }
  from "../../src/core/Request.js";
import { getProfileEndpoint } from "../endpoint/get-profile-endpoint.js";

export const profile: RequestDefinition = {
    name: "get-profile",
    endpoint: getProfileEndpoint,
    origin: "{{origin}}"
};

export const profileInput: RequestInput = {
    headers: {
        "Authorization": "Bearer {{token}}"
    }
};