import UserForm from "@/components/admin/forms/user-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-6">
      <Button className="bg-admin hover:bg-admin/80" asChild>
        <Link href="/admin/users" className="text-white">
          Back
        </Link>
      </Button>

      <section className="w-full">
        <UserForm />
      </section>
    </div>
  );
};

export default Page;
