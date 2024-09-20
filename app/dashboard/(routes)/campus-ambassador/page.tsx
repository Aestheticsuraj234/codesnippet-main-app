import { Header } from "@/components/Global/header";
import MainSection from "./_components/main-section";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";



const CampusAmbassador = async() => {
  const user = await currentUser();

  const isAmbassador = await db.campusAmbassador.findFirst({
    where: {
      user: {
        id: user?.id!,
      },
    },
    select:{
      id: true,
    }
  })

  if(isAmbassador && user?.role === "PREMIUM_USER"){
    return redirect(`/campus-ambassador/${isAmbassador.id}`);
  }

  return (
    <main className="container flex flex-col h-full">
      <Header
        title="Campus Ambassador"
        description="Campus Ambassador is a great way to earn money and learn new skills. Find the right course for you and refer to your friends and start earning today."
      />
     <MainSection/>
    </main>
  );
};

export default CampusAmbassador;
