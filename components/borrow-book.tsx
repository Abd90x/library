"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";

type Props = {
  bookId: string;
  userId: string;
  borrowingEligiblity: {
    isEligible: boolean;
    message: string;
  };
};

const BorrowBook = ({ bookId, userId, borrowingEligiblity }: Props) => {
  const router = useRouter();

  const [borrowing, setBorrowing] = useState(false);

  const { isEligible, message } = borrowingEligiblity;

  const handleBorrowing = async () => {
    if (!isEligible) {
      toast.error("Error", {
        description: message,
      });
    }
    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });
      if (result.success) {
        toast.success("Success", {
          description: "Book borrowed successfully",
        });
      } else {
        toast.error("Error", {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowing}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing..." : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BorrowBook;
