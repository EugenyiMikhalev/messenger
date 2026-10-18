import loginPageTemplate from "./login.tmpl";
import Block from "../../core/Block";
import { Children, Props } from "../../types/Component";
import render from "../../utils/renderDOM/renderDOM";
import LoginForm from "../../components/LoginForm/LoginForm";
import isStringArray from "../../utils/isStringArray/isStringArray";

const LoginFormProps = {
  settings: { withInternalId: true },
  classes: ["form"],
  validate: "novalidate",
  loginFormHref: "/registration",
  buttonText: "LOGIN",
};

const loginForm = new LoginForm(LoginFormProps);

const context: Record<string, unknown> = {
  classes: ["page", "page_layout_vertical"],
  loginForm,
};

class LoginPage extends Block {
  constructor(tagName: string, props: Props, children: Children) {
    super(tagName, props, children);
    const { classes } = this.props;

    if (!isStringArray(classes))
      throw new Error("Classes need to be a string[]");
    this.element.classList.add(...classes);
  }

  render() {
    return this.compile(loginPageTemplate, { ...this.props });
  }
}

const loginPage = new LoginPage("main", context, { loginForm });

render(".app", loginPage);
