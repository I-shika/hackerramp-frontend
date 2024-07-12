import Image from "next/image";
import EmblaCarousel from "@/Components/carousel";
import Navbar from "@/Components/navbar";
import Communityforum from "@/Components/communityforum";
export default function Home() {

  return (
    <main className="maincomponent">
      <Navbar/>
<EmblaCarousel/>
    </main>
  );
}
