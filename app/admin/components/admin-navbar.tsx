"use client";

import { Container } from "@/components/ui/container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminNavItem } from "./admin-navitem";
import { MdDashboard, MdLibraryAdd } from "react-icons/md";

export const AdminNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full shadow border pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem
              label="Dashboard Summary"
              icon={MdDashboard}
              selected={pathname === "/admin"}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavItem
              label="Add Products"
              icon={MdLibraryAdd}
              selected={pathname === "/admin/add-products"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Manage Products"
              icon={MdDashboard}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Manage Orders"
              icon={MdDashboard}
              selected={pathname === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};
