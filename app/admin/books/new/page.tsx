import BookForm from "@/components/admin/forms/book-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-6">
      <Button className="bg-admin hover:bg-admin/80" asChild>
        <Link href="/admin/books" className="text-white">
          Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </div>
  );
};

export default Page;
