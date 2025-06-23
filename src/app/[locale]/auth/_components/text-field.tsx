import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

// Define props for the TextField component using generics:
// - TFieldValues: the full form schema (e.g. { name: string; email: string })
// - TName: a specific field key from that schema (e.g. "email")

interface TextFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  control: Control<TFieldValues>; // Provided by useForm from react-hook-form
  name: TName; // Field name that matches a key in TFieldValues
  label?: string;
  placeholder?: string;
  autoComplete?: string;
}

const TextField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  placeholder,
  autoComplete,
}: TextFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field} // Includes onChange, value, ref, etc. for react-hook-form
              placeholder={placeholder}
              autoComplete={autoComplete}
              className={cn(
                fieldState.error ? "border-red-500 focus:border-none" : "border-borderGray",
                "rounded-lg h-12 placeholder:text-neutralGray bg-lightGray shadow-secondary",
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
