import gql from 'graphql-tag';

const BookingsQuery = gql`
  query {
    bookings {
      _id
      bookingTitle
      startDate
      endDate
    }
  }
`;

export { BookingsQuery };
