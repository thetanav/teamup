import { SignUp } from "@/components/sign-up";
import { auth } from "@/server/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <main>
      <h1>Welcome to TeamUp!</h1>
      <p>Start your journey by creating a team or joining an existing one.</p>
      <SignUp />
      {session && (
        <div>
          <p>You are logged in</p>
          <div>
            <img src={"https://avatar.vercel.sh/" + session.user.id} />
            <h2>{session.user.email}</h2>
          </div>
        </div>
      )}
    </main>
  );
}
