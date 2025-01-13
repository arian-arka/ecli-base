import path from "node:path";

let __base = (() => {
    const p = require.main?.path ?? '';
    const lastIndexOfDist = p.lastIndexOf('dist');
    return lastIndexOfDist === -1 ? p : p.substring(0,lastIndexOfDist);
})()
export function setBasePath(path : string){
    __base = path;
}

export function joinPaths(...args:string[]) : string {
    return path.join(...args);
}
export function basePath(...args : string[]) : string{
    return joinPaths(__base,...args);
}

export function resolveBasePath(...args : string[]) : string{
    return path.resolve(basePath(...args));
}
