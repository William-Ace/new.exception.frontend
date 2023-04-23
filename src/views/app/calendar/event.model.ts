import { EventModel, EventModelConfig } from '@bryntum/scheduler';

export type AppEventModelConfig = EventModelConfig & {
  desc: string;
  eventType: string;
};

export class AppEventModel extends EventModel {
  static get $name() {
    return 'AppEventModel';
  }

  static get fields() {
    return ['desc', 'eventType'];
  }

  public desc: string | undefined;
  public eventType: string | undefined;

  constructor(config: Partial<AppEventModelConfig>) {
    super(config);
  }
}
