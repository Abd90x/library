"use client";
import { cn } from "@/lib/utils";
import React from "react";
import BookCoverSvg from "./book-cover-svg";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

type BookCoverVariant = "small" | "wide" | "default";

const variantStyles: Record<BookCoverVariant, string> = {
  small: "book-cover_small",
  default: "book-cover_regular",
  wide: "book-cover_wide",
};

type Props = {
  variant?: BookCoverVariant;
  coverColor: string;
  coverUrl: string;
  className?: string;
};

const BookCover = ({
  variant = "default",
  coverColor = "#012b48",
  coverUrl = "https://placehold.co/400x600.png",
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <IKImage
          path={coverUrl}
          urlEndpoint={config.env.imageKit.urlEndpoint}
          alt="Book Cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          lqip={{ active: true }}
        />
      </div>
    </div>
  );
};

export default BookCover;
