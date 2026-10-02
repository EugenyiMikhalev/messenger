export default class EventBus {
  listeners;
  constructor() {
    this.listeners = Object.create(null);
  }

  on(event, callback) {
    console.log(callback.name, " subscribed to ", event);
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) throw new Error(`Event ${event} doesnt exist`);

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event, ...args) {
    console.log("EVent emitted: ", event);
    if (!this.listeners[event]) throw new Error(`Event ${event} doesnt exist`);

    this.listeners[event].forEach((listener) => listener(...args));
  }
}
