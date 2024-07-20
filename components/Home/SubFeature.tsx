import React from "react";

import { BiCodeAlt } from 'react-icons/bi';
import { MdOutlineSchool, MdOutlineDesignServices, MdOutlineShop } from 'react-icons/md';
import { BsGearFill } from 'react-icons/bs';
import { FaProjectDiagram } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';

const SubFeature = () => {
  // Feature Items you can change the title, description, icon, and time saved
  const FeatureItems = [
    {
      id: 1,
      title: "Comprehensive DSA Learning",
      description:
        "Master Data Structures and Algorithms with curated problems and detailed explanations, from basic to advanced levels.",
      icon: <BiCodeAlt size={35} className="text-cyan-600" />,
      timeSaved: "",
    },
    {
      id: 2,
      title: "In-Depth CS Concepts",
      description: `Learn core computer science subjects such as Operating Systems, Databases, Networking, and more, with well-structured content.`,
      icon: <MdOutlineSchool size={35} className="text-yellow-500" />,
      timeSaved: "20 hours",
    },
    {
      id: 3,
      title: "System Design Mastery",
      description: `Gain expertise in designing scalable and efficient systems with real-world case studies and hands-on projects.`,
      icon: <MdOutlineDesignServices size={35} className="text-indigo-400" />,
      timeSaved: "15 hours",
    },
    {
      id: 4,
      title: "Real-World Projects",
      description: `Build and showcase practical projects across various domains to enhance your portfolio and demonstrate your skills.`,
      icon: <FaProjectDiagram size={35} className="text-red-500" />,
      timeSaved: "30 hours",
    },
    {
      id: 5,
      title: "Interactive Workshops",
      description: `Participate in live workshops led by industry experts, covering a wide range of topics and providing hands-on experience.`,
      icon: <MdOutlineShop size={35} className={"text-green-500"} />,
      timeSaved: "10 hours",
    },
    {
      id: 6,
      title: "Seamless Integration",
      description: `Integrate various tools and services effortlessly to enhance your learning experience and streamline your workflow.`,
      icon: <BsGearFill size={35} className="text-pink-500" />,
      timeSaved: "5 hours",
    },
    {
      id: 7,
      title: "Community Support",
      description: `Join a thriving community of learners and professionals, engage in discussions, and get support from peers and mentors.`,
      icon: <IoIosPeople size={35} className="text-orange-500" />,
      timeSaved: "",
    },
    {
      id: 8,
      title: "Workflows & Best Practices",
      description: `Learn industry-standard workflows, continuous integration and deployment practices, automated testing, and more.`,
      icon: <BsGearFill size={35} className="text-blue-500" />,
      timeSaved: "10 hours",
    },
    {
      id: 9,
      title: "Comprehensive Documentation",
      description: `Access step-by-step guides, code snippets, video tutorials, and 1-on-1 support to help you navigate through the platform.`,
      icon: <BsGearFill size={35} className="text-blue-500" />,
      timeSaved:"∞",
    },
    {
      id: 10,
      title: "Regular Updates & New Content",
      description: `Stay ahead with regular updates, new content, and the latest industry trends to keep your skills relevant and up-to-date.`,
      icon: <BsGearFill size={35} className="text-blue-500" />,
      timeSaved: "",
    }
  ];

  return (
    <section className="glassmorphism flex w-[100%]  flex-col p-4 mt-12 rounded-lg max-w-full ">
      <h4 className="items-center justify-center uppercase flex text-center font-bold text-md  dark:text-zinc-200 text-zinc-700 ">
        MAKE YOUR LIFE EASY!
      </h4>
      <h1 className="items-center justify-center flex text-center mt-9 font-extrabold md:text-4xl text-3xl  text-[#f1c840] ">
        Why Choose us?{" "}
      </h1>
     

      <div className="grid md:grid-cols-2 gird-cols-1 gap-4 mt-12">
        {/* Card 1 */}
        {FeatureItems.map((item) => (
          <div key={item.id} className="p-4 rounded-lg ">
            <h3 className="text-xl font-bold flex flex-row justify-start dark:text-zinc-100 text-zinc-700  items-center dark:bg-clip-text dark:text-transparent md:text-left gap-3">
              {item.icon}
              {item.title}
            </h3>
            <p className="max-w-2xl mb-6 font-light  text-zinc-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              {item.description}
            </p>
           
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubFeature;
