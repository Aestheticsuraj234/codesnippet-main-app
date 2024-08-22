import TutorialLayout from "@/components/tutorial/tutorial-layout";
import { db } from "@/lib/db/db";
import { redirect, RedirectType } from "next/navigation";


export default async function TutorialMainLayout({
  children,
  params,
}: {
  children: React.ReactNode,
    params: {technologyId: string}
}) {

  const technologyData = await db.technology.findUnique({
    where:{id:params.technologyId},
  })

if(!technologyData){
  redirect("/dashboard", RedirectType.push)
  
}


  return (
    <TutorialLayout>
      {children}
    </TutorialLayout>
  );
}
