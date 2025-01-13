"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveBasePath = exports.basePath = exports.joinPaths = void 0;
const node_path_1 = __importDefault(require("node:path"));
function joinPaths(...args) {
    return node_path_1.default.join(...args);
}
exports.joinPaths = joinPaths;
function basePath(...args) {
    var _a, _b;
    const p = (_b = (_a = require.main) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : '';
    const lastIndexOfDist = p.lastIndexOf('dist');
    let newP = lastIndexOfDist === -1 ? p : p.substring(0, lastIndexOfDist);
    return joinPaths(newP, ...args);
}
exports.basePath = basePath;
function resolveBasePath(...args) {
    return node_path_1.default.resolve(basePath(...args));
}
exports.resolveBasePath = resolveBasePath;
