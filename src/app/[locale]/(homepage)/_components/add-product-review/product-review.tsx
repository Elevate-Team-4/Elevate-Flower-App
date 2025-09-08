"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";
import ProductReviewSkeleton from "@/components/skeletons/product-reviews/product-review.skeleton";
import { useFetchProductReview } from "../../_hooks/use-fetch-product-review";
import AddProductReviewForm from "./add-product-review-form";
import RateUser from "./rate-user";
import Stars from "./stars";

type ProductReviewProps = {
  productId: string;
  rateAvg: number;
  rateCount: number;
};
export default function ProductReview({ productId, rateCount, rateAvg }: ProductReviewProps) {
  // Translation
  const format = useFormatter();
  const t = useTranslations();

  // Data
  const dummyReviews = [
    {
      _id: "1",
      product: "673e2d1b1159920171828146",
      rating: 3.5,
      title: t("amazing-quality"),
      comment: t("review-1"),
      user: t("mohamed"),
    },
    {
      _id: "2",
      product: "673e2d1b1159920171828146",
      rating: 3.5,
      title: t("lovely-bouquet"),
      comment: t("review-2"),
      user: t("ali"),
    },
    {
      _id: "3",
      product: "673e2d1b1159920171828146",
      rating: 3,
      title: t("okay-experience"),
      comment: t("review-3"),
      user: t("ahmed"),
    },
    {
      _id: "4",
      product: "673e2d1b1159920171828146",
      rating: 2.5,
      title: t("not-what-i-expected"),
      comment: t("review-4"),
      user: t("mahmood"),
    },
    {
      _id: "5",
      product: "673e2d1b1159920171828146",
      rating: 5,
      title: t("perfect-gift"),
      comment: t("review-5"),
      user: t("menna"),
    },
    {
      _id: "6",
      product: "673e2d1b1159920171828146",
      rating: 4,
      title: t("great-service"),
      comment: t("review-6"),
      user: t("alaa"),
    },
    {
      _id: "7",
      product: "673e2d1b1159920171828146",
      rating: 3.5,
      title: t("good-but-could-be-better"),
      comment: t("review-7"),
      user: t("khaled"),
    },
    {
      _id: "8",
      product: "673e2d1b1159920171828146",
      rating: 5,
      title: t("excellent"),
      comment: t("review-8"),
      user: t("tarek"),
    },
    {
      _id: "9",
      product: "673e2d1b1159920171828146",
      rating: 4,
      title: t("very-nice"),
      comment: t("review-9"),
      user: t("yousry"),
    },
    {
      _id: "10",
      product: "673e2d1b1159920171828146",
      rating: 1,
      title: t("disappointed"),
      comment: t("review-10"),
      user: t("merna"),
    },
  ];

  // State
  const [checkLogin, setCheckLogin] = useState(true);
  const [reviews, setReviews] = useState(dummyReviews.slice(0, 1));
  const [hasMore, setHasMore] = useState(true);

  // Functions
  const fetchMoreData = () => {
    if (reviews.length >= dummyReviews.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const nextItems = dummyReviews.slice(reviews.length, reviews.length + 2);
      setReviews((prevReviews) => [...prevReviews, ...nextItems]);
    }, 2000);
  };

  // Hooks
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, payload } =
    useFetchProductReview({ productId });

  return (
    <main>
      <div className="space-y-[10px] my-4">
        {/* Title */}
        <h3 className="relative w-fit text-4xl font-bold text-maroon-700 before:absolute before:bottom-0 before:h-[1px] before:w-[30%] before:bg-maroon-400  after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-1/2 after:w-[60%] after:rounded-e-full after:bg-maroon-100  dark:text-softpink-200 before:dark:bg-maroon-200 after:dark:bg-zinc-700 after:rtl:right-0">
          {t("product-reviews")}
        </h3>
        {/* Product Rating */}
        <div className="space-y-[6px]">
          <h4 className="text-zinc-800 font-semibold text-xl ">{t("general-rating")}</h4>
          <div className="flex gap-1 items-center">
            <span className="font-bold text-2xl">
              {format.number(rateAvg ?? 4.5, "number-base")}
            </span>
            <span className="font-medium text-sm text-zinc-500">
              ({format.number(rateCount ?? 4, "number-base")} {t("rating")})
            </span>
          </div>
          <div className="flex gap-2">
            {/* Ratings */}
            <Stars rating={rateAvg ?? 4.5} />
          </div>
        </div>
      </div>
      <section className="grid grid-cols-2 border-t-2 pt-4 ">
        <div className="col-span-1 border-e-2 p-5 relative  ">
          {/* Check if user or not */}
          {checkLogin || (
            <div className="inset-0 absolute bg-white bg-opacity-50 flex items-center justify-center">
              <p className="font-semibold text-zinc-800 text-base">
                {t("please-login-to-be-able-to-review-the-product")}
              </p>
            </div>
          )}
          {/* AddProduct Form */}
          <AddProductReviewForm productId={productId} setCheckLogin={setCheckLogin} />
        </div>
        {/* Infinite Scroll */}
        <div className="col-span-1  max-h-[367px] overflow-y-scroll  ">
          <InfiniteScroll
            className="space-y-[10px]"
            dataLength={reviews.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<ProductReviewSkeleton />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>{t("no-more-reviews")}</b>
              </p>
            }
          >
            {/* Product Reviews */}
            {reviews.map((review) => (
              <section className="p-5 space-y-[10px]" key={review._id}>
                <RateUser rating={review.rating} user={review.user} />
                <section className="space-y-[6px]">
                  <h6 className="text-base font-semibold text-black">{review.title}</h6>
                  <p className="h-32  overflow-y-scroll border-b-2 py-1">{review.comment}</p>
                </section>
                <RateUser rating={review.rating} user={review.user} />
              </section>
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </main>
  );
}
