import { auth } from "@/server/auth";
import Unauthorized from "@/components/unauthorized";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return <Unauthorized />;
  }

  return <div>{children}</div>;
}
