"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/products";

export const Banner = () => {
  const pathname = usePathname();
  const currentPage = pathname ? pathname.split("/")[1] : null; // Get the current page

  const currentCategory = categories.find(
    (category) => category.label === currentPage
  );

  return (
    <div className="relative border m-8 rounded-lg">
      <div className="flex items-center justify-evenly px-8 py-12 flex-col gap-5 lg:gap-2 lg:flex-row">
        <div className="space-y-2">
          {currentCategory ? (
            // If we're on a category page
            <div className="flex items-center gap-x-6">
              <h1 className="text-4xl text-center lg:text-left">
                {currentCategory.label}
              </h1>
              <currentCategory.icon size={50} className="text-indigo-700" />
            </div>
          ) : (
            // If we're on the home page
            <>
              <h1 className="text-4xl text-center lg:text-left">
                Jattflex Garmz
              </h1>
              <p className="text-lg text-center lg:text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Itaque, voluptas, nam dolorum quos.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
