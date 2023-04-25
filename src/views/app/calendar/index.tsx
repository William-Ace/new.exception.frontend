import { Fragment, FC, useRef, useEffect } from 'react';
import { BryntumCalendar } from '@bryntum/calendar-react';
import { Calendar } from '@bryntum/calendar';
import { calendarConfig } from './config';
import './style.scss';

const ExceptionCalendar: FC = () => {
  const calendarRef = useRef<BryntumCalendar>(null);
  const calendarInstance = () => calendarRef.current?.instance as Calendar;

  useEffect(() => {
    calendarInstance().crudManager.load();
  });

  return (
    <Fragment>
      <BryntumCalendar ref={calendarRef} {...calendarConfig} />
    </Fragment>
  );
};

export default ExceptionCalendar;
