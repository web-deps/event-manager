import { describe, it, expect } from "vitest";
import EventEmitter from "./event-emitter";

describe("EventEmitter instantiation", () => {
  it("should create an EventEmitter", () => {
    const eventEmitter = new EventEmitter({}, ["click", "focus"]);

    expect(eventEmitter.subject).toEqual({});
    expect(eventEmitter.observers).toEqual({ click: [], focus: [] });
    expect(eventEmitter.events).toEqual(["click", "focus"]);
  });
});

describe("EventEmitter event observation", () => {
  it("should add an event observer", () => {
    let eventEmitted = false;
    const eventEmitter = new EventEmitter({}, ["click", "focus"]);

    eventEmitter.addObserver("click", () => {
      eventEmitted = true;
    });

    eventEmitter.emit("click");
    expect(eventEmitted).toBe(true);
  });

  it("should remove an event observer", () => {
    let eventEmitted = false;
    const eventEmitter = new EventEmitter({}, ["click", "focus"]);

    const eventObserver = () => {
      eventEmitted = true;
    };

    eventEmitter.addObserver("click", eventObserver);
    eventEmitter.emit("click");
    expect(eventEmitted).toBe(true);
    eventEmitter.removeObserver("click", eventObserver);
    eventEmitted = false;
    eventEmitter.emit("click");
    expect(eventEmitted).toBe(false);
  });
});
