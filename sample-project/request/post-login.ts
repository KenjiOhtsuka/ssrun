import { HttpMethod } from "../../src/core/HttpMethod.js";
import type { RequestDefinition } from "../../src/core/Request.js";
import { postLoginEndpoint } from "../endpoint/post-login-endpoint.ts";

export const login: RequestDefinition = {
  name: "login",

  // url: "http://localhost:8080/login",
  endpoint: postLoginEndpoint,
  origin: "{{originA}}"
};

export const loginInput = {
  headers: {
    Authorization: "Bearer {{token}}"
  },
};
