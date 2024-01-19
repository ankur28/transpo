"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const router:any = useRouter()

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") setDarkMode(true);

    console.log("theme mounted", theme);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="flex items-center justify-between p-3 px-10 
    gap-10 shadow-sm border-b-[1px]"
    >
      <div className="flex items-center gap-10">
        <Image
          src={darkMode ? "/logo-dark.png" : "/logo.png"}
          alt=""
          width={120}
          height={80}
        />

        <div className=" hidden md:flex gap-6">
          <h2
            className="hover:bg-gray-100 hover:dark:bg-gray-700
           p-2 rounded-md cursor-pointer transition-all"
          onClick={() => router.push("/")}
          >
            Home
          </h2>
          <h2
            className="hover:bg-gray-100 hover:dark:bg-gray-700
           p-2 rounded-md cursor-pointer transition-all"
          >
            History
          </h2>
          <h2
            className="hover:bg-gray-100 hover:dark:bg-gray-700
           p-2 rounded-md cursor-pointer transition-all"
          >
            Help
          </h2>
        </div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default Navbar;
