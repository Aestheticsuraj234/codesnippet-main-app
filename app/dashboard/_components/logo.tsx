"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

export const Logo = () => {
  const { theme } = useTheme();
  const [imagePath, setImagePath] = useState("/code-snippet2ss.svg");

  useEffect(() => {
    if (theme === "dark") {
      setImagePath("/code-snippet-dark2.svg");
    } else {
      setImagePath("/code-snippet2.svg");
    }
  }, [theme]);
  return (
    <Link href="/" className="flex items-center gap-2 mt-2">
      <Image
        src={imagePath}
        alt="logo"
        width={240}
        height={240}
        className="flex-shrink-0"
      />
    </Link>
  );
};


