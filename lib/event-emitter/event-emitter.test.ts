import { describe, it, expect } from 'vitest';
import EventEmitter from './event-emitter';

describe('EventEmitter instantiation', () => {
  it('should create an EventEmitter', () => {
    const eventEmitter = new EventEmitter({}, ['click', 'focus']);

    expect(eventEmitter.subject).toEqual({});
    expect(eventEmitter.observers).toEqual({ click: [], focus: [] });
    expect(eventEmitter.events).toEqual(['click', 'focus']);
  });
});
