interface IEvent<ISubject, TData> {
  readonly name: String;
  readonly subject: ISubject;
  data?: TData;
}

class Event<ISubject, TData> implements IEvent<ISubject, TData> {
  public readonly name: string;
  public readonly subject: ISubject;
  public data?: TData;

  constructor(name: string, subject: ISubject, data?: TData) {
    this.name = name;
    this.subject = subject;
    if (data) this.data = data;
  }
}

export default Event;
export type { IEvent };
