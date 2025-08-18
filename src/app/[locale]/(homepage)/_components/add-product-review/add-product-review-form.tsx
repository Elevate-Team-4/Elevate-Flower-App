"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Textarea } from "@/components/ui/textarea";
import {
  ProductReviewField,
  useAddProductReviewSchema,
} from "@/lib/schema/add-product-review.schema";
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
import { useRouter } from "@/i18n/navigation";
import useAddProductReview from "../../_hooks/use-add-productReview";

type AddProductReviewFormProps = {
  productId: string;
};

export default function AddProductReviewForm({ productId }: AddProductReviewFormProps) {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Schema
  const addProductReviewSchema = useAddProductReviewSchema();

  // Session
  const { data: session } = useSession();
  const { addProductReviewFn, error, isPending } = useAddProductReview();

  // Effects
  useEffect(() => {
    if (session?.user?._id) {
      const storedReview = localStorage.getItem("stoppedReview");
      if (storedReview) {
        const { values, productId } = JSON.parse(storedReview);
        addProductReviewFn({ values, productId });
      }
    }
  }, [session?.user._id, addProductReviewFn]);

  //   Form
  const form = useForm<ProductReviewField>({
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
    },
    resolver: zodResolver(addProductReviewSchema),
  });

  //   Submit
  const onSubmit: SubmitHandler<ProductReviewField> = (values) => {
    if (session?.user._id) {
      addProductReviewFn({ values, productId });
      form.reset();
    } else {
      localStorage.setItem(
        "stoppedReview",
        JSON.stringify({
          productId,
          values,
        }),
      );
      router.push("/auth/login");
    }
  };

  return (
    // Form
    <Form {...form}>
      <form className="flex flex-col gap-[10px]" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Rating Field */}
        <div className=" flex items-center gap-2">
          <FormLabel>{t("rating-0")}: </FormLabel>
          <Controller
            name="rating"
            control={form.control}
            render={({ field }) => (
              <Rating value={field.value} onValueChange={field.onChange} className="justify-start">
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton key={index} className="text-orange-400" />
                ))}
                <FormMessage />
              </Rating>
            )}
          />
        </div>

        {/* Title Field */}
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* label */}
              <FormLabel className="">{t("title")}</FormLabel>
              {/* field */}
              <FormControl>
                <Input {...field} placeholder={t("enter-your-review-title")} />
              </FormControl>
              {/* feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Review Field */}
        <FormField
          name="comment"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* label */}
              <FormLabel className="">{t("review")}</FormLabel>
              {/* field */}
              <FormControl>
                <Textarea
                  className="min-h-36 resize-none  dark:border-zinc-600 dark:bg-zinc-700"
                  {...field}
                  placeholder={t("what-do-you-think-of-this-product")}
                />
              </FormControl>
              {/* feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* error msg */}
        {error && <p className="text-red-500 text-xl font-medium">{error.message}!</p>}

        {/* Button Submit */}
        <Button
          className="w-full"
          disabled={isPending || (!form.formState.isSubmitted && !form.formState.isValid)}
        >
          {t("add-review")}
        </Button>
      </form>
    </Form>
  );
}
