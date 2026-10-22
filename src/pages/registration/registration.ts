import registrationTemplate from "./registration.tmpl";
import revealIcon from "../../assets/icons/reveal.svg";
import { Children } from "../../types/Component";
import RegForm, { RegFormProps } from "../../components/RegForm/RegForm";
import Block from "../../core/Block";

type RegProps = {
  classes: string[];
};

const regFormProps: RegFormProps = {
  settings: { withInternalId: true },
  classes: ["form"],
  validate: "novalidate",
  buttonText: "REGISTRATE",
  revealIcon: revealIcon,
};

const regChildren: Children = {
  regForm: new RegForm(regFormProps),
};

const regProps: RegProps = {
  classes: ["page", "page_layout_vertical"],
};

class RegPage extends Block<RegProps> {
  constructor() {
    super("main", regProps, regChildren);

    const { classes } = this.props;
    this.element.classList.add(...classes);
  }

  render() {
    return this.compile(registrationTemplate, { ...this.props });
  }

  show(): void {
    this.element.style.display = "flex";
  }
}

export default RegPage;
