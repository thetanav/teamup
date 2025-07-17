import { auth } from "@/server/auth";
import Auth from "@/components/auth";

export default async function HomePage() {
  return (
    <main>
      <h1>Welcome to TeamUp!</h1>
      <p>Start your journey by creating a team or joining an existing one.</p>
      <Auth />
    </main>
  );
}
