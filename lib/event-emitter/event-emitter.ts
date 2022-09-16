import Event from "../event/event";
import type { EventInterface } from "../event/event";

type ObserverType = <SubjectInterface, DataType>(
  event: EventInterface<SubjectInterface, DataType>
) => void;

interface ObserverCollectionInterface {
  [eventName: string]: Array<ObserverType>;
}

abstract class AbstractEventEmitter<SubjectInterface, DataType> {
  abstract readonly subject: SubjectInterface;
  abstract readonly events: Array<string>;
  protected abstract observers: ObserverCollectionInterface;
  abstract eventIsRegistered(eventName: string): boolean;
  abstract addObserver(eventName: string, observer: ObserverType): void;
  abstract removeObserver(eventName: string, observer: ObserverType): void;
  protected abstract notifyObservers(eventName: string, data?: DataType): void;
  abstract emit(eventName: string, data?: DataType): void;
}

class EventEmitter<SubjectInterface, DataType> extends AbstractEventEmitter<
  SubjectInterface,
  DataType
> {
  readonly subject: SubjectInterface;
  readonly events: Array<string>;
  protected observers: ObserverCollectionInterface = {};

  constructor(subject: SubjectInterface, events: Array<string>) {
    super();
    this.subject = subject;
    this.events = events;
    for (const event of events) this.observers[event] = [];
  }

  eventIsRegistered(eventName: string): boolean {
    return this.events.includes(eventName);
  }

  addObserver(eventName: string, observer: ObserverType) {
    if (!this.eventIsRegistered(eventName)) {
      throw new Error(`
        Failed to add observer.
        Event "${eventName}" is not registered.
      `);
    }

    let observers = this.observers[eventName];
    observers.push(observer);
  }

  removeObserver(eventName: string, observer: ObserverType) {
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

  protected notifyObservers(eventName: string, data?: DataType) {
    const observers = this.observers[eventName];

    for (const observer of observers) {
      observer(
        new Event<SubjectInterface, DataType>(eventName, this.subject, data)
      );
    }
  }

  emit(eventName: string, data?: DataType) {
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
export type { AbstractEventEmitter, ObserverType };
