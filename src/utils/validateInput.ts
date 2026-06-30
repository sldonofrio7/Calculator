export function validateInput(input: string, initial: string, isSolution: boolean, validation: boolean) {

    const exceptions = new Set(["-", "(", ")"]);
    const rules = new Set(["+"]);

    let initialLast = "";

    initial.length > 0 ? initialLast = initial.slice(-1) : initialLast = initial;

    const isNumberInput = !isNaN(Number(input));
    const isNumberInitial = !isNaN(Number(initialLast))

    if (input === "") {
        return "0";
    }

    if (input === "-1") {
        if (initial.slice(0, -1) === "") {
            return "0";
        }

        return initial.slice(0, -1);
    }

    if (isSolution) {
        return isNumberInput ? input : initial + input;
    }

    if (validation) {
        if (initial === "0") {
            if (!isNumberInput) {
                if (exceptions.has(input)) {
                    return input;
                }
                else {
                    return initial + input;
                }
            }
            else {
                return input;
            }
        }
        if (!isNumberInput && !isNumberInitial) {

            if (input === initialLast) {
                return initial;
            }
            else if (!rules.has(initialLast) && exceptions.has(input)) {
                return initial + input;
            }
            else {
                return initial.slice(0, -1) + input;
            }
        }
        else if (isNaN(Number(initial.slice(-2, -1))) && initialLast === "0") {
            return initial.slice(0, -1) + input;
        }
        else {
            return initial + input;
        }
    }
    else {
        if (initial === "0") {
            return input;
        }
        else {
            return initial + input;
        }
    }
}