import { auth, signOut } from "@/auth";
import BookList from "@/components/book-list";
import { Button } from "@/components/ui/button";
import { getBorrowedBooks } from "@/lib/actions/book";
import React from "react";

const Page = async () => {
  const session = await auth();

  const borrowedBooks = await getBorrowedBooks();

  const borrowedList = borrowedBooks.data
    ?.filter((item: Borrowed) => item.borrows.status === "BORROWED")
    .map((row: Borrowed) => row.books);

  const returnedList = borrowedBooks.data
    ?.filter((item: Borrowed) => item.borrows.status === "RETURNED")
    .map((row: Borrowed) => row.books);

  return (
    <div className="flex flex-col gap-8">
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

      <div>
        {borrowedList.length > 0 && (
          <BookList title="Borrowed Books" books={borrowedList} />
        )}
      </div>
      <hr className="border-primary border-dashed" />
      <div>
        {returnedList.length > 0 && (
          <BookList title="Borrow History" books={returnedList} />
        )}
      </div>
    </div>
  );
};

export default Page;
