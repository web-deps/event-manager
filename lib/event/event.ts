interface EventInterface<SubjectInterface, DataType> {
  readonly name: String;
  readonly subject: SubjectInterface;
  data?: DataType;
}

class Event<SubjectInterface, DataType>
  implements EventInterface<SubjectInterface, DataType>
{
  public readonly name: string;
  public readonly subject: SubjectInterface;
  public data?: DataType;

  constructor(name: string, subject: SubjectInterface, data?: DataType) {
    this.name = name;
    this.subject = subject;
    if (data) this.data = data;
  }
}

export default Event;
export type { EventInterface };
