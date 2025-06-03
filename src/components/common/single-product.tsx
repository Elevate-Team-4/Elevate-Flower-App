import type { Product } from "@/lib/types/products";
import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
/**
 * SingleProduct Component
 *
 * Displays a single product card including:
 * - Cover image
 * - Sliced title (max 3 words)
 * - Rating stars
 * - Price and discounted price
 * - Cart button
 * - Conditional badges: NEW, HOT, OUT OF STOCK
 *
 * Props:
 * - singleProduct: Pass Single Product (contains details like title, image, price, rateAvg, quantity, sold, createdAt)
 */

// Params Single Product Type
interface SingleProduct {
  singleProduct: Product;
}

export default function SingleProduct({ singleProduct }: SingleProduct) {
  // Variables
  let title;

  const currentDate = Date.now();
  const productDate = new Date(singleProduct.createdAt).getTime();
  const diffrence = currentDate - productDate;
  const durationInDays = Math.floor(diffrence / 1000 / 60 / 60 / 24); // Making Time By Day Instead Of Api Format

  // Functions
  // Slice Title
  const titleSliced = () => {
    if (singleProduct.title.split(" ").length > 3) {
      title = singleProduct.title.split(" ").slice(0, 3).join(" ") + "...";
    } else {
      title = singleProduct.title;
    }
    return title;
  };

  // Show New Badge
  const showNew = () => {
    if (durationInDays > 181) {
      return true;
    } else {
      return false;
    }
  };

  // Show Hot Badge
  const showHot = () => {
    if (singleProduct.sold) {
      return true;
    } else {
      return false;
    }
  };

  // Show Out Of Stock Badge
  const showOutOfStock = () => {
    if (singleProduct.quantity === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="relative flex flex-col">
      {/* Cover & Title */}
      <div>
        {/* Product Cover */}
        <Image
          src={singleProduct.imgCover}
          width={302}
          height={0}
          style={{ objectFit: "cover" }}
          alt="Product Cover Image"
          className="h-72 w-80 rounded-xl"
        ></Image>

        {/* product title */}
        <h3
          // TODO Change Text Color
          className="text-lg mt-4 mb-1 font-semibold text-[#741C21]"
        >
          {titleSliced()}
        </h3>
      </div>

      {/* Product descreption */}
      <div>
        {/* price , Review & cart button*/}
        <div className="flex justify-between font-medium">
          <div>
            {/* Review */}
            <div className="flex mb-1">
              {Array.from({ length: 5 }, (_, i) =>
                i < singleProduct.rateAvg ? (
                  <Star fill="#FBA707" size={16} strokeWidth={0} key={i} />
                ) : (
                  <Star color="#FBA707" size={16} key={i} />
                )
              )}
            </div>

            {/* Price */}
            <span
              // TODO Change Text Color
              className="text-[#741C21]"
            >
              {singleProduct.priceAfterDiscount}.00 EGP{" "}
            </span>
            <span className="line-through text-zinc-400">
              {singleProduct.price}.00 EGP
            </span>
          </div>

          {/* Cart Button */}
          <Button
            // TODO Change bg Color
            className="rounded-full [&_svg]:size-6 h-11 w-11 bg-[#A6252A] hover:bg-[#A6252A]"
            size="icon"
          >
            <ShoppingCart strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-0 flex end-0 gap-2 p-2">
        <Badge
          variant="destructive"
          className={cn(
            showNew() ? "block" : "hidden",
            "bg-zinc-100 text-zinc-700 hover:bg-zinc-100 py-1 px-2"
          )}
        >
          NEW
        </Badge>

        <Badge
          variant="destructive"
          // TODO Change Text / Bg Color
          className={cn(
            showHot() ? "block" : "hidden",
            "bg-[#FBEAEA] text-[#A6252A] hover:bg-[#FBEAEA] py-1 px-2"
          )}
        >
          HOT
        </Badge>

        <Badge
          variant="destructive"
          className={cn(
            showOutOfStock() ? "block" : "hidden",
            // TODO Change Text Color
            "text-[#FFF1F5] bg-red-600 hover:bg-red-600 py-1 px-2"
          )}
        >
          OUT OF STOCK
        </Badge>
      </div>
    </div>
  );
}
