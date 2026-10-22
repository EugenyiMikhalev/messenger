import Block from "../../core/Block";
import { Props } from "../../types/Component";
import isStringArray from "../../utils/isStringArray/isStringArray";
import shallowEqual from "../../utils/shallowEqual/shallowEqual";
import { validateField } from "../../utils/validation/validateField";
import {
  validateLogin,
  validateLoginPassword,
} from "../../utils/validation/validators";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Link from "../Link/Link";
import { LoginFormTemplate } from "./LoginForm.tmpl";

class LoginForm extends Block {
  constructor(props: Props) {
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
                  ...this.getField("passInput", "#password-input__error"),
                  validator: validateLoginPassword,
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

              const loginForm = this.element;
              if (!(loginForm instanceof HTMLFormElement))
                throw new Error("form element needs to be HTMLFormElement");

              new FormData(loginForm).forEach((value, name) => {
                values[name] = value;
              });

              console.log("Form values: ", values);
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
        passInput: new Input({
          classes: ["form__input"],
          name: "password",
          id: "password",
          type: "password",
          placeholder: "Enter password",
          ariaDescribedby: "password-input__error",
          autocomplete: "current-password",
          settings: { withInternalId: true },
          events: {
            blur: [
              () => {
                const { input, errorElement } = this.getField(
                  "passInput",
                  "#password-input__error",
                );
                validateField(input, validateLoginPassword, errorElement);
              },
            ],
            focus: [
              () => {
                const { input, errorElement } = this.getField(
                  "passInput",
                  "#password-input__error",
                );
                validateField(input, validateLoginPassword, errorElement);
              },
            ],
          },
        }),
        regLink: new Link({
          href: "/registration",
          text: "Create account",
          settings: {
            withInternalId: true,
          },
        }),
      },
    );
  }

  private getField(name: "loginInput" | "passInput", errorSelector: string) {
    const input = this.children[name].getContent();
    const errorElement = this.element.querySelector(errorSelector);

    if (!(input instanceof HTMLInputElement))
      throw new Error("Input needs to be HTMLInputElement");

    if (!(errorElement instanceof HTMLElement))
      throw new Error("errorElement needs to be HTMLElement");

    return { input, errorElement };
  }

  render() {
    const { classes, validate } = this.props;

    if (!isStringArray(classes))
      throw new Error("Classes need to be a string[]");

    this.element.classList.add(...classes);
    if (validate === "novalidate") this.element.setAttribute("novalidate", "");

    return this.compile(LoginFormTemplate, { ...this.props });
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.buttonText !== newProps.buttonText) {
      const button = this.children.submitButton;

      if (!(button instanceof Button))
        throw new Error("submitButton need to be Button component");
      button.setProps({ text: newProps.buttonText });
    }
    return !shallowEqual(oldProps, newProps);
  }
}

export default LoginForm;
