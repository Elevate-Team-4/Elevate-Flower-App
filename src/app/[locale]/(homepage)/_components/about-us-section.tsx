import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutImage from "./about-image";

export default function AboutUs() {
  return (
    <section className="max-w-screen-2xl my-14 px-4 sm:px-6 md:px-12 lg:px-20 mx-auto flex items-center gap-12 xl:gap-20">
      <AboutImage />
      <div className="max-w-xl">
        <h3 className="font-bold leading-8 tracking-title align-middle uppercase text-soft-pink-500">
          About
        </h3>
        <p className="mt-6 text-maroon-700 font-bold text-3xl ">
          Delivering the <span className="text-soft-pink-500">Finest</span> Gift Boxes for Your{" "}
          <span className="text-soft-pink-500">Special</span> Moments
        </p>
        <p className="font-Sarabun font-normal text-zinc-500 mt-2">
          Make every moment memorable with our premium gift boxes. Carefully curated and beautifully
          packaged, each box is filled with handpicked items designed to impress. Whether it&#39;s
          for a birthday, wedding, or a simple “thank you,” our gift boxes are crafted to leave a
          lasting impression — because thoughtful gifting starts here.
        </p>
        <Button className="bg-maroon-600 h-10 w-32 mt-6 hover:bg-maroon-600 py-3 px-5 rounded-lg font-Sarabun">
          Discover
          <span>
            <ArrowRight className="ml-1.5" size={16} />
          </span>
        </Button>
        <div className="mt-10 flex items-start gap-6">
          <div className="flex flex-col gap-5 items-start pl-2.5">
            <div className=" font-Sarabun text-zinc-800 flex items-center gap-5">
              <Check />
              Competitive Prices & Easy Shopping
            </div>
            <div className=" font-Sarabun text-zinc-800 flex items-center gap-5">
              <Check />
              Perfect for Every Occasion
            </div>
          </div>
          <div className="flex flex-col gap-5 items-start pl-2.5 ">
            <div className=" font-Sarabun text-zinc-800 flex items-center gap-5">
              <Check />
              Premium Quality & Elegant Packaging
            </div>
            <div className=" font-Sarabun text-zinc-800 flex items-center gap-5">
              <Check />
              Fast & Reliable Delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
