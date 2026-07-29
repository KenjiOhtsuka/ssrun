import type { RequestDefinition, RequestInput } from "@kenjiotsuka/ssrun/core/Request.js";
import { postLoginEndpoint } from "../endpoint/post-login-endpoint.js";

export const login: RequestDefinition = {
  name: "login",
  endpoint: postLoginEndpoint,
  origin: "{{origin}}"
};

export const loginInput: RequestInput = {
  body: {
    username: "{{API_USER}}",
    password: "{{API_PASSWORD}}"
  }
};
