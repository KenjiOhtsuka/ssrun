import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { listProductsEndpoint } from "../endpoint/list-products-endpoint.js";

export const listProducts: RequestDefinition = {
    name: "list-products",
    endpoint: listProductsEndpoint,
    origin: "{{origin}}"
};

export const listProductsInput: RequestInput = {
    query: {
        category: "electronics",
        page: "1",
        limit: "10"
    }
};
