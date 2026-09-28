export function validateLogin(value: string): string | null {
  const LOGIN_REGEXP = /^[\w\d_]+$/;

  if (value === "") {
    return "Please, enter login";
  } else if (value.length < 3 || value.length > 15) {
    return `Please, enter from 3 to 15 characters`;
  } else if (!LOGIN_REGEXP.test(value)) {
    return "Please, use letters, numbers or '_'";
  } else return null;
}

export function validateLoginPassword(value: string): string | null {
  if (value === "") {
    return "Please, enter password";
  } else if (value.length < 8 || value.length > 15) {
    return `Please, enter from 8 to 15 characters`;
  } else return null;
}

export function validateRegistrationPassword(value: string): string | null {
  const PASSWORD_ALLOWED_REGEXP = /^[\w\d_*\-@&%$]+$/;
  const PASSWORD_REQUIRED_REGEXP = /^(?=.*[A-Z])(?=.*[_*\-@&%$])/;

  if (value === "") {
    return "Please, enter password";
  } else if (value.length < 8 || value.length > 15) {
    return `Please, enter from 8 to 15 characters`;
  } else if (!PASSWORD_ALLOWED_REGEXP.test(value)) {
    return "Please, use letters, numbers or '_*-@&%$'";
  } else if (!PASSWORD_REQUIRED_REGEXP.test(value)) {
    return "Please, use one uppercase letter and special symbol";
  } else return null;
}
