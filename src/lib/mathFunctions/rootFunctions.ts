import { evaluate } from "mathjs";

export function cubeRoot(input: string): string {
    return String(evaluate("nthRoot(" + input + ", 3)"));
}

export function quarticRoot(input: string): string {
    return String(evaluate("nthRoot(" + input + ", 4)"));
}

export function hypotenuseOperator(inputOne: string, inputTwo: string): string {
    return String(evaluate(""));
}