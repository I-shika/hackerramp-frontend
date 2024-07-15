'use client'
import Image from "next/image";
import Navbar from "@/Components/navbar";
import Profile from "@/Components/profile";
import { useSearchParams } from 'next/navigation';
export default function GenProfile() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  return (
    <main>
      <div>
      <Navbar/>
      {userId && <Profile userid={userId} />}
     </div>
    </main>
  );
}
