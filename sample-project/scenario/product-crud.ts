import { listProducts, listProductsInput } from "../request/list-products.js";
import { createProduct, createProductInput } from "../request/create-product.js";
import { getProduct, getProductInput } from "../request/get-product.js";
import { updateProduct, updateProductInput } from "../request/update-product.js";
import { deleteProduct, deleteProductInput } from "../request/delete-product.js";

import type { ScenarioDefinition }
    from "../../src/core/Scenario.js";

export const productCrudScenario: ScenarioDefinition = {
    name: "product-crud",

    steps: [
        {
            request: listProducts,
            input: listProductsInput,
            assert: {
                status: 200,
                json: {
                    total: 2
                }
            }
        },
        {
            request: createProduct,
            input: createProductInput,
            exports: {
                newProductId: "id"
            },
            assert: {
                status: 201,
                json: {
                    name: "New Product",
                    price: 49.99
                }
            }
        },
        // getProduct/updateProduct/deleteProduct use hardcoded path IDs because:
        // 1. The request input files are shared with standalone request tests —
        //    using "{{newProductId}}" there would break those tests since
        //    newProductId only exists in scenario context.
        // 2. WireMock returns the same mock data regardless of ID, so hardcoded
        //    IDs work fine for testing the CRUD flow.
        // To use exported values, override input in the scenario step instead:
        //   input: { ...getProductInput, path: { id: "{{newProductId}}" } }
        {
            request: getProduct,
            input: getProductInput,
            assert: {
                status: 200,
                json: {
                    id: 101,
                    name: "Laptop",
                    price: 999.99,
                    stock: 50
                }
            }
        },
        {
            request: updateProduct,
            input: updateProductInput,
            assert: {
                status: 200,
                json: {
                    name: "Laptop Updated",
                    price: 899.99
                }
            }
        },
        {
            request: deleteProduct,
            input: deleteProductInput,
            assert: {
                status: 204
            }
        }
    ]
};
