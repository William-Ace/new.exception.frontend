import { BryntumCalendarProps } from '@bryntum/calendar-react';

const calendarConfig: BryntumCalendarProps = {
  date: new Date(2022, 2, 15),
  crudManager: {
    transport: {
      load: {
        url: '/data/data.json'
      }
    }
  }
};

export { calendarConfig };
