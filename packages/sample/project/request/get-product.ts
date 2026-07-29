import type { RequestDefinition, RequestInput } from "@kenjiotsuka/ssrun/core/Request.js";
import { getProductEndpoint } from "../endpoint/get-product-endpoint.js";

export const getProduct: RequestDefinition = {
    name: "get-product",
    endpoint: getProductEndpoint,
    origin: "{{origin}}"
};

export const getProductInput: RequestInput = {
    path: {
        id: "101"
    }
};
