import {
  uuid,
  text,
  integer,
  varchar,
  pgTable,
  pgEnum,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status_enum", [
  "PENDING",
  "APPROVER",
  "REJECTED",
]);

export const ROLE_ENUM = pgEnum("role_enum", ["USER", "ADMIN"]);

export const BORROW_STATUS_ENUM = pgEnum("borrow_status_enum", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull().unique(),
  status: STATUS_ENUM("status").default("PENDING").notNull(),
  role: ROLE_ENUM("role").default("USER").notNull(),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  genre: varchar("genre", { length: 255 }).notNull(),
  rating: integer("rating").notNull(),
  totalCopies: integer("total_copies").notNull(),
  availableCopies: integer("available_copies").notNull().default(0),
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  coverUrl: text("cover_url").notNull(),
  videoUrl: text("video_url").notNull(),
  summary: text("summary").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .$onUpdate(() => new Date()),
});
