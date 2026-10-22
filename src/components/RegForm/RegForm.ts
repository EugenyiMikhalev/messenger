import Block from "../../core/Block";
import { Props } from "../../types/Component";
import { validateField } from "../../utils/validation/validateField";
import {
  validateEmail,
  validateLogin,
  validateRegistrationPassword,
  validateRepeatPassword,
} from "../../utils/validation/validators";
import Button from "../Button/Button";
import ButtonImg from "../ButtonImg/ButtonImg";
import Input from "../Input/Input";
import Link from "../Link/Link";
import regFormTemplate from "./RegForm.tmpl";

export type RegFormProps = Props & {
  classes: string[];
  validate: string;
  buttonText: string;
  revealIcon: SVGAElement;
};

type Fields = "loginInput" | "emailInput" | "passInput" | "passRepeatInput";

class RegForm extends Block<RegFormProps> {
  constructor(props: RegFormProps) {
    super(
      "form",
      {
        ...props,
        events: {
          submit: [
            (e: Event) => {
              e.preventDefault();

              const fields = [
                {
                  ...this.getField("loginInput", "#login-input__error"),
                  validator: validateLogin,
                },
                {
                  ...this.getField("emailInput", "#email-input__error"),
                  validator: validateEmail,
                },
                {
                  ...this.getField("passInput", "#password-input__error"),
                  validator: validateRegistrationPassword,
                },
                {
                  ...this.getField(
                    "passRepeatInput",
                    "#repeat-password-input__error",
                  ),
                  validator: (value: string) =>
                    validateRepeatPassword(
                      value,
                      this.getField("passInput", "password-input__error").input
                        .value,
                    ),
                },
              ];

              if (
                fields
                  .map((field) =>
                    validateField(
                      field.input,
                      field.validator,
                      field.errorElement,
                    ),
                  )
                  .some((error) => error !== null)
              )
                return;

              const values: Record<string, FormDataEntryValue> = {};

              const regForm = this.element;
              if (!(regForm instanceof HTMLFormElement))
                throw new Error("RegForm needs to be HTMLFormElement");
              new FormData(regForm).forEach((value, name) => {
                values[name] = value;
              });

              console.log("reg form values: ", values);
            },
          ],
        },
      },
      {
        submitButton: new Button({
          text: props.buttonText,
          classes: ["form__submit-button"],
          settings: { withInternalId: true },
        }),
        loginInput: new Input({
          classes: ["form__input"],
          name: "login",
          id: "login",
          type: "text",
          placeholder: "Enter login",
          ariaDescribedby: "login-input__error",
          autocomplete: "username",
          settings: { withInternalId: true },
          events: {
            blur: [
              () => {
                const { input, errorElement } = this.getField(
                  "loginInput",
                  "#login-input__error",
                );
                validateField(input, validateLogin, errorElement);
              },
            ],
            focus: [
              () => {
                const { input, errorElement } = this.getField(
                  "loginInput",
                  "#login-input__error",
                );
                validateField(input, validateLogin, errorElement);
              },
            ],
          },
        }),
        emailInput: new Input({
          classes: ["form__input"],
          name: "email",
          id: "email",
          type: "email",
          placeholder: "Enter email",
          ariaDescribedby: "email-input__error",
          autocomplete: "email",
          settings: { withInternalId: true },
          events: {
            blur: [
              () => {
                const { input, errorElement } = this.getField(
                  "emailInput",
                  "#email-input__error",
                );
                validateField(input, validateEmail, errorElement);
              },
            ],
            focus: [
              () => {
                const { input, errorElement } = this.getField(
                  "emailInput",
                  "#email-input__error",
                );
                validateField(input, validateEmail, errorElement);
              },
            ],
          },
        }),
        passInput: new Input({
          classes: ["form__input"],
          name: "password",
          id: "password",
          type: "password",
          placeholder: "Enter password",
          ariaDescribedby: "password-input__error",
          autocomplete: "new-password",
          settings: { withInternalId: true },
          events: {
            blur: [
              () => {
                const { input, errorElement } = this.getField(
                  "passInput",
                  "#password-input__error",
                );
                validateField(
                  input,
                  validateRegistrationPassword,
                  errorElement,
                );
              },
            ],
            focus: [
              () => {
                const { input, errorElement } = this.getField(
                  "passInput",
                  "#password-input__error",
                );
                validateField(
                  input,
                  validateRegistrationPassword,
                  errorElement,
                );
              },
            ],
          },
        }),
        passRepeatInput: new Input({
          classes: ["form__input"],
          name: "repeat-password",
          id: "repeat-password",
          type: "password",
          placeholder: "Repeat password",
          ariaDescribedby: "repeat-password-input__error",
          autocomplete: "new-password",
          settings: { withInternalId: true },
          events: {
            blur: [
              () => {
                const { input, errorElement } = this.getField(
                  "passRepeatInput",
                  "#repeat-password-input__error",
                );
                validateField(
                  input,
                  (value: string) =>
                    validateRepeatPassword(
                      value,
                      this.getField("passInput", "password-input__error").input
                        .value,
                    ),
                  errorElement,
                );
              },
            ],
            focus: [
              () => {
                const { input, errorElement } = this.getField(
                  "passRepeatInput",
                  "#repeat-password-input__error",
                );
                validateField(
                  input,
                  (value: string) =>
                    validateRepeatPassword(
                      value,
                      this.getField("passInput", "password-input__error").input
                        .value,
                    ),
                  errorElement,
                );
              },
            ],
          },
        }),
        showPassBtn: new ButtonImg({
          altText: "Show password",
          icon: props.revealIcon,
          classes: ["button", "button_type_img", "button_input"],
          settings: {
            withInternalId: true,
          },
          events: {
            click: [
              () => {
                const passInput = this.children["passInput"].getContent();
                const curMode = passInput.getAttribute("type");
                passInput.setAttribute(
                  "type",
                  curMode === "password" ? "text" : "password",
                );
              },
            ],
          },
        }),
        showPassRepBtn: new ButtonImg({
          altText: "Show password",
          icon: props.revealIcon,
          classes: ["button", "button_type_img", "button_input"],
          settings: {
            withInternalId: true,
          },
          events: {
            click: [
              () => {
                const passInput = this.children["passRepeatInput"].getContent();
                const curMode = passInput.getAttribute("type");
                passInput.setAttribute(
                  "type",
                  curMode === "password" ? "text" : "password",
                );
              },
            ],
          },
        }),
        loginLink: new Link({
          href: "/login",
          text: "Log In",
          settings: {
            withInternalId: true,
          },
        }),
      },
    );
  }

  render() {
    const { classes, validate } = this.props;

    this.element.classList.add(...classes);
    if (validate === "novalidate") this.element.setAttribute("novalidate", "");

    return this.compile(regFormTemplate, { ...this.props });
  }

  private getField(name: Fields, errorSelector: string) {
    const input = this.children[name].getContent();
    const errorElement = this.element.querySelector(errorSelector);

    if (!(input instanceof HTMLInputElement))
      throw new Error("Input needs to be HTMLInputElement");
    if (!(errorElement instanceof HTMLElement))
      throw new Error("errorElement needs to be HTMLElement");

    return { input, errorElement };
  }
}

export default RegForm;
