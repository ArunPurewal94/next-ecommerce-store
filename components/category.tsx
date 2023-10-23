"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";
import Link from "next/link";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

export const Category: React.FC<CategoryProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <Link href={`/${label}`}
      className={`flex flex-col md:flex-row gap-2 items-center justify-between p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
    ${
      selected
        ? "border-b-slate-800 text-slate-800 font-semibold"
        : "border-transparent text-slate-500"
    }`}
    >
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
};
