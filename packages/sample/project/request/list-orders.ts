import type { RequestDefinition, RequestInput } from "@kenjiotsuka/ssrun/core/Request.js";
import { listOrdersEndpoint } from "../endpoint/list-orders-endpoint.js";

export const listOrders: RequestDefinition = {
    name: "list-orders",
    endpoint: listOrdersEndpoint,
    origin: "{{origin}}"
};

export const listOrdersInput: RequestInput = {
    query: {
        page: "1"
    }
};
