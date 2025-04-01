import { db } from '@/lib/db/db';
import React from 'react'
import ProfileUpdateForm from './_components/profile-update-form';

const ProfileEditPage = async({params}:{params:Promise<{userId:string}>}) => {

    const {userId} = await params;

    const profileDataById = await db.user.findUnique({
        where:{
            id:userId
        },
        select:{
            id:true,
            name:true,
            email:true,
            image:true,
            campusAmbassador:{
                select:{
                    campusName:true,
                    fullName:true,
                    mobileNumber:true,
                    id:true,
                    upiId:true,

                }
            }
        }
    })

    console.log(profileDataById);

  return (
    <div className='flex items-center justify-center mt-10'>
        {/* @ts-ignore */}
        <ProfileUpdateForm data={profileDataById} />
    </div>
  )
}

export default ProfileEditPage