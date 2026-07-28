import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { deleteUserEndpoint } from "../endpoint/delete-user-endpoint.js";

export const deleteUser: RequestDefinition = {
    name: "delete-user",
    endpoint: deleteUserEndpoint,
    origin: "{{origin}}"
};

export const deleteUserInput: RequestInput = {
    path: {
        id: "1"
    }
};
