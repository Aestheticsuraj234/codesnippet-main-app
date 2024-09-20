"use server";
import { UpdateAmbassadorSchema } from "@/app/campus-ambassador/[id]/settings/_components/settings-form";
import { campusAmbassadorSchema } from "@/components/modal/ambassdor-modal";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

import { z } from "zod";



export const createCampusAmbassador = async (
  data: z.infer<typeof campusAmbassadorSchema>
) => {
  const user = await currentUser();
  const { campusName, fullName, mobileNumber, termsAndConditions, upiId } =
    data;

  if (!user) {
    throw new Error("User not found.");
  }


  const existingAmbassdor = await db.campusAmbassador.findFirst({
    where: {
      user: {
        id: user.id!,
      },
    },
  });


  if(existingAmbassdor){
    throw new Error("Campus ambassador already exists.");
  }

  const ambassdor = await db.campusAmbassador.create({
    data: {
      campusName,
      fullName,
      mobileNumber,
      referralCode: uuidv4(),
      upiId,
      termsAccepted: termsAndConditions,
      user: {
        connect: {
          id: user?.id!,
        },
      },
    },
  });

  return ambassdor;
};


export const getCampusAmbassadorRefferalsById = async (id:string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const ambassdor = await db.campusAmbassador.findUnique({
    where:{
      id:id
    },
    select:{
      fullName:true, 
      referralCode:true,
      points:true,
      _count:{
        select:{
          referrals:true
        }
      }

    }
  })

  revalidatePath("/campus-ambassador");
  return ambassdor;


}


export const getCampusAmbassadorByUniqueCode = async (referralCode:string) => {
  const ambassdor = await db.campusAmbassador.findUnique({
    where:{
      referralCode:referralCode
    },
  })

  revalidatePath("/campus-ambassador");
  return ambassdor;
}

export const create_referral = async (ambassadorId:string, referredUserId:string) => {
  const referral = await db.referral.create({
    data:{
      ambassadorId,
      referredUserId
    }
  })

  return referral;
}

export const askRedeem = async (ambassadorId:string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const ambassador = await db.campusAmbassador.findUnique({
    where:{
      id:ambassadorId
    },
    select:{
      points:true,
      id:true
    }
  })

  if(!ambassador){
    throw new Error("Ambassdor not found.");
  }

  if(ambassador.points < 250){
    throw new Error("Insufficient points to redeem.");
  }

  await db.pointTransaction.create({
    data:{
      ambassadorId: ambassador.id,
      points: -250,
      reason:"Redeem request initiated",
      transactionType:"REDEEM",
      status:"PENDING",
      createdAt: new Date(),
    }
  })

  // also update ambassador points
  await db.campusAmbassador.update({
    where: { id: ambassador.id },
    data: {
      points: {
        decrement: 250,
      }
    },
  });

  revalidatePath(`/campus-ambassador/${ambassador.id}/points` , "page");

  return ambassador;

 
}


export const updateAmbassador = async (ambassadorId:string ,values: z.infer<typeof UpdateAmbassadorSchema>)=>{
  const user = await currentUser();

  const {campusName , fullName , mobileNumber  , upiId} = values;

  if (!user) {
    throw new Error("User not found.");
  }

  const ambassador = await db.campusAmbassador.findUnique({
    where: {
     id:ambassadorId
    },
  });

  if (!ambassador) {
    throw new Error("Ambassador not found.");
  }

  const updatedAmbassador = await db.campusAmbassador.update({
    where: {
      id: ambassador.id,
    },
    data: {
      campusName,
      fullName,
      mobileNumber,
      upiId
    },
  });

  return updatedAmbassador;
}