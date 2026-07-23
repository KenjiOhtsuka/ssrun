export interface ResolvedRequestDefinition {
    method: string;
    name: string;
    url: string;
    headers: Record<string, string>;
}
