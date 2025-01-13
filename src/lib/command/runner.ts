import {
    command, args
} from "./Args";
import File from "../sys/File";
import assert from "node:assert";
import {basePath, joinPaths} from "../helper/path";

export function commandToClsAndMethod(base:string,command: string, def = 'default'): [string, string, any] {
    if(!(!!command)){
        const self = require('../../command/ecli').default;
        return ['index',self,new self];
    }
    const splitted = command.split('.');
    let method = 'index',
        path = base;

    if (File.isFile({
        path:
            joinPaths(path,...[
                ...(splitted.slice(0, splitted.length - 1) ?? []),
                ...(splitted.length ? [(splitted.at(splitted.length - 1) ?? '') + '.ts'] : [])
            ])
    })) {
        path = joinPaths(path,...splitted);
    } else {
        assert(splitted.length > 1, 'Invalid command');
        method = splitted[splitted.length - 1];
        path += joinPaths(path,...splitted.slice(0, splitted.length - 1));
    }
    const cls = require(path)[def];
    return [method, cls, new cls];
}

export async function run(base:string,command: string, args: any) {
    const [method, cls, obj] = commandToClsAndMethod(base,command);

    try {
        return {
            result: await obj[method](args),
            ok: true,
        };
    } catch (e) {
        return {
            result: e,
            ok: false,
        }
    }
}

export async function runCli(base:string,stdout = true) {
    if (stdout) {
        console.log('base path: ', basePath());
    }
    if (!command)
        return '';
    const output = await run(base,command, args);

    if (stdout) {
        console.log('Status: ', output.ok ? 'OK' : 'ERROR');
        console.log('Result:');
        console.log(JSON.stringify(output.result, null, 2));
    }

    return output;
}
