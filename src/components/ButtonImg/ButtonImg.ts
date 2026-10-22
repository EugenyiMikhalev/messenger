import Block from "../../core/Block";
import { Props } from "../../types/Component";
import buttonImgTemplate from "./ButtonImg.tmpl";

type ButtonImgProps = Props & {
  classes: string[];
  icon: SVGAElement;
  altText: string;
};

class ButtonImg extends Block<ButtonImgProps> {
  constructor(props: ButtonImgProps) {
    super("button", { ...props });
  }

  render() {
    const { classes } = this.props;
    this.element.classList.add(...classes);
    this.element.setAttribute("type", "button");
    this.element.setAttribute("aria-controls", "password");
    this.element.setAttribute("aria-label", "Show password");

    return this.compile(buttonImgTemplate, { ...this.props });
  }
}

export default ButtonImg;
