import Templator from "../../utils/templator/templator";
import loginPageTemplate from "./login.tmpl";
import {
  validateLogin,
  validateLoginPassword,
} from "../../utils/validation/validators";
import { validateField } from "../../utils/validation/validateField";

const context: Record<string, string> = {
  loginFormHref: "/register",
};

function renderLogin(context: Record<string, string>): HTMLElement[] {
  const templator = new Templator(loginPageTemplate);

  return templator.compile(context);
}

let render: HTMLElement[] = renderLogin(context);

addEvents(render);

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

  const fields = [
    {
      input: loginInput,
      errorElement: loginErrorEl,
      validator: validateLogin,
    },
    {
      input: passwordInput,
      errorElement: passwordErrorEl,
      validator: validateLoginPassword,
    },
  ];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      fields
        .map((field) =>
          validateField(field.input, field.validator, field.errorElement),
        )
        .some((error) => error !== null)
    )
      return;

    const values: Record<string, FormDataEntryValue> = {};

    new FormData(form).forEach((value, name) => {
      values[name] = value;
    });
  });

  fields.forEach((field) => {
    const handleValidation = () =>
      validateField(field.input, field.validator, field.errorElement);

    field.input.addEventListener("blur", handleValidation);
    field.input.addEventListener("focus", handleValidation);
  });
}

render.forEach((element: HTMLElement) => document.body.append(element));
