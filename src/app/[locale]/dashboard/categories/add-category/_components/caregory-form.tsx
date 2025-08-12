"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AddCategoryFormType,
  useAddCategoryFormSchema,
} from "@/lib/schemas/categories/add-categories.schema";
import { Categories } from "@/lib/types/category";

export default function AddCaregoryForm({ category }: { category?: Categories }) {
  const addCategoryFormSchema = useAddCategoryFormSchema();
  const form = useForm({
    defaultValues: {
      name: category?.name || "",
      image: null as unknown as File,
    },
    resolver: zodResolver(addCategoryFormSchema),
  });
  const onsubmit: SubmitHandler<AddCategoryFormType> = (values) => {
    console.log(values);
  };
  return (
    <section className="bg-zinc-50 px-4 pt-4  space-y-6">
      {category ? (
        <h2 className="font-bold text-xl text-zinc-800">Update category: {category.name}</h2>
      ) : (
        <h2 className="font-bold text-xl text-zinc-800">Add a New category</h2>
      )}
      {/* Form */}
      <Form {...form}>
        <form
          className="p-6 rounded-2xl  flex flex-col bg-white gap-32"
          onSubmit={form.handleSubmit(onsubmit)}
        >
          <div className="space-y-5">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  {/* Label */}
                  <Label>Name</Label>

                  {/* Field */}
                  <FormControl>
                    <Input {...field} placeholder="Enter category name" />
                  </FormControl>

                  {/* feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {!category && (
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    {/* Label */}
                    <FormLabel>Category image</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input {...field} type="file" accept="image/*" />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {category && (
              <div className="flex justify-end">
                <div className="w-fit flex items-center text-blue-600 gap-1 p-[10px] border rounded-lg border-black/10 ">
                  <Image width={18} height={18} />
                  <span className="">View category image</span>
                </div>
              </div>
            )}
          </div>

          <div>
            {category ? (
              <Button className="w-full">Update Category</Button>
            ) : (
              <Button className="w-full">Add Category</Button>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
}
