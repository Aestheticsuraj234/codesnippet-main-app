import React from "react";

import { AiFillGithub, AiFillMail } from "react-icons/ai";

import { BiLogoReact } from "react-icons/bi";

import { SiAppwrite } from "react-icons/si";

import { Bot, BookCopy, Workflow, User, Database, Search, Paintbrush } from "lucide-react";
import { MdAlternateEmail, MdEmail } from "react-icons/md";
import { BsStripe } from "react-icons/bs";
import { time } from "console";

const SubFeature = () => {
  // Feature Items you can change the title, description, icon, and time saved
  const FeatureItems = [
    {
      id: 1,
      title: "Superfast Next.js Powered Platform",
      description:
        "LaunchFast  are powered by Next.js, and are served via Vercel's word class CDN.",
      icon: <BiLogoReact size={35} className="text-cyan-600" />,
      timeSaved: "",
    },
    {
      id: 2,
      title: "Emails",
      description: `Send transactional emails
            DNS setup to avoid spam folder (DKIM, DMARC, SPF in subdomain)
            Webhook to receive & forward emails`,
      icon: <MdAlternateEmail size={35} className="text-yellow-500" />,
      timeSaved: "4 hour",
    },
    {
      id: 3,
      title: "Payments",
      description: `Create checkout sessions
        Handle webhooks to update user's account (subscriptions, one-time payments...)
        Tips to setup your account & reduce chargebacks`,
      icon: <BsStripe size={35} className="text-indigo-400" />,
      timeSaved: "2 hour",
    },
    {
      id: 4,
      title: "User Authentication",
      description: `Magic links setup
            Login with Google walkthrough
            Save user in MongoDB/Supabase
            Private/protected pages & API calls`,
      icon: <User size={35} className="text-red-500" />,
      timeSaved: "6 hour",
    },
    {
      id: 5,
      title: "Database",
      description: `Mongoose schema | Postgres tables
        Mongoose plugins to make your life easier.`,
      icon: <Database size={35} className={"text-green-500"} />,
      timeSaved: "4 hour",
    },
    {
      id: 6,
      title: "SEO Friendly",
      description: `All meta tags to rank on Google
        OpenGraph tags to share on social media
        Automated sitemap generation to fasten Google indexing
        Structured data markup for Rich Snippets
        SEO-optimized UI components
        `,
      icon: <Search size={35} className="text-pink-500" />,
      timeSaved: "3 hour",
    },
    {
      id: 7,
      title: "Style",
      description:
        `Components, animations & sections (like this features section)
        TailwindCSS setup
        Shadcn ui components
        Dark mode`,
      icon: <Paintbrush size={35} className="text-orange-500" />,
      timeSaved: "10 hour",
    },
    {
        id: 8,
        title: "Workflow",
        description: `Git setup
            Continuous Deployment
            Automated tests
            Automated code formatting
            Automated code linting
            Automated code review`,
        icon: <Workflow size={35} className="text-blue-500" />,
        timeSaved: "1 hour",
        },
        {
        id: 9,
        title: "Documentation",
        description: `Step-by-step guides
            Code snippets
            Video tutorials
            1-1 support`,
        icon: <BookCopy size={35} className="text-blue-500" />,
        timeSaved:"∞"
        },
        {
        id: 10,
        title: "Community",
        description: `Private Discord server
            Weekly live coding sessions
            Monthly Q&A sessions
            1-1 support`,
        icon: <Bot size={35} className="text-blue-500" />,
        timeSaved: ""
    }
  ];

  return (
    <section className="glassmorphism flex w-[100%]  flex-col p-4 mt-12 rounded-lg max-w-full ">
      <h4 className="items-center justify-center uppercase flex text-center font-bold text-md  text-zinc-200 ">
        MAKE YOUR LIFE EASY!
      </h4>
      <h1 className="items-center justify-center flex text-center mt-9 font-extrabold md:text-4xl text-3xl  text-[#03DC7A] ">
        Features that make LaunchFast{" "}
      </h1>
      <h1 className="items-center justify-center flex text-center font-bold md:text-4xl text-3xl  text-yellow-500">
        10x better
      </h1>

      <div className="grid md:grid-cols-2 gird-cols-1 gap-4 mt-12">
        {/* Card 1 */}
        {FeatureItems.map((item) => (
          <div key={item.id} className="p-4 rounded-lg ">
            <h3 className="text-xl font-bold flex flex-row justify-start text-zinc-100  items-center dark:bg-clip-text dark:text-transparent md:text-left gap-3">
              {item.icon}
              {item.title}
            </h3>
            <p className="max-w-2xl mb-6 font-light text-gray-300 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              {item.description}
            </p>
            <p className="text-green-600 font-bold text-2xl ">
              {item.timeSaved === "" ? "" : "Time saved: " + item.timeSaved}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubFeature;
