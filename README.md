# Messenger

## Purpose:

Make a messenger app with vanilla JS as well as custom **templator**.

## Stack:

- TypeScript
- JavaScript
- PostCSS
- Linting: Oxlint for TS, stylelint for css

### Bundler:

- Parcel

## Core:

### Block.ts

Class Block from whome components are created and inherit their methods.

**Example**

```ts
class Button extends Block {
  constructor(props: Props) {
    super("button", props);
  }

  render() {
    const { disabled, classes, type } = this.props;

    // add attributes, classes etc...

    // ButtonTemplate = `{{text}}`, where 'text' given from parent prop
    return this.compile(ButtonTemplate, { ...this.props });
  }
}
```

### EventBus.ts

EventBus can add listeners to react for events, like "flow:component-did-update". It can emit to listeners that event happened or delete listener.
