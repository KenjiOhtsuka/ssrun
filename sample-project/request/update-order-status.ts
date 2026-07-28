import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { updateOrderStatusEndpoint } from "../endpoint/update-order-status-endpoint.js";

export const updateOrderStatus: RequestDefinition = {
    name: "update-order-status",
    endpoint: updateOrderStatusEndpoint,
    origin: "{{origin}}"
};

export const updateOrderStatusInput: RequestInput = {
    path: {
        id: "1001"
    },
    body: {
        status: "shipped"
    }
};
