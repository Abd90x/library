import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  universityId: z.coerce.number(),
  universityCard: z.string().min(1, "University card is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const bookSchema = z.object({
  id: z.string().uuid().optional(),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long")
    .max(1000, "Description must be at most 1000 characters long"),
  author: z
    .string()
    .min(3, "Author must be at least 3 characters long")
    .max(100, "Author must be at most 100 characters long"),
  genre: z
    .string()
    .min(3, "Genre must be at least 3 characters long")
    .max(50, "Genre must be at most 50 characters long"),
  rating: z.coerce
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  totalCopies: z.coerce
    .number()
    .int()
    .positive()
    .lte(10000, "Total copies must be at most 10000"),
  coverUrl: z.string().nonempty("Cover URL is required"),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i, "Color must be a valid eg. #FFFFFF"),
  videoUrl: z.string().nonempty("Video URL is required"),
  summary: z
    .string()
    .min(3, "Summary must be at least 3 characters long")
    .max(10000, "Summary must be at most 10000 characters long"),
});

export type TBookSchema = typeof bookSchema._type;
