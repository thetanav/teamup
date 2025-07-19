import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full h-[70vh] items-center justify-center bg-background px-5 items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center max-w-2xl">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-2">404</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Page not found.
            </p>
            <Button variant="default" size="lg" asChild>
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </div>
    </div>
  );
}