
// import { get_all_content } from "@/action/content";
import SubFeature from "@/components/Home/SubFeature";
import Instructor from "@/components/Home/Instructor";
import FAQ from "@/components/Home/FAQ";
import HomeComponent from "@/components/Home/HomeComponent";
import HowItWorks from "@/components/Home/HowItWorks";
import Explore from "@/components/Home/Explore";

const Home=()=>{



    return (
      <main className="mx-10 mt-20 mb-10 flex h-full flex-col justify-start items-center ">
        <HomeComponent/>
        <HowItWorks/>
        <Explore/>
        <SubFeature />
        <Instructor/>
        <FAQ/>
      </main>
    );
  }
  

export default Home;