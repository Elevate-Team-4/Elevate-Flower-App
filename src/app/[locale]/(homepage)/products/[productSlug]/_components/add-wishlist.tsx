"use client";

import { useState } from "react";
import { Heart, HeartPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useAddToWishlist } from "../hooks/use-add-to-wishlist";
import { useRemoveFromWishlist } from "../hooks/use-delete-from-wishlist";

interface WishlistCheckResult {
  inWishlist: boolean;
}

interface AddToWishlistProps {
  productId: string;
  check: APIResponse<WishlistCheckResult>;
  extend?: boolean;
  animation?: boolean;
}
export default function FavoriteToggle({
  productId,
  check,
  extend,
  animation,
}: AddToWishlistProps) {
  const [isFavorite, setIsFavorite] = useState("inWishlist" in check ? check.inWishlist : false);

  const { isPending: isAdding, addToWishlist } = useAddToWishlist();
  const { isPending: isRemoving, removeFromWishlist } = useRemoveFromWishlist();

  const handleClick = () => {
    if ("error" in check) {
      toast({ title: "Please login to manage your wishlist." });
      return;
    }

    const newStatus = !isFavorite;

    if (newStatus) {
      // Add to wishlist
      addToWishlist(productId, {
        onSuccess: () => {
          setIsFavorite(true);
          toast({ title: "Added to wishlist!" });
        },
        onError: (error: { message: string }) => {
          toast({
            title: "Failed to add to wishlist",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    } else {
      // Remove from wishlist
      removeFromWishlist(productId, {
        onSuccess: () => {
          setIsFavorite(false);
          toast({ title: "Removed from wishlist!" });
        },
        onError: (error: { message: string }) => {
          toast({
            title: "Failed to remove from wishlist",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    }
  };

  const isPending = isAdding || isRemoving;

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label="Toggle Wishlist"
      className={cn(
        "group flex items-center justify-center rounded-xl w-12 h-12 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isFavorite ? "bg-red-100 hover:bg-red-200" : "bg-zinc-100 hover:bg-zinc-200",
      )}
    >
      {/* Icon */}
      {isFavorite ? (
        <Heart className={cn("w-6 h-6 fill-red-500 text-red-500", isPending && "animate-pulse")} />
      ) : (
        <HeartPlus className={cn("w-6 h-6 text-zinc-800", isPending && "animate-pulse")} />
      )}

      {/* Conditional text */}
      {extend && (
        <span
          className={cn(
            "text-sm font-medium text-zinc-800 transition-all duration-300",
            animation
              ? "overflow-hidden whitespace-nowrap max-w-0 opacity-0 group-hover:ml-2 group-hover:max-w-[200px] group-hover:opacity-100"
              : "ml-2 opacity-100",
          )}
        >
          {isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        </span>
      )}
    </button>
  );
}
