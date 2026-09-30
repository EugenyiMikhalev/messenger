import settingsTemplate from "./settings.tmpl";
import Templator from "../../utils/templator/templator";
import data from "../../data/test";
import {
  validateEmail,
  validateLogin,
  validateName,
} from "../../utils/validation/validators";
import { validateField } from "../../utils/validation/validateField";
import { User } from "../../types/User";

type SettingsData = Pick<User, "login" | "name" | "email">;

function renderSettings(context: SettingsData): HTMLElement[] {
  const templator = new Templator(settingsTemplate);
  return templator.compile(context);
}
const render: HTMLElement[] = renderSettings(data.user);

function addEvents(render: HTMLElement[]) {
  const form: HTMLFormElement | null =
    render[0].querySelector("#settings-form");
  if (!(form instanceof HTMLFormElement))
    throw new Error("Form element doesnt exist in settings page");

  const loginInput: HTMLInputElement | null =
    render[0].querySelector("#login-input");
  if (!(loginInput instanceof HTMLInputElement))
    throw new Error("Login input element doesnt exit in settings page");
  const loginErrorEl: HTMLElement | null = render[0].querySelector(
    "#login-input__error",
  );
  if (!(loginErrorEl instanceof HTMLElement))
    throw new Error("Login error element doesnt exist in settings page");

  const nameInput: HTMLInputElement | null =
    render[0].querySelector("#name-input");
  if (!(nameInput instanceof HTMLInputElement))
    throw new Error("Name input element doesnt exist in settings page");
  const nameErrorEl: HTMLElement | null =
    render[0].querySelector("#name-input__error");
  if (!(nameErrorEl instanceof HTMLElement))
    throw new Error("Name error element doesnt exist in settings page");

  const emailInput: HTMLInputElement | null =
    render[0].querySelector("#email-input");
  if (!(emailInput instanceof HTMLInputElement))
    throw new Error("Email input element doesnt exist in settings page");
  const emailErrorEl: HTMLElement | null = render[0].querySelector(
    "#email-input__error",
  );
  if (!(emailErrorEl instanceof HTMLElement))
    throw new Error("Email error element doesnt exist in settings page");

  const fields = [
    {
      input: loginInput,
      errorElement: loginErrorEl,
      validator: validateLogin,
    },
    {
      input: nameInput,
      errorElement: nameErrorEl,
      validator: validateName,
    },
    {
      input: emailInput,
      errorElement: emailErrorEl,
      validator: validateEmail,
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

    new FormData(form).forEach((value, name) => (values[name] = value));

    console.log(values);
  });

  fields.forEach((field) => {
    const handleValidation = () => {
      validateField(field.input, field.validator, field.errorElement);
    };

    field.input.addEventListener("focus", handleValidation);
    field.input.addEventListener("blur", handleValidation);
  });
}
addEvents(render);

render.forEach((element) => document.body.append(element));
