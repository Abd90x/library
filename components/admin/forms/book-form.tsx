"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/file-upload";
import ColorPicker from "../color-picker";
import { createBook } from "@/lib/admin/actions/book";
import { toast } from "sonner";
import { updateBook } from "@/lib/actions/book";

interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title || "",
      description: book?.description || "",
      author: book?.author || "",
      genre: book?.genre || "",
      rating: book?.rating || 0,
      totalCopies: book?.totalCopies || 0,
      coverUrl: book?.coverUrl || "",
      coverColor: book?.coverColor || "#00FF00",
      videoUrl: book?.videoUrl || "",
      summary: book?.summary || "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    if (type === "update") {
      const result = await updateBook({
        id: book.id!,
        ...values,
      });
      if (result.success) {
        toast.success("Success", {
          description: result.message,
        });
        router.refresh();
      } else {
        toast.error("Error", {
          description: result.message,
        });
      }
    } else {
      const result = await createBook(values);

      if (result.success) {
        toast.success("Success", {
          description: result.message,
        });

        router.push(`/admin/books/${result.data.id}`);
      } else {
        toast.error("Error", {
          description: result.message,
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="book-form_input"
                  placeholder="eg. The Alchemist"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="book-form_input"
                  placeholder="eg. Paulo Coelho"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="book-form_input"
                  placeholder="eg. Fiction"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={0}
                  max={5}
                  step={1}
                  className="book-form_input"
                  placeholder="eg. 5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Total Copies
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={0}
                  max={10000}
                  step={1}
                  className="book-form_input"
                  placeholder="eg. 10000"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Cover Color
              </FormLabel>
              <FormControl>
                <ColorPicker
                  value={field.value}
                  onPickerChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="book-form_input h-32 resize-none"
                    placeholder="eg. The Alchemist is a novel by Brazilian author Paulo Coelho"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-full">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="book-form_input min-h-32 max-h-96 resize-none"
                    placeholder="eg. The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988. The novel tells the story of Santiago, a young Andalusian shepherd boy who falls in love with a local girl named Ana."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Cover
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload Cover"
                  folder="books/covers"
                  variant="light"
                  value={field.value}
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Trailer
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="video"
                  accept="video/*"
                  placeholder="Upload Book Trailer"
                  folder="books/videos"
                  variant="light"
                  value={field.value}
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="book-form_btn bg-admin hover:bg-admin/80 text-white col-span-full"
        >
          {type === "update" ? "Update Book" : "Create Book"}
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
