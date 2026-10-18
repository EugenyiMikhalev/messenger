import type { BlockEvents, Children, Events, Props } from "../types/Component";
import EventBus from "./EventBus";
import shallowEqual from "../utils/shallowEqual/shallowEqual";
import { v4 as uuidv4 } from "uuid";
import Templator from "../utils/templator/templator";

export default abstract class Block<P extends Props = Props> {
  static readonly EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  } as const;

  private _element: HTMLElement | null = null;
  private _meta: {
    tagName: string;
    props: P;
    children: Children;
  };
  eventBus: () => EventBus<BlockEvents<P>>;
  props: P;
  children: Children;
  private _attachedEvents: Events = {};
  private _id: string | null = null;

  constructor(tagName: string = "div", props: P, children: Children = {}) {
    const eventBus = new EventBus<BlockEvents<P>>();

    this._meta = {
      tagName,
      props,
      children,
    };

    this.children = children;

    if (props.settings?.withInternalId) {
      this._id = uuidv4();
      this.props = this._makePropsProxy({ ...props, __id: this._id });
    } else {
      this.props = this._makePropsProxy(props);
    }
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  compile(template: string, props: Record<string, unknown>): Node[] {
    const propsAndStubs: Record<string, unknown> = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      const stub = document.createElement("div");
      if (!child.id) throw new Error(`child ${key} has no ID`);
      stub.dataset.id = child.id;
      propsAndStubs[key] = stub;
    });
    const nodes = new Templator(template).compile(propsAndStubs);

    const fragment = document.createDocumentFragment();
    fragment.append(...nodes);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.querySelector(`[data-id="${child.id}"]`);

      stub?.replaceWith(child.getContent());
    });
    return [...fragment.childNodes];
  }

  private _registerEvents(eventBus: EventBus<BlockEvents<P>>): void {
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

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: P, newProps: P): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: P, newProps: P): boolean {
    return !shallowEqual(oldProps, newProps);
  }

  setProps = (nextProps: Partial<P>): void => {
    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    if (this._element === null) throw new Error("Element is not created yet");
    return this._element;
  }

  private _addEvents(): void {
    const { events = {} } = this.props;
    Object.entries(events).forEach(([eventName, callbacks]) => {
      this._attachedEvents[eventName] = [...callbacks];
      callbacks.forEach((callback) =>
        this.element.addEventListener(eventName, callback),
      );
    });
  }

  private _removeEvents(): void {
    for (const event in this._attachedEvents) {
      this._attachedEvents[event].forEach((callback) =>
        this.element.removeEventListener(event, callback),
      );
    }
    this._attachedEvents = {};
  }

  _render(): void {
    const block: (Node | string)[] = this.render();

    this._removeEvents();

    this.element.replaceChildren(...block);

    this._addEvents();
  }

  abstract render(): Array<Node | string>;

  getContent(): HTMLElement {
    return this.element;
  }

  _makePropsProxy(props: P): P {
    return new Proxy(props, {
      set: (target: P, prop: string, newVal: unknown): boolean => {
        const oldProps = { ...target };
        const updated = Reflect.set(target, prop, newVal);

        if (updated) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        }

        return updated;
      },
      deleteProperty() {
        throw new Error("Cant delete a prop");
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    if (this._id) element.setAttribute("data-id", this._id);
    return element;
  }

  show(): void {
    this.element.style.display = "block";
  }

  hide(): void {
    this.element.style.display = "none";
  }

  get id(): string | null {
    return this._id;
  }
}
