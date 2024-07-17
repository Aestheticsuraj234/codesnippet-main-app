import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MainNav } from "./MainNav";

const Navbar = () => {
  return (
    <div
      className="md:border-b md:fixed top-0 
    md:z-50 w-full  shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur
"
    >
      <div className="md:flex hidden h-16 items-center justify-between  px-4">
        <Link
          href={"/"}
          className="flex flex-row items-center space-x-2 cursor-pointer"
        >
          <Image
            src={"/logo.svg"}
            width={160}
            height={160}
            alt={"LaunchFast"}
          />
        </Link>
        <MainNav className="mx-6" />
      </div>
    </div>
  );
};

export default Navbar;
