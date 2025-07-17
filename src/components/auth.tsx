import { auth, signOut } from "@/server/auth";
import SignUp from "@/components/sign-up";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

interface AuthProps {
  minimal?: boolean;
}

export default async function Auth({ minimal }: AuthProps) {
  const session = await auth();

  if (!session) {
    // Minimal: just the button, not wrapped in a card
    if (minimal) return <SignUp />;
    return (
      <div>
        <SignUp />
      </div>
    );
  }

  if (minimal) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <img
            src={"https://avatar.vercel.sh/" + session.user.email}
            className="h-8 w-8 rounded-full border object-cover cursor-pointer"
            alt="Profile"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 mt-1">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
          <DropdownMenuItem asChild>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="bg-accent flex w-fit items-center justify-center gap-4 rounded-lg border px-4 py-2 select-none">
      <img
        src={"https://avatar.vercel.sh/" + session.user.id}
        className="h-10 w-10 rounded-full"
      />
      <div>
        <h2>{session.user.name ?? "No name"}</h2>
        <p className="opacity-60">{session.user.email}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
          <DropdownMenuItem asChild>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
