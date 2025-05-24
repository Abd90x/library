"use client";

import FileUpload from "@/components/file-upload";
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
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema, TSignUpSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { Path, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  fullName: "",
  email: "",
  password: "",
  universityId: 0,
  universityCard: "",
};

const UserForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const handleSubmit = async (data: TSignUpSchema) => {
    const results = await signUp(data);
    if (results.success) {
      toast.success("Success", {
        description: "User created successfully!",
      });
      router.push("/admin/users");
    } else {
      toast.error("Something went wrong", {
        description: results.error,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<TSignUpSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">
                  {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                </FormLabel>
                <FormControl>
                  {field.name === "universityCard" ? (
                    <FileUpload
                      type="image"
                      accept="image/*"
                      placeholder="Upload your ID"
                      folder="ids"
                      variant="light"
                      onFileChange={field.onChange}
                    />
                  ) : (
                    <Input
                      type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                      {...field}
                      className="book-form_input !bg-white"
                    />
                  )}
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="form-btn bg-admin hover:bg-admin/80 !text-white"
        >
          Create User
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
