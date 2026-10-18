import Block from "../../core/Block";
import { Props } from "../../types/Component";
import isStringArray from "../../utils/isStringArray/isStringArray";
import { InputTemplate } from "./Input.tmpl";

type InputProps = Props & {
  classes: string[];
  name: string;
  id: string;
  type: string;
  placeholder: string;
  autocomplete: string;
  ariaDescribedby: string;
};

class Input extends Block<InputProps> {
  constructor(props: InputProps) {
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

    if (!isStringArray(classes))
      throw new Error("Classes need to be a string[]");

    this.element.classList.add(...classes);
    this.element.setAttribute("name", name);
    this.element.setAttribute("id", id);
    this.element.setAttribute("type", type);
    this.element.setAttribute("placeholder", placeholder);
    this.element.setAttribute("autocomplete", autocomplete);
    this.element.setAttribute("aria-describedby", ariaDescribedby);

    return this.compile(InputTemplate, this.props);
  }
}

export default Input;
