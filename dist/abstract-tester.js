"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractTester = /** @class */ (function () {
    function AbstractTester() {
        this.priorHtml = '';
    }
    AbstractTester.prototype.setPriorHtml = function (html) {
        this.priorHtml = html;
    };
    AbstractTester.prototype.current = function () {
        return this.priorHtml;
    };
    AbstractTester.prototype.next = function () {
        var diffA = this.priorHtml;
        var diffB = this.nextHtml();
        this.priorHtml = this.nextHtml();
        return { diffA: diffA, diffB: diffB };
    };
    return AbstractTester;
}());
exports.default = AbstractTester;
