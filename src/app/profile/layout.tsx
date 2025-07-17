import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session?.user.name) return children;

  redirect("/");
}