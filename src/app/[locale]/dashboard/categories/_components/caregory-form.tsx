"use client";

import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
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
import { useAddCategory } from "../_hooks/use-add-category";
import useUpdateCategory from "../_hooks/use-update-category";

export default function CategoryForm({ category }: { category?: Categories }) {
  // Hooks
  const { addCategoryFn, addPending, error } = useAddCategory();
  const { updateCategoryFn, updateCategoryPending } = useUpdateCategory();

  // Teanslations
  const t = useTranslations();

  // Refs
  const formRef = useRef(null);

  // Schema
  const addCategoryFormSchema = useAddCategoryFormSchema();

  // Form
  const form = useForm({
    defaultValues: {
      name: category?.name || "",
      image: "",
    },
    resolver: zodResolver(addCategoryFormSchema),
  });

  // Submit
  const onsubmit: SubmitHandler<AddCategoryFormType> = () => {
    const formData = new FormData(formRef.current || undefined);

    if (category) {
      updateCategoryFn({ formData, id: category._id });
    } else {
      addCategoryFn(formData);
    }
  };
  return (
    <section className="bg-zinc-50 px-4 pt-4  space-y-6">
      {category ? (
        <h2 className="font-bold text-xl text-zinc-800">
          {t("update-category")}: {category.name}
        </h2>
      ) : (
        <h2 className="font-bold text-xl text-zinc-800">{t("add-a-new-category")}</h2>
      )}
      {/* Form */}
      <Form {...form}>
        <form
          ref={formRef}
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
                  <Label>{t("name")}</Label>

                  {/* Field */}
                  <FormControl>
                    <Input {...field} placeholder={t("enter-category-name")} />
                  </FormControl>

                  {/* feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {!category && (
              <>
                <FormField
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      {/* Label */}
                      <FormLabel>{t("category-image")}</FormLabel>

                      {/* Field */}
                      <FormControl>
                        <Input {...field} type="file" accept="image/*" />
                      </FormControl>

                      {/* Feedback */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <p className="text-red-600 text-3xl font-semibold ">{error.message}</p>}
              </>
            )}
            {category && (
              <div className="flex justify-end">
                <div className="w-fit flex items-center text-blue-600 gap-1 p-[10px] border rounded-lg border-black/10 ">
                  <Image width={18} height={18} />
                  <span className="">{t("view-category-image")}</span>
                </div>
              </div>
            )}
          </div>

          <div>
            {category ? (
              <Button
                className="w-full"
                disabled={updateCategoryPending || !form.formState.isValid}
              >
                {t("update-category")}
              </Button>
            ) : (
              <Button className="w-full" disabled={addPending || !form.formState.isValid}>
                {t("add-category")}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
}
