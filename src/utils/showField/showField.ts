export function showFieldError(
  input: HTMLInputElement | HTMLTextAreaElement,
  errorElement: HTMLElement,
  message: string | null,
): void {
  input.classList.toggle("form__input_invalid", message !== null);
  if (message) {
    input.setAttribute("aria-invalid", "true");
  } else {
    input.setAttribute("aria-invalid", "false");
  }

  errorElement.classList.toggle("form__error-text_hide", message === null);
  errorElement.textContent = message ?? "";
}
