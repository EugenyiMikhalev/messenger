import loginPageTemplate from "./login.tmpl";
import Block from "../../core/Block";
import { Props } from "../../types/Component";
import render from "../../utils/renderDOM/renderDOM";
import LoginForm from "../../components/LoginForm/LoginForm";

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
  constructor(tagName: string, props: Props) {
    super(tagName, props);
    const { classes } = this.props;
    this.element.classList.add(...classes);
  }

  render() {
    return this.compile(loginPageTemplate, { ...this.props });
  }
}

const loginPage = new LoginPage("main", context);

render(".app", loginPage);
