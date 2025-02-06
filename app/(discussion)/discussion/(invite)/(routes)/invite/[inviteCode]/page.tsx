import { currentUser } from '@/lib/auth/data/auth'
import { db } from '@/lib/db/db'
import { redirect } from 'next/navigation'



interface InviteCodePageProps {
    params: Promise<{
        inviteCode: string
    }>
}

const InviteCodePage = async (props:InviteCodePageProps) => {
    const params = await props.params;

    const user = await currentUser();

    if(!user){
        return redirect("/")
    }

    if(!params.inviteCode){
        return redirect("/tutorial")
    }

    const existingCommunity = await db.community.findFirst({
        where:{
            inviteCode: params.inviteCode,
            members:{
                some:{
                    userId: user.id
                }
            }
        },
       
    });

    if(existingCommunity){
        return redirect(`/discussion/community/${existingCommunity.id}`)
    }


    const community = await db.community.update({
        where:{
            inviteCode: params.inviteCode
        },
        data:{
            members:{
                create:[{
                    userId: user.id!
                }]
            }
        }
    })

    return redirect(`/discussion/community/${community.id}`)
}

export default InviteCodePage