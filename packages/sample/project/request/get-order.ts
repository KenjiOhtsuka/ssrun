import type { RequestDefinition, RequestInput } from "@kenjiotsuka/ssrun/core/Request.js";
import { getOrderEndpoint } from "../endpoint/get-order-endpoint.js";

export const getOrder: RequestDefinition = {
    name: "get-order",
    endpoint: getOrderEndpoint,
    origin: "{{origin}}"
};

export const getOrderInput: RequestInput = {
    path: {
        id: "1001"
    }
};
