import type { ParameterDefinition } from "./ParameterDefinition.js";
import type { HttpMethod } from "./HttpMethod.js"
import type { HeaderDefinition } from "./HeaderDefinition.js";

export interface EndpointDefinition {

    name: string;

    method: HttpMethod;

    path: string;

    contentTypes?: string[],
    
    accepts?: string[],

    headers?: HeaderDefinition[];

    parameters?: ParameterDefinition[];
}
