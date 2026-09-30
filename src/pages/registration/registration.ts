import Templator from "../../utils/templator/templator";
import {
  validateEmail,
  validateLogin,
  validateRegistrationPassword,
  validateRepeatPassword,
} from "../../utils/validation/validators";
import { registrationTemplate } from "./registration.tmpl";
import revealIcon from "../../assets/icons/reveal.svg";
import { validateField } from "../../utils/validation/validateField";

const context: Record<string, string> = {
  loginFormHref: "/login",
  revealIcon,
};

function renderRegistration(context: Record<string, string>): HTMLElement[] {
  const templator = new Templator(registrationTemplate);

  return templator.compile(context);
}

const render: HTMLElement[] = renderRegistration(context);

addEvents(render);

function addEvents(render: HTMLElement[]) {
  const form: HTMLFormElement | null = render[0]?.querySelector("#reg-form");
  const loginInput: HTMLInputElement | null =
    render[0]?.querySelector("#login");
  const loginErrorEl: HTMLElement | null = render[0]?.querySelector(
    "#login-input__error",
  );

  const emailInput: HTMLInputElement | null =
    render[0]?.querySelector("#email");
  const emailErrorEl: HTMLElement | null = render[0]?.querySelector(
    "#email-input__error",
  );

  const passwordInput: HTMLInputElement | null =
    render[0]?.querySelector("#password");
  const passwordErrorEl: HTMLElement | null = render[0]?.querySelector(
    "#password-input__error",
  );

  const passButton: HTMLElement | null =
    render[0]?.querySelector("#pass-button");

  const repeatPasswordInput: HTMLInputElement | null =
    render[0]?.querySelector("#repeat-password");
  const repeatPasswordEl: HTMLElement | null = render[0]?.querySelector(
    "#repeat-password-input__error",
  );

  const passRepButton: HTMLElement | null =
    render[0]?.querySelector("#pass-rep-button");

  if (!(form instanceof HTMLFormElement)) {
    throw new Error("Form does not exist in registration page");
  }
  if (!(loginInput instanceof HTMLInputElement)) {
    throw new Error("Login input does not exist in registration page");
  }
  if (!(emailInput instanceof HTMLInputElement)) {
    throw new Error("Login input does not exist in registration page");
  }
  if (!(passwordInput instanceof HTMLInputElement)) {
    throw new Error("Password input does not exist in registration page");
  }
  if (!(passButton instanceof HTMLButtonElement)) {
    throw new Error("Password btn does not exist in registration page");
  }
  if (!(repeatPasswordInput instanceof HTMLInputElement)) {
    throw new Error("Password input does not exist in registration page");
  }
  if (!(passRepButton instanceof HTMLButtonElement)) {
    throw new Error("Password btn does not exist in registration page");
  }
  if (!(loginErrorEl instanceof HTMLElement)) {
    throw new Error("Error Text does not exist in registration page");
  }
  if (!(emailErrorEl instanceof HTMLElement)) {
    throw new Error("Error Text does not exist in registration page");
  }
  if (!(passwordErrorEl instanceof HTMLElement)) {
    throw new Error("Error Text does not exist in registration page");
  }
  if (!(repeatPasswordEl instanceof HTMLElement)) {
    throw new Error("Error Text does not exist in registration page");
  }

  const fields = [
    {
      input: loginInput,
      errorElement: loginErrorEl,
      validator: validateLogin,
    },
    {
      input: emailInput,
      errorElement: emailErrorEl,
      validator: validateEmail,
    },
    {
      input: passwordInput,
      errorElement: passwordErrorEl,
      validator: validateRegistrationPassword,
      revealButton: passButton,
    },
    {
      input: repeatPasswordInput,
      errorElement: repeatPasswordEl,
      validator: (value: string) =>
        validateRepeatPassword(value, passwordInput.value),
      revealButton: passRepButton,
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

    if (field.revealButton) {
      field.revealButton.addEventListener("click", () => {
        field.input.type =
          field.input.type === "password" ? "text" : "password";
      });
    }
  });
}

render.forEach((element: HTMLElement) => document.body.append(element));
