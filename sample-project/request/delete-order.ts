import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { deleteOrderEndpoint } from "../endpoint/delete-order-endpoint.js";

export const deleteOrder: RequestDefinition = {
    name: "delete-order",
    endpoint: deleteOrderEndpoint,
    origin: "{{origin}}"
};

export const deleteOrderInput: RequestInput = {
    path: {
        id: "1001"
    }
};
