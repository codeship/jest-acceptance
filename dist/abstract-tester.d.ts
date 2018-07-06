declare type Diff = {
    diffA: string;
    diffB: string;
} | void;
export default abstract class AbstractTester {
    private priorHtml;
    constructor();
    setPriorHtml(html: string): void;
    current(): string;
    next(): Diff;
    abstract fillIn(name: string, value: string): void;
    abstract click(selector: Object | string): void;
    protected abstract nextHtml(): string;
}
export {};
