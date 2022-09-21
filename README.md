# event-manager

A JavaScript library for managing events. It can be used for front-end and back-end applications.

## Installation

### NPM

```bash
npm install event-manager
```

### Yarn

```bash
yarn add event-manager
```

## Usage

### Creating an Event Emitter

```js
import { EventEmitter } from "event-manager";

// Subject for events
let form = {
  send: () => {
    console.log("Sending form");
  },
  clear: () => {
    console.log("Clearing form");
  },
  alert: (alertType) => {
    console.log(`Alerting user about ${alertType}.`);
  }
};

const events = ["submit", "success", "failure"];
const formEventManager = new EventEmitter(form, events);
```

### Adding an Observer

```js
//  Import EventEmitter and create an event emitter instance 'formEventManager'

formEventManager.addObserver("submit", ({ name, subject }) => {
  subject.send();
});
```

### Emitting an Event

```js
import { EventEmitter, Event } from "event-manager";

// Create an event emitter and add an observer

formEventManager.emit(new Event("submit"));

// Output: 'Sending form'
```

## API

### Event

A class used to create events.

#### Constructor

##### Signature

```js
constructor(name, subject [, data]);
```

##### Params

- `name`:
  - Type: `string`
  - Description: The name of the event.
- `subject`:
  - Type: `object`
  - Description: The subject of observation.
- `data`: (optional)
  - Type: `any`
  - Description: The data associated with an event.

#### Properties

- `name`:
  - Type: `string`
  - Description: The name of the event.
- `subject`:
  - Type: `object`
  - Description: The subject of observation.
- `data`: (optional)
  - Type: `any`
  - Description: The data associated with an event.

### EventEmitter

A class used to manage events.

#### Constructor

##### Signature

```js
constructor(subject, events);
```

##### Params

- `subject`:
  - Type: `object`
  - Description: The subject of observation.
- `events`:
  - Type: `array` of `string`s
  - Description: The events to be emitted and observed.

#### Properties

- `subject`: (readonly)
  - Type: `object`
  - Description: The subject of observation.
- `events`: (readonly)
  - Type: `array` of `string`s
  - Description: The events to be emitted and observed.
- `observers`: (readonly)
  - Type: `object` of `function`s
  - Description: The observers of events.

#### Methods

- `addObserver`:
  - Description: Adds an observer for a particular event.
  - Signature: `addObserver(eventName, observer)`
  - Params:
    - `eventName`:
      - Type: `string`
      - Description: The name of the event to be observed.
    - `observer`:
      - Type: `function`
      - Signature: `observer(event)`
      - Params:
        - `event`:
          - Type: `Event`
          - Description: The event emitted.
- `removeObserver`:
  - Description: Removes an observer for a particular event.
  - Signature: `removeObserver(eventName, observer)`
  - Params:
    - `eventName`:
      - Type: `string`
      - Description: The name of the event observed.
    - `observer`:
      - Type: `function`
      - Signature: `observer(event)`
      - Params:
        - `event`:
          - Type: `Event`
          - Description: The event emitted.
- `notifyObservers`: (protected)
  - Description: Notifies observers of a particular event when the event has been fired.
  - Signature: `notifyObservers(eventName [, data])`
  - Params:
    - `eventName`:
      - Type: `string`
      - Description: The name of the event emitted.
    - `data`: (optional)
      - Type: `any`
      - Description: Data associated with the event.
- `emit`:
  - Description: Emits an event.
  - Signature: `emit(eventName [, data])`
  - Params:
    - `eventName`:
      - Type: `string`
      - Description: The name of the event to emit.
    - `data`: (optional)
      - Type: `any`
      - Description: Data associated with the event.
- `eventIsRegistered`:
  - Description: Checks whether a particular event is registered or not.
  - Signature: `eventIsRegistered(eventName)`
  - Params:
    - `eventName`:
      - Type: `string`
      - Description: The name of the event to be checked.

## License

MIT License.
