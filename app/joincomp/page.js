import Image from "next/image";
import Navbar from "@/Components/navbar";
import JoinCompetition from "@/Components/joinCompetition";
export default function joincomp() {
    
  return (
    <main>
      <div>
      <Navbar/>
     <JoinCompetition />
     </div>
    </main>
  );
}