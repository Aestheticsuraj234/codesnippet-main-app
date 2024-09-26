import { Briefcase, GraduationCap, Handshake, MessageCircle, Notebook, SchoolIcon, YoutubeIcon } from "lucide-react";
import React from "react";
import ExploreCard from "./ExploreCard";

const Explore = () => {

    const exploreData = [
        {
            icon:SchoolIcon,
            backgroundHex:"#FFA7A6",
            colorHex:"#CD201F",
            title:"Explore Live Courses",
            description:"Click Here to explore live courses which going to help you learning latest technology",
            href:"/dashboard/courses",
        },
        {
            icon:Briefcase,
            backgroundHex:"#C5F9AC",
            colorHex:"#76BD54",
            title:"Explore Workshops",
            description:"Click Here to explore Workshops Live and Recoded which going to help you learning latest technology",
            href:"/dashboard/workshops",
        },
        {
            icon:YoutubeIcon,
            backgroundHex:"#A8C7F9",
            colorHex:"#1664E4",
            title:"Explore tutorials",
            description:"Click Here to explore tutorials which going to help you learning latest technology",
            href:"/dashboard/tutorials",
        },
        {
            icon:MessageCircle,
            backgroundHex:"#F2F0A1",
            colorHex:"#918F14",
            title:"Get Community Support.",
            description:"We have seperate community where you can chat on the group and discuss about your problems",
            href:"/discussion",
        },
        {
          icon:GraduationCap,
          backgroundHex:"#96A8F6",
          colorHex:"#7137F7",
          title:"Become a Campus Ambassador",
          description:"Click Here to explore Campus Ambassador Program",
          href:"/dashboard/campus-ambassador",
        },
        {
          icon:Handshake,
          backgroundHex:"#FFA7A6",
          colorHex:"#CD201F",
          title:"1:1 Mentorship",
          description:"Click Here to explore 1:1 Mentorship Program",
          href:"/dashboard/mentorship",
        }
    ]

  return (
    <section
      id={"#explore"}
      className="flex px-4 mt-10 flex-col justify-center items-center"
    >
      <h1 className="text-4xl font-bold text-[#1A1818] dark:text-[#ffffff] text-center mb-5">
        Explore <span className="text-[#08BD80]">Products</span>
      </h1>

      <div className="grid  grid-cols-1   md:grid-cols-2  lg:grid-cols-3  gap-4  w-full  max-w-6xl  mx-auto  items-center  justify-center  px-4 py-4">
        {
            exploreData.map((data,index)=>(
                <ExploreCard
                key={index}
                Icon={data.icon}
                backgroundHex={data.backgroundHex}
                colorHex={data.colorHex}
                title={data.title}
                description={data.description}
                href={data.href}

                />
            ))
        }
      </div>
    </section>
  );
};

export default Explore;
