// React & Next.js
import Image from "next/image";

// Local Components
import ToggleLocale from "@/components/layout/header/components/toggle-locale";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid min-h-svh lg:grid-cols-2 ">
      {/* Left-side form area */}
      <div className="flex flex-col lg:px-20 md:px-16 px-10 xl:px-36 items-center justify-center py-10">
        <div className="self-end pb-10">
          <ToggleLocale />
        </div>
        <>
          {/* Light mode top separator image */}
          <Image
            src="/assets/Images/separator.png"
            alt="Top separator (light mode)"
            width={280}
            height={45}
            className="pb-10 dark:hidden"
          />

          {/* Dark mode top separator image */}
          <Image
            src="/assets/Images/dark-separator.png"
            alt="Top separator (dark mode)"
            width={280}
            height={45}
            className="pb-10 hidden dark:block"
          />

          {children}

          {/* Light mode bottom separator image (rotated) */}
          <Image
            src="/assets/Images/separator.png"
            alt="Bottom separator (light mode)"
            width={280}
            height={45}
            className="rotate-180 pb-10 dark:hidden "
          />

          {/* Dark mode bottom separator image (rotated) */}
          <Image
            src="/assets/Images/dark-separator.png"
            alt="Bottom separator (dark mode)"
            width={280}
            height={45}
            className="rotate-180 pb-10 hidden dark:block"
          />
        </>
      </div>

      <div className=" relative hidden lg:block">
        {/* Right-side full background cover */}
        <Image
          src="/assets/Images/Cover.png"
          alt="Auth page cover"
          width={700}
          height={0}
          className="absolute inset-0 h-full w-full object-cover "
        />
      </div>
    </main>
  );
};

export default AuthLayout;
