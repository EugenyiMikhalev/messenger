import loginPageTemplate from "./login.tmpl";
import Block from "../../core/Block";
import { Children, Props } from "../../types/Component";
import LoginForm from "../../components/LoginForm/LoginForm";
import isStringArray from "../../utils/isStringArray/isStringArray";

const loginFormProps: Props = {
  settings: { withInternalId: true },
  classes: ["form"],
  validate: "novalidate",
  loginFormHref: "/registration",
  buttonText: "LOGIN",
};

const loginChildren: Children = {
  loginForm: new LoginForm(loginFormProps),
};

const loginProps: Record<string, unknown> = {
  classes: ["page", "page_layout_vertical"],
};

class LoginPage extends Block {
  constructor() {
    super("main", loginProps, loginChildren);
    const { classes } = this.props;

    if (!isStringArray(classes))
      throw new Error("Classes need to be a string[]");
    this.element.classList.add(...classes);
  }

  render() {
    return this.compile(loginPageTemplate, { ...this.props });
  }

  show() {
    this.element.style.display = "flex";
  }
}

export default LoginPage;
