import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const Instructor = () => {
  const ListData = [
    {
      id: 1,
      title: "5+ years of experience in Software Development",
    },
    {
      id: 2,
      title: "Previously Teaching Assistant at codes.learning",
    },
    {
      id: 3,
      title: "Currently working as a Teaching Assistant at codewith_random",
    },
    {
      id: 4,
      title: "Founder of SigmaCoders",
    },
    {
      id: 5,
      title: "Mentored 1000+ students in the field of Software Development",
    },
  ];

  return (
    <div className="mt-10 space-y-5">
      <p className="text-yellow-500 font-bold text-base text-center">
        INSTRUCTOR
      </p>
      <h1 className="md:text-4xl text-2xl font-bold text-zinc-700 dark:text-zinc-100 text-center">
        Meet Our Instructors
      </h1>

      <div className="flex flex-col md:flex-row h-auto md:h-[30rem] w-full md:w-[60rem] border px-4 py-4 rounded-md space-y-5 md:space-y-0 md:space-x-5 mx-auto">
        <div className="flex-shrink-0 h-full w-full md:w-[40%] border overflow-hidden rounded-md">
          <Image
            src={"/instructor.jpeg"}
            className="object-cover h-full w-full"
            height={500}
            width={500}
            alt="Instructor"
          />
        </div>
        <div className="h-full w-full md:w-[60%] border px-4 py-4 flex flex-col items-start justify-start space-y-4 rounded-md">
          <div className="flex flex-row items-center justify-start space-x-3">
            <Image
              src={"https://avatars.githubusercontent.com/u/107530887?v=4"}
              alt="Suraj Kumar Jha"
              height={62}
              width={62}
              className="rounded-full"
            />
            <div className="flex flex-col justify-center items-start">
              <p className="text-lg font-bold text-zinc-700 dark:text-zinc-100">
                Suraj Kumar Jha
              </p>
              <p className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                SWE | Mentor | Founder SigmaCoders
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-3">
            {ListData.map((item, index) => (
              <li
                key={item.id}
                className="flex flex-row items-center space-x-2"
              >
                <span className="text-lg font-bold text-zinc-700 dark:text-zinc-100">
                  {index + 1}:
                </span>
                <span className="text-md font-medium text-zinc-600 dark:text-zinc-400">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-row items-center justify-center gap-5 px-5 py-5">
            <Link href={"#"} passHref className="px-2 py-2 rounded-full border hover:bg-yellow-400 dark:hover:bg-yellow-500">
            <FaInstagram size={28} />
            </Link>

            <Link href={"#"} passHref className="px-2 py-2 rounded-full border hover:bg-yellow-400 dark:hover:bg-yellow-500">
            <FaGithub size={28} />
            </Link>

            <Link href={"#"} passHref className="px-2 py-2 rounded-full border hover:bg-yellow-400 dark:hover:bg-yellow-500">
            <FaLinkedin size={28} />
            </Link>

            <Link href={"#"} passHref className="px-2 py-2 rounded-full border hover:bg-yellow-400 dark:hover:bg-yellow-500">
            <FaTwitter size={28} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
