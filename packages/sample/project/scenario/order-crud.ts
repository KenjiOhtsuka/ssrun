import { listOrders, listOrdersInput } from "../request/list-orders.js";
import { createOrder, createOrderInput } from "../request/create-order.js";
import { getOrder, getOrderInput } from "../request/get-order.js";
import { updateOrderStatus, updateOrderStatusInput } from "../request/update-order-status.js";
import { deleteOrder, deleteOrderInput } from "../request/delete-order.js";

import type { ScenarioDefinition }
    from "@kenjiotsuka/ssrun/core/Scenario.js";

export const orderCrudScenario: ScenarioDefinition = {
    name: "order-crud",

    steps: [
        {
            request: listOrders,
            input: listOrdersInput,
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
            exports: {
                newOrderId: "id"
            },
            assert: {
                status: 201,
                json: {
                    status: "pending",
                    message: "Order created successfully"
                }
            }
        },
        {
            request: getOrder,
            input: getOrderInput,
            assert: {
                status: 200,
                json: {
                    id: 1001,
                    status: "completed",
                    total: 150.00
                }
            }
        },
        {
            request: updateOrderStatus,
            input: updateOrderStatusInput,
            assert: {
                status: 200,
                json: {
                    status: "shipped"
                }
            }
        },
        {
            request: deleteOrder,
            input: deleteOrderInput,
            assert: {
                status: 204
            }
        }
    ]
};
