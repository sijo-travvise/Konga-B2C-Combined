export const RegExpValidators = {
    alphaNumeric : /^[a-zA-Z0-9]+$/,
    alphalettersWithSpaces : /^[a-zA-Z_]+( [a-zA-Z_]+)*$/,
    alphaNumericWithSpaces : /^[0-9a-zA-Z_]+( [0-9a-zA-Z_]+)*$/,
    password:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
    number: /^[0-9]+$/,
    alphaLetters: /^[a-zA-Z -]+$/,
    alphaLettersName: /^[a-zA-Z -.]+$/,
    email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}
