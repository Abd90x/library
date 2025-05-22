import UsersTable from "@/components/admin/tables/users-table";
import { getAllUsers } from "@/lib/actions/users";
import React from "react";

const Page = async () => {
  const response = await getAllUsers();

  console.log(response.data);
  const users = response.data ?? [];
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-4xl font-semibold">All Users</h2>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <UsersTable users={users} />
      </div>
    </section>
  );
};

export default Page;
