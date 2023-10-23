"use client";

import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import Link from "next/link";

interface CategoryProps {
  label: string;
  // icon: IconType;
  selected?: boolean;
}

export const Category: React.FC<CategoryProps> = ({
  label,
  // icon: Icon,
  selected,
}) => {
  const pathname = usePathname();
  const category = pathname ? pathname.split("/")[1] : "";

  return (
    <Link
      href={`/${label}`}
      className={`flex flex-col md:flex-row gap-2 items-center justify-between p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
    ${
      selected
        ? "border-b-slate-800 text-slate-800 font-semibold"
        : "border-transparent text-slate-500"
    }`}
    >
      {/* <Icon size={20} /> */}
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
};
