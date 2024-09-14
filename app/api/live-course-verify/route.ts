import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db/db'; // Ensure this points to your db client instance

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
  const { orderCreationId, razorpayPaymentId, razorpaySignature, userId, courseId } =
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

  // Payment is verified, update user role and create subscription
  try {
    // Start a transaction
await db.$transaction(async (prisma) => {
    await prisma.coursePurchase.create({
        data:{
            userId:userId,
            courseId:courseId,
            isPurchase:true
        }
    })
    });

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
