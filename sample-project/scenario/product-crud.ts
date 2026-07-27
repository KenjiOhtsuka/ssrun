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
