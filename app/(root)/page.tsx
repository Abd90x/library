import { auth } from "@/auth";
import BookList from "@/components/book-list";
import BookOverview from "@/components/book-overview";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { desc } from "drizzle-orm";

const Home = async () => {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  const results = await db.select().from(users);

  return (
    <>
      <BookOverview {...latestBooks[0]} />
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};
export default Home;
