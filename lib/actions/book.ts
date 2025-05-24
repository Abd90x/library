"use server";
import { books, borrows, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";
import { db } from "@/database/drizzle";
import { TBookSchema } from "../validations";

export const getBookById = async (params: { bookId: string }) => {
  const { bookId } = params;

  try {
    const response = await db.select().from(books).where(eq(books.id, bookId));

    if (!response.length) {
      return {
        success: false,
        message: "Book not found",
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(response[0])),
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the book",
    };
  }
};

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        message: "Book is not available for borrowing",
      };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db.insert(borrows).values({
      userId,
      bookId,
      dueDate,
    });

    await db
      .update(books)
      .set({
        availableCopies: book[0].availableCopies - 1,
      })
      .where(eq(books.id, bookId));

    return {
      success: true,
      message: "Book borrowed successfully",
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while borrowing the book",
    };
  }
};

export const getBorrowedBooks = async () => {
  try {
    const response = await db
      .select()
      .from(borrows)
      .leftJoin(books, eq(borrows.bookId, books.id))
      .leftJoin(users, eq(borrows.userId, users.id));

    if (response.length > 0) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(response)),
      };
    } else {
      return {
        success: false,
        message: "No borrowed books found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the borrowed books",
    };
  }
};

export const updateBook = async (params: TBookSchema) => {
  const { id, ...rest } = params;
  console.log(id);
  try {
    const response = await db.update(books).set(rest).where(eq(books.id, id!));

    return {
      success: true,
      message: "Book updated successfully",
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while updating the book",
    };
  }
};

export const deleteBook = async (params: { bookId: string }) => {
  const { bookId } = params;

  try {
    await db.delete(books).where(eq(books.id, bookId));

    return {
      success: true,
      message: "Book deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while deleting the book",
    };
  }
};
