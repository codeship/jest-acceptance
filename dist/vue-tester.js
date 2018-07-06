"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_tester_1 = __importDefault(require("./abstract-tester"));
var VueTester = /** @class */ (function (_super) {
    __extends(VueTester, _super);
    function VueTester(wrapper) {
        var _this = _super.call(this) || this;
        _this.wrapper = wrapper;
        _this.setPriorHtml(_this.nextHtml());
        return _this;
    }
    VueTester.prototype.fillIn = function (name, value) {
        var input = this.wrapper.find("[name=\"" + name + "\"]");
        input.element.value = value;
        input.trigger('input');
    };
    VueTester.prototype.click = function (selector) {
        this.wrapper.find(selector).trigger('click');
    };
    VueTester.prototype.nextHtml = function () {
        return this.wrapper.html();
    };
    return VueTester;
}(abstract_tester_1.default));
exports.default = VueTester;
