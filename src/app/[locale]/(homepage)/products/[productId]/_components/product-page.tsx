import { Package, Star } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Product } from "@/lib/types/products";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddToWishlist from "../../[productId]/_components/add-wishlist";
import { checkWishlistAction } from "../_actions/wishlist.actoin";
import AddToCartButton from "../../[productId]/_components/add-to-cart-button";

function getCurrencyParts(
  locale: string,
  currency: string,
  value: number,
  options?: Intl.NumberFormatOptions,
) {
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...options,
  }).formatToParts(value);

  const symbol = parts.find((p) => p.type === "currency")?.value ?? "";
  const number = parts
    .filter((p) => p.type !== "currency")
    .map((p) => p.value)
    .join("");

  return { number, symbol };
}

interface ProductPageProps {
  product: Product;
  locale: string;
}

export default async function ProductPage({ product, locale }: ProductPageProps) {
  const payload = await checkWishlistAction(product._id); // Check if product is in user's wishlist

  // Session
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user;

  const currency = "EGP";

  // Price calculations
  const priceValue = product.priceAfterDiscount || product.price;
  const discounted = product.priceAfterDiscount
    ? getCurrencyParts(locale, currency, product.price, {
        maximumFractionDigits: 0,
        numberingSystem: locale === "ar" ? "arab" : "latn",
      })
    : null;
  const current = getCurrencyParts(locale, currency, priceValue, {
    maximumFractionDigits: 2,
    numberingSystem: locale === "ar" ? "arab" : "latn",
  });

  return (
    <div className="grid grid-cols-2 gap-16 pt-16 pb-5">
      {/* Product Image Section */}
      <div className="w-full border-2 border-black rounded-3xl h-[600px] bg-gray-100 flex items-center justify-center">
        <p>Product Image/Content Goes Here</p>
      </div>

      {/* Product Details Section */}
      <div className="w-full flex flex-col h-[600px]">
        {/* Product Title */}
        <h2 className="font-semibold font-primary text-3xl text-zinc-800 dark:text-soft-pink-300">
          {product.title}
        </h2>

        {/* Price and Stock Information */}
        <div className="flex items-center gap-4 mb-4">
          <div className="mt-4 flex items-baseline">
            {/* Original price (crossed out if discounted) */}
            {discounted && (
              <span className="text-3xl text-zinc-300 font-bold line-through">
                {discounted.number}
              </span>
            )}

            {/* Current price with currency symbol */}
            <span className="text-3xl font-primary font-bold text-zinc-800 flex items-baseline gap-1">
              <span>{current.number}</span>
              <span className="text-xl">{current.symbol}</span>
            </span>
          </div>

          {/* Stock quantity indicator */}
          <div className="flex items-center gap-1 bg-zinc-100 py-1.5 px-3 rounded-3xl mt-2">
            <Package className="size-5 text-zinc-600" />
            <div className="flex items-center gap-1 font-medium font-primary text-sm">
              <span>{product.quantity}</span>
              <p>left in stock</p>
            </div>
          </div>
        </div>

        {/* Product Rating */}
        <div className="flex items-center gap-2 border-y border-zinc-100 py-4">
          <span>
            <Star fill="#FFA500" className="text-[#FFA500]" />
          </span>
          <p className="font-primary font-normal">
            Rating: <span className="font-semibold mx-0.5 font-md">{product.rateAvg}/5</span>{" "}
            <span className="font-semibold text-blue-600">{`(${product.rateCount} ratings)`}</span>
          </p>
        </div>

        {/* Product Description */}
        <ScrollArea className="h-32 rounded-md border-none mt-4 flex-1">
          <p className="text-zinc-600 leading-relaxed">{product.description}</p>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="mt-auto pt-4">
          {product.quantity > 0 ? (
            // In stock - show both wishlist and cart buttons
            <div className="flex gap-4 items-center">
              <div className="">
                <AddToWishlist productId={product._id} check={payload} />
              </div>
              <div className="flex-1">
                <AddToCartButton productId={product._id} isLoggedIn={isLoggedIn} />
              </div>
            </div>
          ) : (
            // Out of stock - show only wishlist button (extended)
            <div className="">
              <AddToWishlist extend productId={product._id} check={payload} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
