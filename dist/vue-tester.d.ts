import AbstractTester from './abstract-tester';
interface VueWrapper {
    html(): string;
    find(selector: string | object): any;
    findComponent(selector: string | object): any;
    vm: {
        $nextTick(): Promise<void>;
    };
}
export default class VueTester extends AbstractTester {
    private wrapper;
    constructor(wrapper: VueWrapper);
    fillIn(name: string, value: string): void;
    click(selector: string | object): void;
    protected nextHtml(): Promise<string>;
    protected nextHtmlSync(): string;
}
export {};
