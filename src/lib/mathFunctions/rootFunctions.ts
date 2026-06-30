import { evaluate } from "mathjs";

export function cubeRoot() {
    return (input: string) => evaluate("nthRoot(" + input + ", 3)")
}

export function quarticRoot() {
    return (input: string) => evaluate("nthRoot(" + input + ", 4)")
}