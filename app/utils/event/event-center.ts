type Fn = (...args: any[]) => void;

export class EventCenter {
  private events: { [key: string]: Fn[] } = {};

  public on(event: string, callback: Fn) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  public emit(event: string, ...args: any[]) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => {
        callback(...args);
      });
    }
  }

  public off(event: string, callback: Fn) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}

export const eventCenter = new EventCenter();
