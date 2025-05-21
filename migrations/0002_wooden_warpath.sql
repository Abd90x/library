CREATE TABLE "borrows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"due_date" date NOT NULL,
	"return_date" date,
	"borrow_status" "borrow_status_enum" DEFAULT 'BORROWED' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "borrows_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "borrows" ADD CONSTRAINT "borrows_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrows" ADD CONSTRAINT "borrows_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;