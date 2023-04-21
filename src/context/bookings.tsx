import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import useApolloClient from '../graphql/apollo';
import { BookingsQuery } from '../graphql/queries/query';
import { IBooking } from '../types/calendar';

type BookingsProviderPropsType = {
  children: React.ReactNode;
};

type BookingsStateType = {
  bookings: IBooking[];
  getBookings: () => void;
};

export const BookingsContext = createContext<BookingsStateType | undefined>(undefined);

const BookingsProvider = ({ children }: BookingsProviderPropsType) => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const apolloClient = useApolloClient();

  const getBookings = useCallback(async () => {
    try {
      const result = await apolloClient.query({
        query: BookingsQuery,
        fetchPolicy: 'network-only'
      });
      setBookings(
        result.data.events.map((event: IBooking) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }))
      );
    } catch (error) {
      toast.error('Error occured!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }, [apolloClient]);

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        getBookings
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};

function useBookings() {
  const context = useContext(BookingsContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }

  return context;
}

export { BookingsProvider, useBookings };
