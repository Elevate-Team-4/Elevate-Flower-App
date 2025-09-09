"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { getAuthHeader } from "@/lib/utils/auth-header";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  image: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
});

export type OccasionFormData = z.infer<typeof formSchema>;

export default function AddOccasion() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      image: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/occasions`, {
      method: "PUT",
      body: formData,
      headers: {
        ...(await getAuthHeader()),
      },
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="flex flex-col gap-6 mt-24 bg-zinc-50">
      <header>
        <h4 className="font-semibold text-2xl text-zinc-800">Add Occasion </h4>
      </header>
      <section className="bg-white rounded-2xl p-6 flex flex-col gap-32">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" {...form.register("image")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Add Occasion
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
