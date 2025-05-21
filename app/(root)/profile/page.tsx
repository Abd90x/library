import { auth, signOut } from "@/auth";
import BookList from "@/components/book-list";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books, borrows } from "@/database/schema";
import { eq } from "drizzle-orm";
import React from "react";

const Page = async () => {
  const session = await auth();

  const borrowedBooks = await db
    .select()
    .from(borrows)
    .where(eq(borrows.userId, session?.user?.id as string))
    .leftJoin(books, eq(books.id, borrows.bookId));

  const borrowedList = borrowedBooks.map((row) => row.books);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-light-200 font-bold text-4xl">
          Welcome Back, {session?.user?.name}
        </h2>
        <p className="text-light-100">
          Here you can see all your borrowed books and manage your library
          account. Feel free to browse through your collection and return books
          when you're done reading.
        </p>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="my-6"
      >
        <Button>Logout</Button>
      </form>

      {borrowedList.length > 0 && (
        <BookList
          title="Borrowed Books"
          books={borrowedList.filter(
            (book): book is NonNullable<typeof book> => book !== null
          )}
        />
      )}
    </>
  );
};

export default Page;
