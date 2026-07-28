import { authFlowScenario } from "../scenario/auth-flow.js";
import { userCrudScenario } from "../scenario/user-crud.js";
import { orderCrudScenario } from "../scenario/order-crud.js";

import type { SuiteDefinition }
    from "../../src/core/Suite.js";

export const smokeTestSuite: SuiteDefinition = {
    name: "smoke-test",

    steps: [
        { scenario: authFlowScenario },
        { scenario: userCrudScenario, parallel: true },
        { scenario: orderCrudScenario, parallel: true }
    ]
};
