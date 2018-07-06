import AbstractTester from './abstract-tester';
declare type VueWrapper = {
    html(): string;
    find(selector: object | string): any;
};
export default class VueTester extends AbstractTester {
    private wrapper;
    constructor(wrapper: VueWrapper);
    fillIn(name: string, value: string): void;
    click(selector: string | object): void;
    protected nextHtml(): string;
}
export {};
