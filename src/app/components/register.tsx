"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//  schema validation
const formSchema = z
  .object({
    FristName: z.string().min(1, { message: "Frist name is required" }),
    LastName: z.string().min(1, {
      message: "Last name is required",
    }),
    Email: z.string().email({ message: "Invalid email address" }),
    Phone: z.string().min(1, { message: "Phone number is required" }),
    Gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
    Password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    ConfirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });

export default function RegisterForm() {
  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FristName: "",
      LastName: "",
      Email: "",
      Phone: "",
      Gender: "male",
      Password: "",
      ConfirmPassword: "",
    },
  });
  // submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    //    register form
    <div className="w-[406px] flex flex-col justify-center gap-6">
      {/* header */}
      <div className="flex justify-center border-b-2 border-zinc-200 pb-4">
        <h6 className="text-4xl font-normal text-maroon-700 font-pinyon">
          Become part of our family!
        </h6>
      </div>

      {/* inputs */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
          <div className="grid grid-cols-2 gap-3">
            {/* frist name */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="FristName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frist name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jonathan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* last name */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="LastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Adrian" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <PhoneInput placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Gender */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="Gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">male</SelectItem>
                        <SelectItem value="female">female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Confirm Password */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="ConfirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* submit button */}
          <Button type="submit" className="w-full">
            Create Account
          </Button>

          {/*  */}
          <p className="font-primary font-medium text-sm text-center">
            Already have an account? <span className="text-maroon-500 font-bold">Login</span>{" "}
            {/* we use Link from next-intl when we marge github code */}
          </p>
        </form>
      </Form>
    </div>
  );
}
