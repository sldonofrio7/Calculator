import { MathJax, MathJaxContext } from "better-react-mathjax";

interface MathRendererProps {
    input?: string;
}

function translate(input: string) {

    if (input.includes("^") && input.at(-1) === "^") {
        input += "\\square{}"
    }

    if (input.includes("*")) {
        input = input.replace("*", "\\cdot")
    }

    if (input.includes("sqrt(")) {
        input = input.replace("sqrt(", "\\sqrt{}")
    }

    return input;
}

export default function MathRenderer({input=""} : MathRendererProps) {
    return (
        <MathJaxContext>
            <MathJax>
                {`\\(${translate(input)}\\)`}
            </MathJax>
        </MathJaxContext>
    );
}