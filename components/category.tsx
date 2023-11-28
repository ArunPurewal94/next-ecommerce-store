"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface CategoryProps {
  label: string;
  icon: React.ReactElement; // Add this line
}

export const Category: React.FC<CategoryProps> = ({ label, icon }) => {
  const pathname = usePathname();
  const category = pathname ? pathname.split("/")[1] : "";

  if (pathname?.startsWith("/admin")) return null;

  return (
    <Link href={`/${label}`}>
      <span
        className={`flex flex-col md:flex-row gap-2 items-center justify-between p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
        ${
          label === category
            ? "border-b-slate-800 text-slate-800 font-semibold"
            : "border-transparent text-slate-500"
        }`}
      >
        {icon} {/* Render the icon */}
        <span className="font-medium text-sm">{label}</span>
      </span>
    </Link>
  );
};
