import Block from "../../core/Block";
import { Props } from "../../types/Component";
import linkTemplate from "./Link.tmpl";

type LinkProps = Props & {
  href: string;
};

class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super("a", { ...props });
    const { href } = this.props;

    this.element.setAttribute("href", href);
    this.element.setAttribute("target", "_self");
  }

  render() {
    return this.compile(linkTemplate, { ...this.props });
  }
}

export default Link;
