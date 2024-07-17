import {v4 as uuidv4} from 'uuid';
import { getVerificationTokenByEmail } from "@/lib/auth/tokens/verification-token";
import { getPasswordResetTokenByEmail } from '@/lib/auth/tokens/password-reset-token';
import { getTwoFactorTokenByEmail } from '@/lib/auth/tokens/two-factor-token';

import { db } from '../../db/db';
import crypto from 'crypto';


export const generateTwoFactorToken = async (email:string)=>{
    const token = crypto.randomInt(100_000 , 1_000_000).toString();
    // in an hours
    const expires =  new Date( new Date().getTime() + 5 * 60 * 1000 );

    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken)
        {
            await db.twoFactorToken.delete({
                where:{
                    id:existingToken.id
                }
            });
        }

        const twoFactorToken = await db.twoFactorToken.create({
            data:{
                email,
                token,
                expires
            }
        });

        return twoFactorToken;
}


export const generatePasswordResetToken = async (email:string)=>{
    const token = uuidv4();
    // expire token in 1 hour
    const expires = new Date( Date.now() + 1000 * 60 * 60 );

    const existingToken = await getPasswordResetTokenByEmail(email);

    if(existingToken)
        {
            await db.passwordResetToken.delete({
                where:{
                    id:existingToken.id
                }
            });
        }

        const passwordResetToken = await db.passwordResetToken.create({
            data:{
                email,
                token,
                expires
            }
        });

        return passwordResetToken;


}

export const generateVerificationToken = async (email:string)=>{
    const token = uuidv4();
    // expire token in 1 hour
    const expires = new Date( Date.now() + 1000 * 60 * 60 );

    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken)
        {
            await db.verificationToken.delete({
                where:{
                    id:existingToken.id
                }
            });
        }

        const verificationToken = await db.verificationToken.create({
            data:{
                email,
                token,
                expires
            }
        });

        return verificationToken;

}