import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Auth from "@/components/auth";
import Image from "next/image";
import { auth } from "@/server/auth";
import { Instrument_Serif } from "next/font/google";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400" });

export default async function HomePage() {
  const session = await auth();
  return (
    <main className="bg-background flex min-h-[80vh] flex-col items-center justify-center gap-12 px-4 py-12">
      {/* Hero Section */}
      <section className="my-16 flex max-w-2xl flex-col items-center gap-8 text-center">
        <div>
          <Image
            src="/logo.png"
            alt="teamupp"
            width={150}
            height={150}
            className="rounded-4xl select-none"
            draggable="false"
          />
        </div>
        <h1
          className={
            "mt-2 mb-4 text-5xl leading-tight font-extrabold tracking-tight sm:mb-2 md:text-6xl " +
            serif.className
          }
        >
          Find Your Perfect Team,
          <br />
          <span className="text-primary">From Your College or City</span>
        </h1>
        <p className="text-muted-foreground mb-4 text-lg">
          Teamupp helps you connect with like-minded people from your own
          college or city to build amazing teams for projects, hackathons, and
          more.
        </p>
        {session?.user ? (
          <>
            <form
              action="/search"
              method="GET"
              className="flex w-full flex-col items-center justify-center gap-4"
            >
              <div className="flex w-full max-w-lg gap-2">
                <Input
                  type="text"
                  name="q"
                  placeholder="Search teammates by college, city, course, or skills..."
                  className="flex-1"
                />
                <Button type="submit">Search</Button>
              </div>
            </form>
            <span className="text-muted-foreground mt-1 text-xs">
              Search by anything - we'll find the best matches for you!
            </span>
          </>
        ) : (
          <>
            <Auth minimal />
            <span className="text-muted-foreground text-sm">
              {session?.user
                ? "Great now edit you profile!"
                : "Sign up or log in to start your journey!"}
            </span>
          </>
        )}
      </section>

      {/* Call to Action */}
      {session?.user && (
        <section className="flex flex-col items-center gap-2">
          <Auth minimal />
          <span className="text-muted-foreground text-sm">
            {session.user
              ? "Great now edit your profile!"
              : "Sign up or log in to start your journey!"}
          </span>
        </section>
      )}

      {/* Features Section */}
      <section className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-card flex flex-col items-center rounded-lg border p-6 shadow-sm">
          <span className="mb-2 text-2xl">🎓</span>
          <h3 className="mb-1 font-semibold">Advanced Search</h3>
          <p className="text-muted-foreground text-center text-sm">
            Easily find teammates from your own college or city for better
            collaboration and trust.
          </p>
        </div>
        <div className="bg-card flex flex-col items-center rounded-lg border p-6 shadow-sm">
          <span className="mb-2 text-2xl">🤝</span>
          <h3 className="mb-1 font-semibold">Build or Join Teams</h3>
          <p className="text-muted-foreground text-center text-sm">
            Create your own team or join existing ones for projects, hackathons,
            and more.
          </p>
        </div>
        <div className="bg-card flex flex-col items-center rounded-lg border p-6 shadow-sm">
          <span className="mb-2 text-2xl">🚀</span>
          <h3 className="mb-1 font-semibold">Grow Together</h3>
          <p className="text-muted-foreground text-center text-sm">
            Collaborate, learn, and achieve more with the right teammates by
            your side.
          </p>
        </div>
      </section>
    </main>
  );
}
