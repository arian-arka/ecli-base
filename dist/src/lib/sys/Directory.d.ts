export default class Directory {
    static exists(props: {
        path: string;
    }): boolean;
    static isDir(props: {
        path: string;
    }): boolean;
    static copy(props: {
        src: string;
        dst: string;
        force?: boolean;
    }): void;
    static delete(props: {
        path: string;
    }): void;
    static create(props: {
        path: string;
        check?: boolean;
        recursive?: boolean;
    }): void;
    static createIfNotExists(props: {
        path: string;
        recursive?: boolean;
    }): void;
}
