"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCli = exports.run = exports.commandToClsAndMethod = void 0;
const Args_1 = require("./Args");
const File_1 = __importDefault(require("../sys/File"));
const node_assert_1 = __importDefault(require("node:assert"));
const path_1 = require("../helper/path");
function commandToClsAndMethod(command, def = 'default') {
    var _a, _b;
    if (!(!!command)) {
        const self = require('../../command/ecli').default;
        return ['index', self, new self];
    }
    const splitted = command.split('.');
    let method = 'index', path = '../command/';
    if (File_1.default.isFile({
        path: (0, path_1.basePath)('src', 'command', ...[
            ...((_a = splitted.slice(0, splitted.length - 1)) !== null && _a !== void 0 ? _a : []),
            ...(splitted.length ? [((_b = splitted.at(splitted.length - 1)) !== null && _b !== void 0 ? _b : '') + '.ts'] : [])
        ])
    })) {
        path += splitted.join('/');
    }
    else {
        (0, node_assert_1.default)(splitted.length > 1, 'Invalid command');
        method = splitted[splitted.length - 1];
        path += splitted.slice(0, splitted.length - 1).join('/');
    }
    const cls = require(path)[def];
    return [method, cls, new cls];
}
exports.commandToClsAndMethod = commandToClsAndMethod;
async function run(command, args) {
    const [method, cls, obj] = commandToClsAndMethod(command);
    try {
        return {
            result: await obj[method](args),
            ok: true,
        };
    }
    catch (e) {
        return {
            result: e,
            ok: false,
        };
    }
}
exports.run = run;
async function runCli(stdout = true) {
    if (stdout) {
        console.log('base path: ', (0, path_1.basePath)());
    }
    if (!Args_1.command)
        return '';
    const output = await run(Args_1.command, Args_1.args);
    if (stdout) {
        console.log('Status: ', output.ok ? 'OK' : 'ERROR');
        console.log('Result:');
        console.log(JSON.stringify(output.result, null, 2));
    }
    return output;
}
exports.runCli = runCli;
