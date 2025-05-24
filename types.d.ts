interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  userId: string;
  bookId: string;
}

interface IUser {
  id: string;
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  role: "USER" | "ADMIN";
  lastActivityDate?: string | null;
}

interface Borrow {
  id: string;
  userId: string;
  bookId: string;
  dueDate: string;
  returnDate: string;
  createdAt: string;
  status: "BORROWED" | "RETURNED";
}

interface Borrowed {
  borrows: Borrow;
  users: IUser;
  books: Book;
}

interface BorrowedBook {
  id: Borrow["id"];
  fullName: IUser["fullName"];
  email: IUser["email"];
  title: Book["title"];
  status: Borrow["status"];
  dueDate: Borrow["dueDate"];
  borrowDate: Borrow["createdAt"];
  returnDate: Borrow["returnDate"];
}
