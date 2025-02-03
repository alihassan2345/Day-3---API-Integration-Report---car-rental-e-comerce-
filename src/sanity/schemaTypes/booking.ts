export default {
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    {
      name: 'car',
      title: 'Car',
      type: 'reference',
      to: [{ type: 'car' }], // References the `car` document
    },
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Pending', 'Confirmed', 'Cancelled'], // Predefined status options
      },
    },
    {
      name: 'rentalDate',
      title: 'Rental Date',
      type: 'datetime',
    },
    {
      name: 'returnDate',
      title: 'Return Date',
      type: 'datetime',
    },
  ],
};