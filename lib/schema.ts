import { pgTable, serial, text, timestamp, varchar, integer, boolean, pgEnum } from "drizzle-orm/pg-core";

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

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  filename: text("filename").notNull(),
  mimeType: varchar("mime_type", { length: 50 }).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const positionTypeEnum = pgEnum("position_type", ["Teaching", "Non-Teaching"]);

export const careerApplications = pgTable("career_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  positionType: positionTypeEnum("position_type").notNull(),
  positionApplying: text("position_applying").notNull(),
  qualification: text("qualification").notNull(),
  experience: varchar("experience", { length: 50 }).notNull(),
  resumeFilename: text("resume_filename").notNull(),
  resumeOriginalName: text("resume_original_name").notNull(),
  message: text("message"),
  status: statusEnum("status").default("New").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const newsItems = pgTable('news_items', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  coverImage: text('cover_image'),
  category: varchar('category', { length: 50 }).default('news').notNull(),
  author: varchar('author', { length: 100 }).default('IGS Team').notNull(),
  published: boolean('published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  coverImage: text('cover_image'),
  author: varchar('author', { length: 100 }).default('IGS Team').notNull(),
  published: boolean('published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
