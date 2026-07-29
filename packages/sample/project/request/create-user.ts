import type { RequestDefinition, RequestInput } from "@kenjiotsuka/ssrun/core/Request.js";
import { createUserEndpoint } from "../endpoint/create-user-endpoint.js";

export const createUser: RequestDefinition = {
    name: "create-user",
    endpoint: createUserEndpoint,
    origin: "{{origin}}"
};

export const createUserInput: RequestInput = {
    body: {
        name: "New User",
        email: "new@example.com"
    }
};
