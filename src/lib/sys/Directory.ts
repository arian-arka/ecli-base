import * as fs from "fs";
import * as _path from "path";

export default class Directory {
    static exists(props: { path: string }) {
        return fs.existsSync(props.path);
    }

    static isDir(props: { path: string }) {
        return fs.existsSync(props.path) && fs.lstatSync(props.path).isDirectory();
    }

    static copy(props: {
        src: string,
        dst: string,
        force?: boolean
    }) {
        fs.cpSync(props.src, props.dst, {recursive: true, force: props?.force ?? false});
    }

    static delete(props: { path: string }) {
        if (!Directory.exists({path: props.path}))
            return;
        fs.rmSync(props.path, {recursive: true, force: true});
    }

    static create(props: {
        path: string,
        check?: boolean,
        recursive?: boolean,
    }) {
        if (props?.check && Directory.exists({path: props.path}))
            throw new Error(`Directory ${props.path} exists`);
        fs.mkdirSync(props.path, {recursive: props?.recursive ?? true});
    }

    static createIfNotExists(props: {
        path: string,
        recursive?: boolean,
    }) {
        if (!Directory.exists({path: props.path}))
            Directory.create({path: props.path, recursive: props.recursive ?? true});
    }

}

