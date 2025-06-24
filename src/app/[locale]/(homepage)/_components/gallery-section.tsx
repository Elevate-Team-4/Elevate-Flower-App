import Image from "next/image";
import BarTitle from "@/components/common/bar-title";

export default function Gallery() {
  return (
    <section>
      <div className="flex justify-center items-center flex-col pb pt-32">
        <h2 className="font-bold leading-8 tracking-title align-middle uppercase text-soft-pink-500">
          Gallery
        </h2>
        <BarTitle
          title="Check Out our Wonderful Gallery"
          highlightBarWidth="w-auto"
          mainBarWidth="w-3/4"
        />
      </div>
      <div className="max-w-screen-2xl pt-11 px-4 sm:px-6 md:px-12 lg:px-20 mx-auto">
        <div className="grid grid-cols-12 grid-rows-12 gap-3">
          {/* Left Column - Tall image with gift boxes */}
          <div className="col-span-4 row-span-6">
            <Image
              src="/assets/Images/gallery-1.png"
              alt="Wedding and celebration gift boxes"
              width={420}
              height={620}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Top Middle - Red gift boxes */}
          <div className="col-span-4 row-span-4">
            <Image
              src="/assets/Images/gallery-2.png"
              alt="Red gift boxes with ribbons"
              width={420}
              height={410}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Top Right - Engagement ring with flowers */}
          <div className="col-span-4 row-span-4">
            <Image
              src="/assets/Images/gallery-3.png"
              alt="Engagement ring with white roses and daisies"
              width={420}
              height={410}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Bottom Left - Heart-shaped chocolate box */}
          <div className="col-span-4 row-span-6">
            <Image
              src="/assets/Images/gallery-6.png"
              alt="Heart-shaped chocolate box with pink roses"
              width={420}
              height={620}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Bottom Middle - Ring with yellow roses */}
          <div className="col-span-4 row-span-6">
            <Image
              src="/assets/Images/gallery-5.png"
              alt="Engagement ring with yellow and white roses"
              width={420}
              height={620}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Bottom Right - Engagement card and ring */}
          <div className="col-span-4 row-span-4">
            <Image
              src="/assets/Images/gallery-4.png"
              alt="Congratulations engagement card with ring"
              width={420}
              height={410}
              className="w-full h-full object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
