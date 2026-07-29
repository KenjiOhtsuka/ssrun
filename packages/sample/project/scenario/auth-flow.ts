import { register, registerInput } from "../request/register.js";
import { login, loginInput } from "../request/post-login.js";
import { profile, profileInput } from "../request/get-profile.js";
import { updateProfile, updateProfileInput } from "../request/update-profile.js";
import { refreshToken, refreshTokenInput } from "../request/refresh-token.js";
import { logout, logoutInput } from "../request/logout.js";

import type { ScenarioDefinition }
    from "@kenjiotsuka/ssrun/core/Scenario.js";

export const authFlowScenario: ScenarioDefinition = {
    name: "auth-flow",

    steps: [
        {
            request: register,
            input: registerInput,
            exports: {
                newToken: "token"
            },
            assert: {
                status: 201,
                json: {
                    name: "NewUser",
                    email: "new@example.com"
                }
            }
        },
        {
            request: login,
            input: loginInput,
            exports: {
                token: "token",
                refreshToken: "refreshToken"
            },
            assert: {
                status: 200,
                json: {
                    tokenType: "Bearer",
                    expiresIn: 3600
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
            request: updateProfile,
            input: updateProfileInput,
            assert: {
                status: 200,
                json: {
                    name: "Taro Updated"
                }
            }
        },
        {
            request: refreshToken,
            input: refreshTokenInput,
            assert: {
                status: 200,
                json: {
                    expiresIn: 3600
                }
            }
        },
        {
            request: logout,
            input: logoutInput,
            assert: {
                status: 200,
                json: {
                    message: "Logged out successfully"
                }
            }
        }
    ]
};
