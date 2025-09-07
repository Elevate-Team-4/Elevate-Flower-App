/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useAddToCart } from "../hooks/use-add-to-cart";
import { addToCartLocalStorage } from "../_actions/local-cart.actoin";

interface AddToCartButtonProps {
  productId: string;
  isLoggedIn: boolean;
  disabled?: boolean;
}

export default function AddToCartButton({
  productId,
  isLoggedIn,
  disabled = false,
}: AddToCartButtonProps) {
  const { isPending, addToCart } = useAddToCart();
  const [isLocalPending, setIsLocalPending] = useState(false);

  const handleClick = async () => {
    if (isLoggedIn) {
      // User is logged in - use the mutation
      addToCart({ productId, quantity: 1 });
    } else {
      // User is not logged in - use localStorage
      setIsLocalPending(true);
      try {
        addToCartLocalStorage(productId, 1);
        toast({
          title: "Added to cart!",
          description: "Item added to your cart",
        });
      } catch (error) {
        toast({
          title: "Failed to add to cart",
          description: "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setIsLocalPending(false);
      }
    }
  };

  const isLoading = isLoggedIn ? isPending : isLocalPending;

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={cn(
        "flex items-center w-full justify-center font-primary gap-2 px-6 h-12 bg-maroon-600 text-white rounded-lg font-medium",
        "hover:bg-maroon-700 transition-colors duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
      )}
    >
      <ShoppingCart className={cn("w-5 h-5", isLoading && "animate-pulse")} />
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
