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
  const { orderCreationId, razorpayPaymentId, razorpaySignature, userId, plan , referalCode } =
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
    const result = await db.$transaction(async (prisma) => {
      // Update user role
      await prisma.user.update({
        where: { id: userId },
        data: { 
          role: 'PREMIUM_USER',
        },
      });

     
      // Create new subscription
    const subscription =   await prisma.subscription.create({
        data: {
          userId: userId,
          plan: plan,
          status: 'ACTIVE',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
      });
      if(referalCode){
        const ambassador = await prisma.campusAmbassador.findUnique({
          where: {
            referralCode: referalCode
          }
        });

        if(ambassador){
          await prisma.referral.create({
            data:{
              referredUserId: userId,
              ambassadorId: ambassador.id,
              subscriptionId:subscription.id
            }
          })

           // Update the ambassador's points instead of resetting it
          await prisma.campusAmbassador.update({
            where: { id: ambassador.id },
            data: {
              points: {
                increment: 50,
              }
            },
          }); 

          await prisma.pointTransaction.create({
            data:{
              ambassadorId: ambassador.id,
              points: 50,
              reason:"Subscription by referred user",
              transactionType:"EARN",
              status:"COMPLETED",
              createdAt: new Date(),
            }
          })
        }
      }

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
