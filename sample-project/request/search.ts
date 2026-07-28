import type { RequestDefinition, RequestInput } from "../../src/core/Request.js";
import { searchEndpoint } from "../endpoint/search-endpoint.js";

export const search: RequestDefinition = {
    name: "search",
    endpoint: searchEndpoint,
    origin: "{{origin}}"
};

export const searchInput: RequestInput = {
    query: {
        q: "test"
    }
};
