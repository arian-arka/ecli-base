import * as fs from "fs";
import * as _path from "path";
import Directory from "./Directory";
export default class File {
    static readJson(props: { path: string }): object {
        return JSON.parse(fs.readFileSync(props.path).toString());
    }

    static isFile(props: { path: string }) {
        return fs.existsSync(props.path) && fs.lstatSync(props.path).isFile();
    }

    static read(props: { path: string }): string {
        return fs.readFileSync(props.path).toString();
    }

    static writeJson(props: { path: string, data: any }): any {
        return File.create({path: props.path, data: typeof props.data === 'string' ? props.data : JSON.stringify(props.data)});
    }

    static copy(props: { src: string, dst: string }) {
        fs.copyFileSync(props.src, props.dst);
    }

    static dirName(props: { path: string }) {
        return _path.resolve(props.path, '..');
    }

    static exists(props: { path: string }) {
        return fs.existsSync(props.path);
    }

    static create(props: {
        path: string,
        check?: boolean,
        data?: any,
        createDir?: boolean,
    }) {
        if (props?.check && File.exists({path: props.path}))
            throw new Error(`File ${props.path} exists`);

        (props?.createDir ?? true) && Directory.createIfNotExists(
            {path: File.dirName({path: props.path})}
        );

        const text = typeof props?.data === 'object' ? JSON.stringify(props.data) : `${props?.data ?? ''}`;
        fs.writeFileSync(props.path, text);
    }
}