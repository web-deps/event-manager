import { describe, it, expect } from 'vitest';
import Event from '../event/event';

describe('Event instantiation', () => {
  it('should create an Event without data', () => {
    const event = new Event('event', {});

    expect(event).toEqual({ name: 'event', subject: {} });
  });

  it('should create an Event with data', () => {
    const event = new Event('event', {}, 3);

    expect(event).toEqual({ name: 'event', subject: {}, data: 3 });
  });
});
