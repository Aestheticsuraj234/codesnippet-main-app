import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

// Update the Booking interface to match your fetched data
interface Booking {
  id: string;
  meeting: {
    title: string;
  };
  slot: {
    date: Date;
    time: Date;
  };
  paymentStatus: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  confirmationDate: Date | null;

}

interface BookingsTableProps {
  bookings: Booking[]; // Accept bookings as props
}

const getStatusColor = (status: Booking['paymentStatus']) => {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

export function BookingsTable({ bookings }: BookingsTableProps) {
  return (
    <Table>
      <TableCaption>A list of your recent bookings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Booking ID</TableHead>
          <TableHead>Meeting Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Confirmation Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{booking.id}</TableCell>
            <TableCell>{booking.meeting.title}</TableCell>
            <TableCell>{format(new Date(booking.slot.date), 'MMM d, yyyy')}</TableCell>
            <TableCell>{format(new Date(booking.slot.time), 'hh:mm a')}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(booking.paymentStatus)}>
                {booking.paymentStatus}
              </Badge>
            </TableCell>
            <TableCell>
              {booking.confirmationDate
                ? format(new Date(booking.confirmationDate), 'MMM d, yyyy')
                : 'PENDING'}
            </TableCell>
           
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
