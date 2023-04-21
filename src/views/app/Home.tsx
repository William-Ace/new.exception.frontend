import { useEffect } from 'react';

import { Box } from '@mui/material';

import MainCalendar from '../../components/MainCalendar/MainCalendar';
import { useBookings } from '../../context/bookings';

export default function Home() {
  const { bookings, getBookings } = useBookings();

  useEffect(() => {
    console.log(bookings);
    getBookings();
  }, []);

  return (
    <>
      <MainCalendar bookings={bookings} />
    </>
  );
}
