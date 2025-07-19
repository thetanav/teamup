import Auth from "@/components/auth";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full h-14 px-6 border-b bg-transparent backdrop-blur-md">
      <Link href="/">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="teamupp" width={40} height={40} className="rounded-xl" />
          <span className="text-xl font-bold tracking-tight select-none">teamupp</span>
        </div>
      </Link>
      <div className="flex items-center">
        <Auth minimal />
      </div>
    </nav>
  );
}