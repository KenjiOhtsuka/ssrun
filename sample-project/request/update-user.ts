import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { updateUserEndpoint } from "../endpoint/update-user-endpoint.js";

export const updateUser: RequestDefinition = {
    name: "update-user",
    endpoint: updateUserEndpoint,
    origin: "{{origin}}"
};

export const updateUserInput: RequestInput = {
    path: {
        id: "1"
    },
    body: {
        name: "Updated User"
    }
};
