import React from "react";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { ArrowBigUp, ArrowBigUpIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = (await db.select().from(users).where(eq(users.id, id)))[0];

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-muted-foreground text-center text-lg">
          Profile not found.
        </div>
      </div>
    );
  }

  return (
    <main className="bg-background flex min-h-[60vh] items-center justify-center px-5">
      <section className="flex w-full max-w-2xl flex-col items-start gap-8 py-16 sm:flex-row">
        <img
          src={user.image ?? `https://avatar.vercel.sh/${user.email}`}
          alt="Profile Icon"
          className="border-border bg-muted h-28 w-28 flex-shrink-0 rounded-full border-2 object-cover"
        />
        <div className="flex w-full flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-foreground text-2xl leading-tight font-semibold">
                {user.name}
              </h1>
              {user.college && (
                <span className="text-muted-foreground text-base">
                  🎓 {user.college}
                </span>
              )}
            </div>
            <div>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon">
                    <ArrowBigUpIcon className="text-md h-16 w-16 fill-current stroke-0" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upvote</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              📚{" "}
              <span className="text-foreground font-medium">{user.course}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              🏙️{" "}
              <span className="text-foreground font-medium">{user.city}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              {user.available ? "🟢 Available" : "🔴 Not available"}
            </div>
            {user.email && (
              <div className="text-muted-foreground flex items-center gap-1 text-sm">
                ✉️{" "}
                <a
                  href={`mailto:${user.email}`}
                  className="text-foreground hover:text-primary underline underline-offset-2 transition-colors"
                >
                  {user.email}
                </a>
              </div>
            )}
          </div>
          {user.skills && (
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground mb-1 text-xs">
                🛠️ Skills
              </span>
              <div className="flex flex-wrap gap-2">
                {user.skills.split(",").map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="bg-muted text-foreground rounded-full px-3 py-1 text-xs font-normal"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          {user.bio && (
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground mb-1 text-xs">💬 Bio</span>
              <div
                className="bg-muted text-foreground border-border prose max-w-lg rounded-2xl border px-5 py-3 text-sm shadow-sm"
                style={{ whiteSpace: "pre-line" }}
              >
                {user.bio}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
