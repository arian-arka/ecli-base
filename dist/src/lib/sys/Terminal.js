"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalOk = void 0;
const node_child_process_1 = require("node:child_process");
function Terminal(command) {
    return (0, node_child_process_1.execSync)(command).toString();
}
exports.default = Terminal;
function TerminalOk(command) {
    try {
        Terminal(command);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.TerminalOk = TerminalOk;
