"use client";
import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            width={37}
            height={37}
          />
          <h1>Book</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname == link.route;
            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected ? "bg-admin shadow-sm" : "hover:bg-slate-100"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${
                        isSelected ? "brightness-0 invert" : ""
                      } object-contain`}
                    />
                  </div>
                  <p
                    className={cn(isSelected ? "text-white" : "text-zinc-400")}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="user">
        <Avatar className="w-12 h-12">
          <AvatarFallback>
            {getInitials(session?.user?.name as string)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-md:hidden max-w-36">
          <p className="text-sm font-semibold text-dark-200 truncate">
            {session?.user?.name}
          </p>
          <p className="text-xs text-light-500 truncate">
            {session?.user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
