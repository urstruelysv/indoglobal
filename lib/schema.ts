import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["New", "Called", "Visited", "Converted", "Not Converted"]);

export const admissions = pgTable("admissions", {
  id: serial("id").primaryKey(),
  parentName: text("parent_name").notNull(),
  studentDOB: text("student_dob").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  altPhone: varchar("alt_phone", { length: 20 }),
  classApplying: varchar("class_applying", { length: 50 }).notNull(),
  email: text("email"),
  status: statusEnum("status").default("New").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: statusEnum("status").default("New").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});
