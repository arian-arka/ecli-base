import path from "node:path";
export function joinPaths(...args:string[]) : string {
    return path.join(...args);
}
export function basePath(...args : string[]) : string{
    const p = require.main?.path ?? '';
    const lastIndexOfDist = p.lastIndexOf('dist');
    let newP = lastIndexOfDist === -1 ? p : p.substring(0,lastIndexOfDist);
    return joinPaths(newP,...args);
}

export function resolveBasePath(...args : string[]) : string{
    return path.resolve(basePath(...args));
}
