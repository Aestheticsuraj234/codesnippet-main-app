import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { db } from '@/lib/db/db'; // Assuming you're using Prisma or a similar ORM

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  const { ambassadorId } = await request.json();

  // Fetch the user and verify points
  const user = await db.campusAmbassador.findUnique({
    where: { id: ambassadorId },
    select: { points: true, upiId: true },
  });

  if (!user || user.points < 250) {
    return NextResponse.json({ message: "Insufficient points to redeem" }, { status: 400 });
  }

  const amount = 20000; // ₹200 in paise (smallest currency unit)
  const currency = "INR";

  // Create an order in Razorpay
  const orderOptions = {
    amount: amount, // Amount in paise
    currency: currency,
    receipt: `redeem_${ambassadorId}`,
    payment_capture: 1, // Auto-capture the payment
  };

  try {
    const order = await razorpay.orders.create(orderOptions);

    return NextResponse.json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      upiId: user.upiId, // Send back the user's UPI ID for frontend payment
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ message: "Error creating payment order" }, { status: 500 });
  }
}
