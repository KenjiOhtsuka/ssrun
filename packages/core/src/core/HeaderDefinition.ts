
export interface HeaderDefinition {

    name: string;

    required?: boolean;

}

export enum Accepts {
    ALL = "*/*",
    APPLICATION_JSON = "application/json",
    APPLICATION_FORM = "application/x-www-form-urlencoded",
    APPLICATION_XML = "application/xml",
    TEXT_PLAIN = "text/plain",
    TEXT_HTML = "text/html"
}

export enum ContentTypes {
    APPLICATION_JSON = "application/json",
    APPLICATION_FORM = "application/x-www-form-urlencoded",
    APPLICATION_XML = "application/xml",
    TEXT_PLAIN = "text/plain",
    TEXT_HTML = "text/html"
}
