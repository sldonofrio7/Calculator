import { useState, useEffect } from "react";

import { all, create } from "mathjs";

import MathRenderer from "./MathRenderer";
import { validateInput } from "../utils/validateInput";

import "./Calculator.types"

import "./Calculator.css";

const math = create(all)

function retrieveAndValidateCustomFunctionLabels(functions: Function[]) {
    return functions.map((funct) => {
        const label = funct.label ?? funct.onClick.name;
        return isValidFunction(label) ? label : "";
    });
}

function initializeCustomFunctions(functions: Function[]) {
    if (functions.length === 0) return;

    const functionLabels = retrieveAndValidateCustomFunctionLabels(functions);

    const mathFunctions = functions.reduce<Record<string, Function['onClick']>>((acc, funct, index) => {
        acc[functionLabels[index]] = funct.onClick;
        return acc;
    }, {});

    math.import(mathFunctions, { override: true });
}

function renderButtons(template: string, customFunctions: Function[], input: (input: string) => void) {

    let operations: string[] = ["+", "-", "*", "/", "^"];
    let functions: string[] = ["sqrt("];
    let groupings: string[] = ["(", ")"];

    switch (template) {
        case "basic":
            operations = operations.slice(0, 4)
            functions = functions.slice(0)
            groupings = groupings.slice(0)
            break;
        case "scientific":
            operations = operations.slice(0, 8)
            functions = functions.slice(0,1)
            groupings = groupings.slice(0,2)
            break;
        default:
            operations = operations.slice(operations.length)
    }

    functions = functions.concat(retrieveAndValidateCustomFunctionLabels(customFunctions))

    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].concat(operations).concat(functions).concat(groupings).map((label) => (
        <button key={label} onClick={() => input(label)}>
            {label}
        </button>
    ));
}

export default function Calculator({ template = "basic", validation = true, functions = [] }: CalculatorProps) {

    const [equation, setEquation] = useState("0");
    const [isSolution, setIsSolution] = useState(false);

    useEffect(() => {
        initializeCustomFunctions(functions);
    }, [functions]);

    function input(input: string) {
        setEquation(validateInput(input, equation, isSolution, validation));
        setIsSolution(false);
    }

    function validateSolution() {
        try {
            setEquation(String(math.evaluate(equation)));
            setIsSolution(true);
        }
        catch (e) {
            console.error(e);
            setEquation(equation);
        }
    }

        return (
            <>
                <MathRenderer input={equation}/>
                <p>{equation}</p>

                <div className="calculatorBody">
                    <button onClick={() => input("")}>CE</button>
                    <button onClick={() => input("-1")}>del</button>
                    {renderButtons(template, functions, input)}
                    <button onClick={() => validateSolution()}>=</button>
                </div>
            </>
        );
}