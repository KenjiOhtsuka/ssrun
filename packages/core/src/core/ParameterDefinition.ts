export enum ParameterType {
    String,
    Number,
    Boolean,
    Date,
    Json
}

export interface ParameterDefinition {

    name: string;

    required?: boolean;

}
