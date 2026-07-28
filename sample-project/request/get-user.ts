
import type { RequestDefinition }
  from "../../src/core/Request.js";
import { getUserEndpoint } from "../endpoint/get-user-endpoint.js";

export const getUser: RequestDefinition = {
  name: "get-user",
  endpoint: getUserEndpoint
  ,
  origin: "{{origin}}"
};

export const getUserInput = {
  path: {
    id: "1"
  }
}
