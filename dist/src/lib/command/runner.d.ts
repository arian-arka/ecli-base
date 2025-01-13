export declare function commandToClsAndMethod(base: string, command: string, def?: string): [string, string, any];
export declare function run(base: string, command: string, args: any): Promise<{
    result: any;
    ok: boolean;
}>;
export declare function runCli(base: string, stdout?: boolean): Promise<"" | {
    result: any;
    ok: boolean;
}>;
