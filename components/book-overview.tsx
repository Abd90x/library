import Image from "next/image";
import React from "react";
import BookCover from "./book-cover";
import BorrowBook from "./borrow-book";
import { db } from "@/database/drizzle";
import { borrows, users } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import { Button } from "./ui/button";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  id: bookId,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const isBorrowed = await db
    .select()
    .from(borrows)
    .where(
      and(
        eq(borrows.bookId, bookId),
        eq(borrows.userId, userId),
        eq(borrows.status, "BORROWED")
      )
    )
    .limit(1);

  const borrowingEligiblity = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message:
      availableCopies < 0
        ? "Book is currently unavailable"
        : "You are not eligible to borrow this book",
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-100">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>

          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>

        {isBorrowed.length > 0 ? (
          <Button className="book-overview_btn" disabled={true}>
            <Image src="/icons/book.svg" alt="book" width={20} height={20} />
            <p className="font-bebas-neue text-xl text-dark-100">Borrowed</p>
          </Button>
        ) : (
          user && (
            <BorrowBook
              bookId={bookId}
              userId={userId}
              borrowingEligiblity={borrowingEligiblity}
            />
          )
        )}
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverUrl={coverUrl}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-80 blur-md max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverUrl={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
