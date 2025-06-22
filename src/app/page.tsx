import AboutUs from "./_components/about-us-sectoin";
import Companie from "./_components/companie-sectoin";
import Gallery from "./_components/gallery-sectoin";

export default function Home() {
  return (
    <main className="py-10">
      {/*About sectoin*/}
      <AboutUs />

      {/*Gallery sectoin*/}
      <Gallery />

      {/*Companie sectoin*/}
      <Companie />
    </main>
  );
}
