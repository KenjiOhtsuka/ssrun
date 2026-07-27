import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { deleteProductEndpoint } from "../endpoint/delete-product-endpoint.js";

export const deleteProduct: RequestDefinition = {
    name: "delete-product",
    endpoint: deleteProductEndpoint,
    origin: "{{origin}}"
};

export const deleteProductInput: RequestInput = {
    path: {
        id: "101"
    }
};
