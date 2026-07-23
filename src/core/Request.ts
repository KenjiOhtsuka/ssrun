// RequestDefinition.ts

import type { Context } from "./Context.js";
import type { EndpointDefinition } from "./EndpointDefinition.js";

export interface RequestDefinition {
  name?: string;
  endpoint: EndpointDefinition;
  origin: string;
}

export interface RequestInput {
  name?: string;
  path?: Record<string, string | number | boolean | null>;
  query?: Record<string, string | number | boolean | null>;
  headers?: Record<string, string | number | boolean | null>;
  body?: unknown;
}

export interface RequestResult {
  status: number;
  headers: Record<string, string>;
  body: unknown;
}
