import {execSync} from "node:child_process";

export default function Terminal (command:string)  {
    return execSync(command,).toString();
}
export function TerminalOk (command:string)  {
    try{
        Terminal(command);
        return true;
    }catch (e){
        return false;
    }
}
