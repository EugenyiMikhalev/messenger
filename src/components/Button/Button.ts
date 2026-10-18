import Block from "../../core/Block";
import { Props } from "../../types/Component";
import isStringArray from "../../utils/isStringArray/isStringArray";
import { ButtonTemplate } from "./Button.tmpl";

class Button extends Block {
  constructor(props: Props) {
    super("button", props);
  }

  render() {
    const { disabled, classes, type } = this.props;

    if (!isStringArray(classes))
      throw new Error("Classes need to be a string[]");

    this.element.classList.add(...classes);

    if (type) {
      this.element.setAttribute("type", "submit");
    }

    if (disabled) {
      this.element.setAttribute("disabled", "disabled");
    } else {
      this.element.removeAttribute("disabled");
    }

    return this.compile(ButtonTemplate, { ...this.props });
  }
}

export default Button;
