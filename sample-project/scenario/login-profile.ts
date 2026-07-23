import { getUser, getUserInput } from "../request/get-user.js";
import { login, loginInput } from "../request/post-login.js";
import { profile, profileInput } from "../request/get-profile.js";

import type { ScenarioDefinition }
    from "../../src/core/Scenario.js";

export const loginProfileScenario: ScenarioDefinition = {

    name: "login-profile",

    steps: [
        {
            request: getUser,
            input: getUserInput
        },
        {
            request: login,
            input: loginInput,
            exports: {
                token: "token",
            }
        },
        {
            request: profile,
            input: profileInput,
            exports: {}
        }
    ]
};
