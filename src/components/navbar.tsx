import Auth from "@/components/auth";
import { LightbulbIcon, SearchIcon, RadioTowerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full items-center border-b bg-transparent px-6">
      <div className="mx-auto flex w-3xl justify-between">
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="teamupp"
              width={40}
              height={40}
              className="rounded-xl"
            />
          </div>
        </Link>
        <div className="text-muted-foreground flex gap-12 text-sm">
          <Link href="/search" className="hover:text-foreground transition">
            <div className="flex flex-col items-center">
              <SearchIcon className="h-5 w-5" />
              <p className="mt-1 text-xs">Search</p>
            </div>
          </Link>
          <Link href="/social" className="hover:text-foreground transition">
            <div className="flex flex-col items-center">
              <RadioTowerIcon className="h-5 w-5" />
              <p className="mt-1 text-xs">Social</p>
            </div>
          </Link>
          <Link href="/ideas" className="hover:text-foreground transition">
            <div className="flex flex-col items-center">
              <LightbulbIcon className="h-5 w-5" />
              <p className="mt-1 text-xs">Ideas</p>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <Auth minimal />
        </div>
      </div>
    </nav>
  );
}
