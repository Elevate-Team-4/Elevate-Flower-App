import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "@/components/common/password-input";

// Define props for the TextField component using generics:
// - TFieldValues: the full form schema (e.g. { name: string; email: string })
// - TName: a specific field key from that schema (e.g. "email")

interface TextFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  control: Control<TFieldValues>; // Provided by useForm from react-hook-form
  name: TName; // Field name that matches a key in TFieldValues
  placeholder?: string;
  autoComplete?: string;
  label?: string;
}

const PasswordField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  placeholder,
  autoComplete,
  label,
}: TextFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <PasswordInput
              className={`rounded-lg placeholder:text-neutralGray  bg-lightGray  ${
                fieldState?.error
                  ? "border-red-500 focus:border-none"
                  : "border-borderGray shadow-secondary"
              }`}
              placeholder={placeholder}
              autoComplete={autoComplete}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
