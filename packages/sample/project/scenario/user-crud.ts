import { listUsers, listUsersInput } from "../request/list-users.js";
import { createUser, createUserInput } from "../request/create-user.js";
import { getUser, getUserInput } from "../request/get-user.js";
import { updateUser, updateUserInput } from "../request/update-user.js";
import { deleteUser, deleteUserInput } from "../request/delete-user.js";

import type { ScenarioDefinition }
    from "@kenjiotsuka/ssrun/core/Scenario.js";

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
        // getUser/updateUser/deleteUser use hardcoded path IDs because:
        // 1. The request input files (getUserInput, updateUserInput, deleteUserInput) are shared
        //    with standalone request tests  Eusing "{{newUserId}}" there would break those tests
        //    since newUserId only exists in scenario context.
        // 2. WireMock returns the same mock data regardless of ID, so hardcoded IDs work fine
        //    for testing the CRUD flow.
        // To use exported values, override input in the scenario step instead:
        //   input: { ...updateUserInput, path: { id: "{{newUserId}}" } }
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
