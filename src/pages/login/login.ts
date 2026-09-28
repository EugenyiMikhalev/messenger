import Templator from "../../utils/templator/templator";
import loginPageTemplate from "./login.tmpl";
import {
  validateLogin,
  validateLoginPassword,
} from "../../utils/validation/validators";
import { showFieldError } from "../../utils/showField/showField";

const context = {
  loginFormHref: "/register",
};

function renderLogin(context: Record<string, string>): HTMLElement[] {
  const templator = new Templator(loginPageTemplate);

  return templator.compile(context);
}

let render: HTMLElement[] = renderLogin(context);

addEvents(render);

function validateField(
  input: HTMLInputElement,
  validator: (input: string) => string | null,
  errorEl: HTMLElement,
) {
  const value = input.value;
  const error = validator(value);
  showFieldError(input, errorEl, error);
  return error;
}

function addEvents(render: HTMLElement[]) {
  const form: HTMLFormElement | null = render[0]?.querySelector("#login-form");
  const loginInput: HTMLInputElement | null =
    render[0]?.querySelector("#login");
  const loginErrorEl: HTMLElement | null = render[0]?.querySelector(
    "#login-input__error",
  );

  const passwordInput: HTMLInputElement | null =
    render[0]?.querySelector("#password");
  const passwordErrorEl: HTMLElement | null = render[0]?.querySelector(
    "#password-input__error",
  );

  if (!(form instanceof HTMLFormElement)) {
    throw new Error("Form does not exist in login page");
  }
  if (!(loginInput instanceof HTMLInputElement)) {
    throw new Error("Login input does not exist in login page");
  }
  if (!(passwordInput instanceof HTMLInputElement)) {
    throw new Error("Password input does not exist in login page");
  }
  if (!(loginErrorEl instanceof HTMLElement)) {
    throw new Error("Error Text does not exist in login page");
  }
  if (!(passwordErrorEl instanceof HTMLElement)) {
    throw new Error("Error Text does not exist in login page");
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    let loginError = validateField(loginInput, validateLogin, loginErrorEl);
    let passError = validateField(
      passwordInput,
      validateLoginPassword,
      passwordErrorEl,
    );
    if (loginError || passError) {
      return;
    }
    const values: Record<string, FormDataEntryValue> = {};

    new FormData(form).forEach((value, name) => {
      values[name] = value;
    });
    console.log("submitted", values);
  });

  const handleLogin = () => {
    return validateField(loginInput, validateLogin, loginErrorEl);
  };

  loginInput?.addEventListener("focus", handleLogin);
  loginInput?.addEventListener("blur", handleLogin);

  const handlePassword = () => {
    return validateField(passwordInput, validateLoginPassword, passwordErrorEl);
  };

  passwordInput?.addEventListener("focus", handlePassword);
  passwordInput?.addEventListener("blur", handlePassword);
}

render.forEach((element: HTMLElement) => document.body.append(element));
