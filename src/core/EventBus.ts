type Listener<Args extends unknown[]> = (...args: Args) => void;

export default class EventBus<
  EventMap extends { [K in keyof EventMap]: unknown[] },
> {
  private listeners: {
    [K in keyof EventMap]?: Listener<EventMap[K]>[];
  } = Object.create(null);

  constructor() {
    this.listeners = Object.create(null);
  }

  on<K extends keyof EventMap>(
    event: K,
    callback: Listener<EventMap[K]>,
  ): void {
    const listeners = this.listeners[event] ?? [];

    listeners.push(callback);

    this.listeners[event] = listeners;
  }

  off<K extends keyof EventMap>(
    event: K,
    callback: Listener<EventMap[K]>,
  ): void {
    const listeners = this.listeners[event];

    if (!listeners) {
      throw new Error(`Event ${String(event)} doesnt exist}`);
    }

    this.listeners[event] = listeners.filter(
      (listener) => listener !== callback,
    );
  }

  emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): void {
    const listeners = this.listeners[event];

    if (!listeners) {
      throw new Error(`Event ${String(event)} doesnt exist}`);
    }

    listeners.forEach((listener) => listener(...args));
  }
}
