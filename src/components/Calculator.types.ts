import type { AlphaString } from "../types/common"

export type CalculatorFunction = {
    onClick: (...args: string[]) => string | string[];
} & (
    | { isOperator?: false; label?: AlphaString }
    | { isOperator: true; label: AlphaString }                
);

export type CalculatorProps = {
    template?: string;
    validation?: boolean;
    functions?: CalculatorFunction[];
}