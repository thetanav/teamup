import Auth from "@/components/auth";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex h-14 w-full items-center justify-between border-b bg-transparent px-6 backdrop-blur-md">
      <Link href="/">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="teamupp"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <span className="text-xl font-bold tracking-tight select-none">
            teamupp
          </span>
        </div>
      </Link>
      <div className="text-muted-foreground flex gap-5 text-sm">
        <Link href="/search" className="hover:underline">
          Search
        </Link>
        <Link href="/teams" className="hover:underline">
          Teams
        </Link>
        <Link href="/ideas" className="hover:underline">
          Ideas
        </Link>
      </div>
      <div className="flex items-center">
        <Auth minimal />
      </div>
    </nav>
  );
}
