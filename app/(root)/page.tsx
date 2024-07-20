
// import { get_all_content } from "@/action/content";
import SubFeature from "@/components/Home/SubFeature";
import { ContentCard } from "./_components/content-card";
import { db } from "@/lib/db/db";
import Instructor from "@/components/Home/Instructor";
import FAQ from "@/components/Home/FAQ";

const Home=async()=>{

  const content = await db.content.findMany({
    where: {
        status: 'PUBLISHED'
    }
});

 

    return (
      <main className="mx-10 mt-20 mb-10 flex h-full flex-col justify-start items-center ">
        <h1 className="md:text-4xl text-2xl font-bold  text-zinc-700 dark:text-zinc-100 text-center">Welcome to <span className="text-yellow-500 dark:text-yellow-400 pr-4">Sigma-Coders:</span>Your Complete Learning Platform!</h1>
        <p className="text-base text-zinc-600 dark-text-zinc-500 text-center mt-4 font-semibold">
        Explore DSA, Master CS Concepts, Design Systems, Build Projects, and Participate in Workshops to Sharpen Your Skills and Ace Interviews with Confidence.
        </p>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10 mx-10 ">
        {content?.map((content, index) => (
          <ContentCard
            key={index}
            Logo={content.image}
            Title={content.title}
            Description={content.description}
            href={`/dashboard/${content.type.toLocaleLowerCase().replace(/ /g, "-")}`}
          />
        ))}
        </div>

        <SubFeature />
        <Instructor/>

        <FAQ/>

      </main>
    );
  }
  

export default Home;