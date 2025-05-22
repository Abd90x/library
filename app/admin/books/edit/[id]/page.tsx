import BookForm from "@/components/admin/forms/book-form";
import { Button } from "@/components/ui/button";
import { getBookById } from "@/lib/actions/book";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: bookId } = await params;
  if (!bookId) redirect("/404");

  const book = await getBookById({ bookId });

  return (
    <div className="space-y-6">
      <Button className="bg-admin hover:bg-admin/80" asChild>
        <Link href="/admin/books" className="text-white">
          Back
        </Link>
      </Button>

      <section className="w-full">
        <BookForm type="update" {...book.data} />
      </section>
    </div>
  );
};

export default Page;
