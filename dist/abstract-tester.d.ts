type IDiff = {
    diffA: string;
    diffB: string;
} | void;
export default abstract class AbstractTester {
    private priorHtml;
    constructor();
    setPriorHtml(html: string): void;
    current(): string;
    nextSync(): IDiff;
    next(): Promise<IDiff>;
    abstract fillIn(name: string, value: string): void;
    abstract click(selector: Object | string): void;
    protected abstract nextHtml(): Promise<string>;
    protected abstract nextHtmlSync(): string;
}
export {};
