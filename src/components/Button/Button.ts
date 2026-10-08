import Block from "../../core/Block";
import Templator from "../../utils/templator/templator";
import { Props } from "../../types/Component";

class Button extends Block {
  constructor(props: Props) {
    super("button", props);
  }

  render() {
    const { text, disabled } = this.props;

    this.element.classList.add("button", "button_background_black");

    if (disabled) {
      this.element.setAttribute("disabled", "disabled");
    } else {
      this.element.removeAttribute("disabled");
    }

    const source = `{{text}}`;
    const templator = new Templator(source);

    return templator.compile({ text });
  }
}

export default Button;
