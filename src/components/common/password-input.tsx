import { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  fieldState?: {
    error?: FieldError;
  };
}
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...props }, ref) => {
    // State
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        {/* Input */}
        <Input type={showPassword ? "text" : "password"} {...props} ref={ref} />

        {/* Toggle visibility */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 rtl:right-auto rtl:left-0 top-0  h-full px-3"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <VscEyeClosed size={45} color="#949BA5" />
          ) : (
            <VscEye size={45} color="#949BA5" />
          )}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
