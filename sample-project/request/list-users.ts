import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { listUsersEndpoint } from "../endpoint/list-users-endpoint.js";

export const listUsers: RequestDefinition = {
    name: "list-users",
    endpoint: listUsersEndpoint,
    origin: "{{origin}}"
};

export const listUsersInput: RequestInput = {
    query: {
        page: "1",
        limit: "10"
    }
};
