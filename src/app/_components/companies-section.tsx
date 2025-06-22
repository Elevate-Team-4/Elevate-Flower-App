import Image from "next/image";

export default function CompaniesSection() {
  return (
    <section className="max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-20 mx-auto">
      <div className="bg-[#FBEAEA] rounded-3xl w-full min-h-56 px-6 flex flex-col items-center justify-center">
        <h2 className="font-bold font-Sarabun text-maroon-700 text-4xl">
          Trusted by over<span className="text-soft-pink-500"> 4.5k+ </span>
          companies
        </h2>
        <div className="flex items-center justify-between flex-wrap w-full mt-10">
          <Image src={"/assets/Images/companie-1.png"} alt="companie" width={150} height={30} />
          <Image src={"/assets/Images/companie-2.png"} alt="companie" width={150} height={30} />
          <Image src={"/assets/Images/companie-3.png"} alt="companie" width={150} height={30} />
          <Image src={"/assets/Images/companie-4.png"} alt="companie" width={150} height={30} />
          <Image src={"/assets/Images/companie-5.png"} alt="companie" width={150} height={30} />
          <Image src={"/assets/Images/companie-6.png"} alt="companie" width={150} height={30} />
        </div>
      </div>
    </section>
  );
}
