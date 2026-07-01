export type AlphaString = string & { readonly __brand: unique symbol };

export function isAlphabetic(input: string): input is AlphaString {
    return /^[a-zA-Z]+$/.test(input);
}