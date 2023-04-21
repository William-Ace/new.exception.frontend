import gql from 'graphql-tag';

const NewBooking = gql`
  mutation new_booking($title: String!, $start: String!, $end: String!) {
    new_booking(bookingTitle: $title, startDate: $start, endDate: $end) {
      _id
    }
  }
`;

const UpdateBooking = gql`
  mutation update_booking($booking_id: String!, $start: String!, $end: String!, $title: String!) {
    update_booking(
      booking_id: $booking_id
      startDate: $start
      endDate: $end
      bookingTitle: $title
    ) {
      _id
    }
  }
`;

const DeleteBooking = gql`
  mutation delete_booking($booking_id: String!) {
    delete_booking(booking_id: $booking_id) {
      _id
    }
  }
`;

export { NewBooking, UpdateBooking, DeleteBooking };
