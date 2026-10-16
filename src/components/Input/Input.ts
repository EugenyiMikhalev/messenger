import Block from "../../core/Block";
import { Props } from "../../types/Component";

class Input extends Block {
  constructor(props: Props) {
    super("input", props);
  }

  render() {
    const {
      classes,
      name,
      id,
      type,
      placeholder,
      autocomplete,
      ariaDescribedby,
    } = this.props;

    this.element.classList.add(classes);
    this.element.setAttribute("name", name);
    this.element.setAttribute("id", id);
    this.element.setAttribute("type", type);
    this.element.setAttribute("placeholder", placeholder);
    this.element.setAttribute("autocomplete", autocomplete);
    this.element.setAttribute("aria-describedby", ariaDescribedby);

    const source = `
    `;

    return this.compile(source, this.props);
  }
}

export default Input;
