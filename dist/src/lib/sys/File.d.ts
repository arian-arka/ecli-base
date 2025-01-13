export default class File {
    static readJson(props: {
        path: string;
    }): object;
    static isFile(props: {
        path: string;
    }): boolean;
    static read(props: {
        path: string;
    }): string;
    static writeJson(props: {
        path: string;
        data: any;
    }): any;
    static copy(props: {
        src: string;
        dst: string;
    }): void;
    static dirName(props: {
        path: string;
    }): string;
    static exists(props: {
        path: string;
    }): boolean;
    static create(props: {
        path: string;
        check?: boolean;
        data?: any;
        createDir?: boolean;
    }): void;
}
