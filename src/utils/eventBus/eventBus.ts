type Listener = (...args: unknown[]) => void;

export default class EventBus {
  listeners: Record<string, Listener[]>;
  constructor() {
    this.listeners = Object.create(null);
  }

  on(event: string, callback: Listener) {
    console.log(callback.name, " subscribed to ", event);
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Listener) {
    if (!this.listeners[event]) throw new Error(`Event ${event} doesnt exist`);

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: unknown[]) {
    console.log("EVent emitted: ", event);
    if (!this.listeners[event]) throw new Error(`Event ${event} doesnt exist`);

    this.listeners[event].forEach((listener) => listener(...args));
  }
}
