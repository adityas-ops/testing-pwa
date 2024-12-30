"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { links } from "@/app/page";
import { IoIosArrowBack } from "react-icons/io";

function Layout({ children, customClass }) {
  const router = useRouter();

  // extract route from url
  const pathname = usePathname();
  console.log("pathname", pathname);
  const singleLink = links.find((link) => link.href === pathname);

  console.log("singleLin", singleLink);

  return (
    <div className=" w-full h-screen overflow-hidden bg-neutral-800/10">
      {/* header */}
      <div className="w-full h-[60px] bg-rose-900  px-[20px] flex justify-between items-center">
        <button
          onClick={() => router.push("/")}
          className=" fixed top-[15px] cursor-pointer flex items-center text-xl text-white font-semibold hover:scale-[1.05] duration-500"
        >
        <IoIosArrowBack />
          Back
        </button>
        <div className=" flex  justify-center   pl-[100px] items-center gap-x-[10px] w-full ">
          {singleLink ? (
            <div className="text-white text-lg font-semibold">
              {singleLink.title}
            </div>
          ) : null}
        </div>
      </div>
      <div
        className={`${customClass} w-full h-full pb-[50px] overflow-y-scroll`}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
