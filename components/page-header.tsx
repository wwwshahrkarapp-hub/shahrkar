"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";


export default function PageHeader() {
const pathname = usePathname();
  

  return (
    <header
      className="
      relative
      border-b
      border-zinc-800
      p-4
      mb-6
      h-20
      "
    >

      <Link
        href="/"
        className="
        absolute
        right-4
        top-3
        flex
        items-center
        gap-3
        text-white
        font-bold
        "
      >

        <div
          className="
          rounded-xl
          bg-yellow-500
          p-3
          text-black
          "
        >
          <Home size={22}/>
        </div>


        <div>
          <div className="text-xl">
            شهرکار
          </div>

          <div className="text-xs text-zinc-400">
            جستجوی هوشمند شغل
          </div>
        </div>

      </Link>


    </header>
  );
}
