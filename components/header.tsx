"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <span className="text-2xl font-bold text-light-100">Book</span>
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Home
          </Link>
        </li>

        {session && (
          <li>
            <Link href="/profile">
              <Avatar>
                <AvatarFallback>
                  {session?.user?.name ? getInitials(session.user.name) : "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
