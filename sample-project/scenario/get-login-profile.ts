import { getUser, getUserInput } from "../request/get-user.js";
import { login, loginInput } from "../request/post-login.js";
import { profile, profileInput } from "../request/get-profile.js";

import type { ScenarioDefinition }
    from "../../src/core/Scenario.js";

export const loginProfileScenario: ScenarioDefinition = {
    name: "get-login-profile",

    steps: [
        {
            request: getUser,
            input: getUserInput,
            assert: {
                status: 200,
                json: {
                    id: 1,
                    name: "Taro",
                    email: "taro@example.com",
                    role: "admin"
                }
            }
        },
        {
            duration: 1000
        },
        {
            request: login,
            input: loginInput,
            exports: {
                token: "token",
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
            exports: {},
            assert: {
                status: 200,
                json: {
                    id: 1,
                    name: "Taro",
                    email: "taro@example.com"
                }
            }
        }
    ]
};
