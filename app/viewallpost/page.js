import Image from "next/image";
import Navbar from "@/Components/navbar";
import Viewallposts from "@/Components/viewallpost";
export default function joincomp() {
    
  return (
    <main>
      <div>
      <Navbar/>
     <Viewallposts />
     </div>
    </main>
  );
}