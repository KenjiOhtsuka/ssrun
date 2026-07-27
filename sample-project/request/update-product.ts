import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { updateProductEndpoint } from "../endpoint/update-product-endpoint.js";

export const updateProduct: RequestDefinition = {
    name: "update-product",
    endpoint: updateProductEndpoint,
    origin: "{{origin}}"
};

export const updateProductInput: RequestInput = {
    path: {
        id: "101"
    },
    body: {
        name: "Updated Product",
        price: 899.99
    }
};
