import { showFieldError } from "../showField/showField";

export function validateField(
  input: HTMLInputElement | HTMLTextAreaElement,
  validator: (input: string) => string | null,
  errorEl: HTMLElement,
) {
  const value = input.value;
  const error = validator(value);
  showFieldError(input, errorEl, error);

  return error;
}
