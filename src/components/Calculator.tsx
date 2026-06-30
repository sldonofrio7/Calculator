import { useState } from "react";

import { all, create } from "mathjs";

import MathRenderer from "./MathRenderer";
import { validateInput } from "../utils/validateInput";

import "./Calculator.css";

// TODO rethink calculation logic, is it better to create the equation as an array of strings and then combine before evaluation?
// This would likely allow for easier evaluation handling, especially with custom functions and sqrt etc.

// Update, mathJS allows for customFunction handling, making it even easier

interface Function {
    label?: string;
    onClick: (...args: string[]) => string[];
}

interface CalculatorProps {
    template?: string;
    validation?: boolean;
    functions?: Function[];
}

const math = create(all)

function initializeCustomFunctions({ functions } : CalculatorProps) {
    
    if (!functions?.length) return;

    const exportFunctions = functions?.map((funct) => {
        const functionName = funct.label?.trim() || funct.onClick.name;

    });

    math.import(exportFunctions);
}

function renderButtons(
    {
        template = "basic",
        functions: customFunctions = []
    }: CalculatorProps,
    input: (input: string) => void,
) {

    initializeCustomFunctions(customFunctions);

    let operations: string[] = ["+", "-", "*", "/", "^"];
    let functions: string[] = ["sqrt(", "yar(", "ar("];
    let groupings: string[] = ["(", ")"];

    switch (template) {
        case "basic":
            operations = operations.slice(0, 4)
            break;
        case "scientific":
            operations = operations.slice(0, 8)
            break;
        default:
            operations = operations.slice(operations.length)
    }
    

    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].concat(operations).concat(functions).concat(groupings).map((label) => (
        <button key={label} onClick={() => input(label)}>
            {label}
        </button>
    ));
}

export default function Calculator({ template, validation = true, functions }: CalculatorProps) {

    const [equation, setEquation] = useState("0");
    const [isSolution, setIsSolution] = useState(false);

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
            console.log(e)
            setEquation(equation);
        }
    }

        return (
            <>
                <MathRenderer input={equation}/>
                <p>
                    {equation}
                </p>

                <div className="calculatorBody">
                    <button onClick={() => input("")}>CE</button>
                    <button onClick={() => input("-1")}>del</button>
                    {renderButtons({ template, functions }, input)}
                    <button onClick={() => validateSolution()}>=</button>
                </div>
            </>
        );
}