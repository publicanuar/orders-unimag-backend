export class InputValidate {
  digitsValidate(input: any, numberOfDigits: number): boolean {
    const isValid: boolean = !isNaN(input) &&
      String(input).length === numberOfDigits;

    return isValid;
  }
}
