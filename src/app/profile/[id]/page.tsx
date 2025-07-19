import React from "react";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const user = (await db.select().from(users).where(eq(users.id, id)))[0];

    if (!user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center text-muted-foreground text-lg">Profile not found.</div>
            </div>
        );
    }

    return (
        <main className="flex min-h-[60vh] items-center justify-center bg-background px-5">
            <section className="w-full max-w-2xl flex flex-col sm:flex-row items-start gap-8 py-16">
                <img
                    src={user.image ?? `https://avatar.vercel.sh/${user.email}`}
                    alt="Profile Icon"
                    className="w-28 h-28 rounded-full object-cover border-2 border-border bg-muted flex-shrink-0"
                />
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold text-foreground leading-tight">{user.name}</h1>
                        {user.college && <span className="text-base text-muted-foreground">🎓 {user.college}</span>}
                    </div>
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            📚 <span className="text-foreground font-medium">{user.course}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            🏙️ <span className="text-foreground font-medium">{user.city}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            {user.available ? "🟢 Available" : "🔴 Not available"}
                        </div>
                        {user.email && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                ✉️ <a href={`mailto:${user.email}`} className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">{user.email}</a>
                            </div>
                        )}
                    </div>
                    {user.skills && (
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground mb-1">🛠️ Skills</span>
                            <div className="flex flex-wrap gap-2">
                                {user.skills.split(',').map((skill: string, i: number) => (
                                    <span key={i} className="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-normal">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    {user.bio && (
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground mb-1">💬 Bio</span>
                            <div className="bg-muted text-foreground text-sm rounded-2xl px-5 py-3 max-w-lg shadow-sm border border-border prose" style={{ whiteSpace: 'pre-line' }}>
                                {user.bio}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}