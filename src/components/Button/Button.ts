import Block from "../../core/Block";
import Templator from "../../utils/templator/templator";
import { Props } from "../../types/Component";

class Button extends Block {
  constructor(props: Props) {
    super("button", props);
  }

  render() {
    const { text, disabled, classes, type } = this.props;

    this.element.classList.add(classes);

    if (type) {
      this.element.setAttribute("type", "submit");
    }

    if (disabled) {
      this.element.setAttribute("disabled", "disabled");
    } else {
      this.element.removeAttribute("disabled");
    }

    const source = `{{text}}`;
    return this.compile(source, { ...this.props });
  }
}

export default Button;
