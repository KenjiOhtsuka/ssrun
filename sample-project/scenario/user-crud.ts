import { listUsers, listUsersInput } from "../request/list-users.js";
import { createUser, createUserInput } from "../request/create-user.js";
import { getUser, getUserInput } from "../request/get-user.js";
import { updateUser, updateUserInput } from "../request/update-user.js";
import { deleteUser, deleteUserInput } from "../request/delete-user.js";

import type { ScenarioDefinition }
    from "../../src/core/Scenario.js";

export const userCrudScenario: ScenarioDefinition = {
    name: "user-crud",

    steps: [
        {
            request: listUsers,
            input: listUsersInput,
            assert: {
                status: 200,
                json: {
                    total: 3,
                    page: 1
                }
            }
        },
        {
            request: createUser,
            input: createUserInput,
            exports: {
                newUserId: "id"
            },
            assert: {
                status: 201,
                json: {
                    name: "Shiro",
                    email: "shiro@example.com"
                }
            }
        },
        {
            request: getUser,
            input: getUserInput,
            assert: {
                status: 200,
                json: {
                    id: 1,
                    name: "Taro",
                    role: "admin"
                }
            }
        },
        {
            request: updateUser,
            input: updateUserInput,
            assert: {
                status: 200,
                json: {
                    name: "Taro Updated"
                }
            }
        },
        {
            request: deleteUser,
            input: deleteUserInput,
            assert: {
                status: 204
            }
        }
    ]
};
