import { AccessDenied } from "@/components/access-denied";
import { AdminNavbar } from "./components/admin-navbar";
import { getCurrentUser } from "@/actions/get-current-user";

export const metadata = {
  title: "Store | Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "ADMIN") {
    return (
      <AccessDenied title="You need admin privileges to view this page." />
    );
  }

  return (
    <div>
      <div>
        <AdminNavbar />
      </div>
      {children}
    </div>
  );
}
