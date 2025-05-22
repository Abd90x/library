import BooksTable from "@/components/admin/tables/books-table";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const booksData = await db.select().from(books);

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-admin hover:bg-admin/80" asChild>
          <Link href="/admin/books/new" className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-plus-icon lucide-circle-plus"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
            <span className="hidden sm:inline-block">Create a New Book</span>
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
