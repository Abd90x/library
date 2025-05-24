import BooksTable from "@/components/admin/tables/books-table";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const booksData = await db.select().from(books);

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-4xl font-semibold">All Books</h2>
        <Button className="bg-admin hover:bg-admin/80" asChild>
          <Link href="/admin/books/new" className="text-white">
            <CirclePlus />
            <span className="hidden sm:inline-block">New Book</span>
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <BooksTable data={booksData} />
      </div>
    </section>
  );
};

export default Page;
