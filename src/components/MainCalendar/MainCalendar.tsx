import React, { useCallback } from 'react';
import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { toast } from 'react-toastify';

import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';

import { useBookings } from '../../context/bookings';
import { useModal } from '../../context/modal';
import useApolloClient from '../../graphql/apollo';
import { UpdateBooking } from '../../graphql/mutations/mutation';

const locales = {
  'en-US': enUS
};

interface BigCalendarProps {
  bookings: any;
}

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const MainCalendar: React.FC<BigCalendarProps> = ({ bookings }) => {
  const { showModal } = useModal();
  const apolloClient = useApolloClient();
  const { getBookings } = useBookings();

  const handleNewEvent = useCallback(
    (slotInfo: SlotInfo) => {
      showModal({ isNew: true, start: slotInfo.start, end: slotInfo.end });
    },
    [showModal]
  );

  const handleUpdateEvent = useCallback(
    async ({ event, start, end }) => {
      try {
        await apolloClient.mutate({
          mutation: UpdateBooking,
          variables: {
            booking_id: event._id,
            start: start,
            end: end,
            title: event.title
          }
        });
        getBookings();
        toast.success('Event updated!', {
          position: toast.POSITION.TOP_RIGHT
        });
      } catch (error) {
        toast.error('Error occured!', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    },
    [apolloClient, getBookings]
  );

  const handleSelectEvent = useCallback(
    (event) => {
      showModal({ isNew: false, ...event });
    },
    [showModal]
  );

  return (
    <DnDCalendar
      localizer={localizer}
      events={bookings}
      style={{ height: '100vh' }}
      onSelectSlot={handleNewEvent}
      onEventDrop={handleUpdateEvent}
      onEventResize={handleUpdateEvent}
      onSelectEvent={handleSelectEvent}
      selectable
    />
  );
};

export default MainCalendar;
