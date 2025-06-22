import Image from "next/image";

export default function AboutImage() {
  return (
    <div className="relative flex items-start gap-2 mt-5">
      <div className="relative">
        <div className="w-64 h-85 absolute -top-5 -left-5 -rotate-custom-1 rounded-[120px] border-4 border-maroon-600 rounded-tl-[50px] object-cover" />
        <Image
          src="/assets/Images/about-1.png"
          alt="about image"
          width={300}
          height={0}
          className="w-76 h-84 left-7 top-5 rotate-0 rounded-[120px] rounded-tl-[50px] object-cover"
        />
      </div>
      <div className="h-84 flex flex-col gap-2">
        <Image
          src="/assets/Images/about-3.png"
          alt="about image"
          width={300}
          height={0}
          className="size-48 rounded-full object-cover"
        />
        <Image
          src="/assets/Images/about-2.png"
          alt="about image"
          width={300}
          height={0}
          className="w-48 h-36 rounded-s-[50px] rounded-e-[100px] object-cover"
        />
      </div>
    </div>
  );
}
