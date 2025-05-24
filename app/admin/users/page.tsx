import UsersTable from "@/components/admin/tables/users-table";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/lib/actions/users";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const response = await getAllUsers();
  const users = response.data ?? [];
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-4xl font-semibold">All Users</h2>
        <Button className="bg-admin hover:bg-admin/80" asChild>
          <Link href="/admin/users/new" className="text-white">
            <CirclePlus />
            <span className="hidden sm:inline-block">New User</span>
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <UsersTable users={users} />
      </div>
    </section>
  );
};

export default Page;
