export type DOMEventHandler = (event: Event) => void;

export type Events = Record<string, DOMEventHandler[]>;

export type Props = Record<string, unknown> & {
  settings?: {
    withInternalId?: boolean;
  };
  events?: Events;
};

// export type Children = Record<string, Block>;
export interface ComponentChild {
  readonly id?: string | null;

  getContent(): HTMLElement;
  dispatchComponentDidMount(): void;
}

export type Children = Record<string, ComponentChild>;

export type BlockEvents<P extends Props = Props> = {
  init: [];
  "flow:component-did-mount": [];
  "flow:render": [];
  "flow:component-did-update": [oldProps: P, newProps: P];
};
