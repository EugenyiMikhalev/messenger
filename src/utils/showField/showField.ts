export function showFieldError(
  input: HTMLInputElement,
  errorElement: HTMLElement,
  message: string | null,
): void {
  input.classList.toggle("form__input_invalid", message !== null);
  errorElement.classList.toggle("form__error-text_hide", message === null);
  errorElement.textContent = message ?? "";
}
