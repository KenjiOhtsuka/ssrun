import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { createOrderEndpoint } from "../endpoint/create-order-endpoint.js";

export const createOrder: RequestDefinition = {
    name: "create-order",
    endpoint: createOrderEndpoint,
    origin: "{{origin}}"
};

export const createOrderInput: RequestInput = {
    body: {
        items: [
            { productId: 101, quantity: 1 }
        ]
    }
};
