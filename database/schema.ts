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
