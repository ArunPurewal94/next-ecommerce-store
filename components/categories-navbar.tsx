"use client";

import { categories } from "@/lib/products";
import { Category } from "@/components/category";
import { Container } from "@/components/ui/container";
import React from "react";
import { usePathname } from "next/navigation";

interface CategoriesNavbarProps {}

export const CategoriesNavbar: React.FC<CategoriesNavbarProps> = () => {
  const pathname = usePathname();

  if (!categories) {
    return null;
  }

  if (pathname?.startsWith("/admin")) return null;

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-evenly overflow-x-auto">
        {categories.map((category) => (
          <Category
            key={category.label}
            label={category.label}
            icon={React.createElement(category.icon)}
          />
        ))}
      </div>
    </Container>
  );
};
