import {Resend} from "resend"



const resend = new Resend(process.env.RESEND_API_KEY);


export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
)=>{
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:'Two Factor Token',
        html:`<p>Your two factor token is: ${token}</p>`
    })
}

export const sendPasswordResetEmail = async (email:string , token:string)=>{
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from :"onboarding@resend.dev",
        to:email,
        subject:"Reset  Your Password",
        html: `<p>Click <a href="${resetLink}">Here</a></p>`
    })
}

export const sendVerificationEmail = async (email:string , token:string)=>{
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from :"onboarding@resend.dev",
        to:email,
        subject:"Confirm Your Email",
        html: `<p>Click <a href="${confirmLink}">Here</a></p>`
    })
}