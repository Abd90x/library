import React from "react";
import BookCard from "./book-card";

type Props = {
  title: string;
  books: Book[];
  containerClassName?: string;
};

const BookList = ({ title, books, containerClassName }: Props) => {
  if (!books.length) return null;

  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list justify-between">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
