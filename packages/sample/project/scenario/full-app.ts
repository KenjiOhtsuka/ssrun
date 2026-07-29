import { healthCheck } from "../request/health-check.js";
import { login, loginInput } from "../request/post-login.js";
import { profile, profileInput } from "../request/get-profile.js";
import { listProducts, listProductsInput } from "../request/list-products.js";
import { createOrder, createOrderInput } from "../request/create-order.js";
import { listOrders, listOrdersInput } from "../request/list-orders.js";

import type { ScenarioDefinition }
    from "@kenjiotsuka/ssrun/core/Scenario.js";

export const fullAppScenario: ScenarioDefinition = {
    name: "full-app",

    steps: [
        {
            request: healthCheck,
            assert: {
                status: 200,
                json: {
                    status: "healthy"
                }
            }
        },
        {
            request: login,
            input: loginInput,
            exports: {
                token: "token"
            },
            assert: {
                status: 200,
                json: {
                    tokenType: "Bearer"
                }
            }
        },
        {
            request: profile,
            input: profileInput,
            assert: {
                status: 200,
                json: {
                    id: 1,
                    name: "Taro"
                }
            }
        },
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
            request: createOrder,
            input: createOrderInput,
            assert: {
                status: 201,
                json: {
                    status: "pending"
                }
            }
        },
        {
            request: listOrders,
            input: listOrdersInput,
            assert: {
                status: 200,
                json: {
                    total: 2
                }
            }
        }
    ]
};
