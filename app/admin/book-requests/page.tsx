import BorrowTable from "@/components/admin/tables/borrow-table";
import { getBorrowedBooks } from "@/lib/actions/book";
import React from "react";

const Page = async () => {
  const response = await getBorrowedBooks();

  let borrowsData = response.data ?? [];

  borrowsData = response.data.map((item: Borrowed) => ({
    id: item.borrows.id,
    userId: item.users.id,
    bookId: item.books.id,
    fullName: item.users.fullName,
    email: item.users.email,
    title: item.books.title,
    status: item.borrows.status,
    dueDate: item.borrows.dueDate,
    borrowDate: item.borrows.createdAt.slice(0, 10),
    returnDate: item.borrows.returnDate?.slice(0, 10),
  }));

  console.log(borrowsData); // Add this line to log the data t

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-4xl font-semibold">Borrowed Books</h2>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <BorrowTable data={borrowsData} />
      </div>
    </section>
  );
};

export default Page;
