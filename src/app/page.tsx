import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Auth from "@/components/auth";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 gap-12 bg-background">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-4 text-center max-w-2xl">
        <div>
          <Image src="/logo.png" alt="teamupp" width={150} height={150} className="rounded-2xl select-none" draggable="false" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight sm:mb-2 mb-4">
          Find Your Perfect Team, <span className="text-primary">From Your College or City</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          TeamUp helps you connect with like-minded people from your own college or city to build amazing teams for projects, hackathons, and more.
        </p>
        <form
          action="/search"
          method="GET"
          className="w-full flex gap-2 items-center justify-center"
        >
          <Input
            type="text"
            name="city"
            placeholder="Search by college or city..."
            className="max-w-xs"
          />
          <Button type="submit">Search</Button>
        </form>
        <span className="text-xs text-muted-foreground mt-1">(Search to see magic!)</span>
      </section>

      {/* Call to Action */}
      <section className="flex flex-col items-center gap-2">
        <Auth minimal />
        <span className="text-sm text-muted-foreground">Sign up or log in to start your journey!</span>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
        <div className="bg-card border rounded-lg p-6 flex flex-col items-center shadow-sm">
          <span className="text-2xl mb-2">🎓</span>
          <h3 className="font-semibold mb-1">College & City Based Search</h3>
          <p className="text-sm text-muted-foreground text-center">Easily find teammates from your own college or city for better collaboration and trust.</p>
        </div>
        <div className="bg-card border rounded-lg p-6 flex flex-col items-center shadow-sm">
          <span className="text-2xl mb-2">🤝</span>
          <h3 className="font-semibold mb-1">Build or Join Teams</h3>
          <p className="text-sm text-muted-foreground text-center">Create your own team or join existing ones for projects, hackathons, and more.</p>
        </div>
        <div className="bg-card border rounded-lg p-6 flex flex-col items-center shadow-sm">
          <span className="text-2xl mb-2">🚀</span>
          <h3 className="font-semibold mb-1">Grow Together</h3>
          <p className="text-sm text-muted-foreground text-center">Collaborate, learn, and achieve more with the right teammates by your side.</p>
        </div>
      </section>
    </main>
  );
}
