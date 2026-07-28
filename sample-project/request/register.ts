import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { registerEndpoint } from "../endpoint/register-endpoint.js";

export const register: RequestDefinition = {
    name: "register",
    endpoint: registerEndpoint,
    origin: "{{origin}}"
};

export const registerInput: RequestInput = {
    body: {
        name: "NewUser",
        email: "new@example.com",
        password: "password123"
    }
};
