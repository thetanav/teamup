import Auth from "@/components/auth";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full h-14 px-6 border-b bg-transparent backdrop-blur-md">
      <div className="flex items-center">
        <Link href="/">
        <span className="text-xl font-bold tracking-tight select-none">TeamUp</span>
        </Link>
      </div>
      <div className="flex items-center">
        <Auth minimal />
      </div>
    </nav>
  );
}