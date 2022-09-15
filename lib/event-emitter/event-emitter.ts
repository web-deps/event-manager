import Event from '../event/event';
import type { IEvent } from '../event/event';

type TObserver = <ISubject, TData>(event: IEvent<ISubject, TData>) => void;

interface IObserverCollection {
  [eventName: string]: Array<TObserver>;
}

abstract class AEventEmitter<ISubject, TData> {
  abstract readonly subject: ISubject;
  abstract readonly events: Array<string>;
  abstract readonly observers: IObserverCollection;
  abstract eventIsRegistered(eventName: string): boolean;
  abstract addObserver(eventName: string, observer: TObserver): void;
  abstract removeObserver(eventName: string, observer: TObserver): void;
  protected abstract notifyObservers(eventName: string, data?: TData): void;
  abstract emit(eventName: string, data?: TData): void;
}

class EventEmitter<ISubject, TData> extends AEventEmitter<ISubject, TData> {
  readonly subject: ISubject;
  readonly events: Array<string>;
  readonly observers: IObserverCollection = {};

  constructor(subject: ISubject, events: Array<string>) {
    super();
    this.subject = subject;
    this.events = events;
    for (const event of events) this.observers[event] = [];
  }

  eventIsRegistered(eventName: string): boolean {
    return this.events.includes(eventName);
  }

  addObserver(eventName: string, observer: TObserver) {
    if (!this.eventIsRegistered(eventName)) {
      throw new Error(`
        Failed to add observer.
        Event "${eventName}" is not registered.
      `);
    }

    let observers = this.observers[eventName];
    observers.push(observer);
  }

  removeObserver(eventName: string, observer: TObserver) {
    if (!this.eventIsRegistered(eventName)) {
      throw new Error(`
        Failed to remove observer.
        Event "${eventName}" is not registered.
      `);
    }

    let observers = this.observers[eventName];
    const observerIndex = observers.indexOf(observer);
    if (observerIndex > -1) observers.splice(observerIndex, 1);
  }

  protected notifyObservers(eventName: string, data?: TData) {
    const observers = this.observers[eventName];

    for (const observer of observers) {
      observer(new Event<ISubject, TData>(eventName, this.subject, data));
    }
  }

  emit(eventName: string, data?: TData) {
    if (!this.eventIsRegistered(eventName)) {
      throw new Error(`
        Failed to emit event.
        Event "${eventName}" is not registered.
      `);
    }

    this.notifyObservers(eventName, data);
  }
}

export default EventEmitter;
export type { AEventEmitter, TObserver };
