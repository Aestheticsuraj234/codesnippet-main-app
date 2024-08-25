import { GetTechnologyById } from "@/action/tutorial";
import { InitialModal } from "@/components/modal/initial-setup-technology";
import { ContentLayout } from "@/components/tutorial/content-layout";
import MainContentTab from "@/components/tutorial/main/MainContentTab";
import { currentUser } from "@/lib/auth/data/auth";
import { redirect } from "next/navigation";

const TutorialPage = async ({
  params,
}: {
  params: { technologyId: string };
}) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const technology = await GetTechnologyById(params.technologyId);

  if (!technology) {
    return redirect("/tutorial");
  }

  const isDayAssignedToTechnologyByCurrentUser = technology.isDayAssigned.some(
    (day) => day.isDayAssigned === true
  )

  if (!isDayAssignedToTechnologyByCurrentUser) {
    return (
      <InitialModal isDayAssigned={!isDayAssignedToTechnologyByCurrentUser} id={params.technologyId} />
    );
  }
  


  

  return (
  <ContentLayout>
    <MainContentTab
      technologyId={params.technologyId}
      technology={technology}
    />
  </ContentLayout>)
};

export default TutorialPage;
