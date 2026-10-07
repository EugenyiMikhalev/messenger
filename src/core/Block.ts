import { Props } from "../types/Component";
import EventBus from "./EventBus";
import shallowEqual from "../utils/shallowEqual/shallowEqual";

export default abstract class Block {
  static readonly EVENTS: Record<string, string> = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  } as const;

  private _element: HTMLElement | null = null;
  private _meta: {
    tagName: string;
    props: Props;
  };
  eventBus: () => EventBus;
  props: Props;

  constructor(tagName: string = "div", props: Props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return !shallowEqual(oldProps, newProps);
  }

  setProps = (nextProps: Props): void => {
    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    if (this._element === null) throw new Error("Element is not created yet");
    return this._element;
  }

  _render(): void {
    const block = this.render();

    this.element.replaceChildren(...block);
  }

  abstract render(): Array<Node | string>;

  getContent(): HTMLElement {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    return new Proxy(props, {
      set: (target: Props, prop: string, newVal: unknown): boolean => {
        const oldProps = { ...target };
        target[prop] = newVal;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
      deleteProperty() {
        throw new Error("Cant delete a prop");
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    this.element.style.display = "block";
  }

  hide(): void {
    this.element.style.display = "none";
  }
}
