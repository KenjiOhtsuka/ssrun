import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { createProductEndpoint } from "../endpoint/create-product-endpoint.js";

export const createProduct: RequestDefinition = {
    name: "create-product",
    endpoint: createProductEndpoint,
    origin: "{{origin}}"
};

export const createProductInput: RequestInput = {
    body: {
        name: "New Product",
        price: 49.99,
        category: "general"
    }
};
