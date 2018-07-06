"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jest_serializer_vue_1 = __importDefault(require("jest-serializer-vue"));
var snapshot_diff_serializer_1 = __importDefault(require("snapshot-diff-serializer"));
function test(value) {
    return jest_serializer_vue_1.default.test(value) || snapshot_diff_serializer_1.default.test(value);
}
exports.test = test;
function print(value, serializer) {
    var result = '';
    if (jest_serializer_vue_1.default.test(value)) {
        result = jest_serializer_vue_1.default.print.apply(null, arguments);
    }
    else if (snapshot_diff_serializer_1.default.test(value)) {
        result = snapshot_diff_serializer_1.default.print.apply(null, arguments);
    }
    return result;
}
exports.print = print;
