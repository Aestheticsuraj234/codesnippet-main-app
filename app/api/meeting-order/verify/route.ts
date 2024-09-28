import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db/db'; // Ensure this points to your db client instance
import { PaymentStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error(
      'Razorpay key secret is not defined in environment variables.'
    );
  }
  const sig = crypto
    .createHmac('sha256', keySecret)
    .update(razorpayOrderId + '|' + razorpayPaymentId)
    .digest('hex');
  return sig;
};

export async function POST(request: NextRequest) {
  const { orderCreationId, razorpayPaymentId, razorpaySignature, userId,selectedDate , selectedTime  , availableSlotsId,meetingId} =
    await request.json();



  const signature = generatedSignature(orderCreationId, razorpayPaymentId);

  console.log({
    signature,
    razorpaySignature,
  });

  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { message: 'Payment verification failed', isOk: false },
      { status: 400 }
    );
  }

  // Payment is verified, 
  try {
    // Start a transaction
    const result = await db.$transaction(async (prisma) => {
      await db.availableSlot.update({
        where: {
          id: availableSlotsId,
        },
        data: {
          isBooked: true,
        },
      })

       await db.booking.create({
        data:{
          userId:userId,
          meetingId:meetingId,
          confirmationDate:selectedDate,
          slotId:availableSlotsId,
          paymentStatus:PaymentStatus.COMPLETED
        }
      });

      

    });


    revalidatePath("/dashboard/mentorship" , "page")
    return NextResponse.json(
      { message: 'Payment verified successfully and user role updated', isOk: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user or creating subscription:', error);
    return NextResponse.json(
      { message: 'Error updating user or creating subscription', isOk: false },
      { status: 500 }
    );
  }
}
