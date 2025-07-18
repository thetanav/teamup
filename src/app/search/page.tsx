import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { and, eq, ilike, or } from "drizzle-orm";
import { users } from "@/server/db/schema";
import Link from "next/link";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const { city, college, course, skills } = await searchParams;

    const usrs = await db.select().from(users).where(
        and(
            or(
                ilike(users.college, `%${college}%`),
                ilike(users.city, `%${city}%`),
                ilike(users.skills, `%${skills}%`),
                ilike(users.course, `%${course}%`)
            ),
            eq(users.available, true)
        ),
    ).limit(10);

    return (
        <main className="flex min-h-[80vh] px-4 py-12 bg-background">
            <aside className="w-full max-w-xs pr-8 hidden md:block">
                <div className="sticky top-24 flex flex-col gap-6 bg-card p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Advanced Search</h2>
                    <form method="GET" className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Course</label>
                            <Input name="course" type="text" placeholder="e.g. Computer Science" defaultValue={course} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Skills (separated by commas)</label>
                            <Input name="skills" type="text" placeholder="e.g. React, Python" defaultValue={skills} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">College</label>
                            <Input name="college" type="text" placeholder="e.g. IIT Delhi" defaultValue={college} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">City</label>
                            <Input name="city" type="text" placeholder="e.g. Mumbai" defaultValue={city} />
                        </div>
                        <Button className="mt-2 w-full" type="submit">Apply Filters</Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <section className="flex-1 flex flex-col items-center">
                <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-2">Search for your team</h1>
                    <form method="GET" className="w-full flex gap-2 items-center">
                        <Input name="college" type="text" placeholder="Search by college or city..." className="flex-1" defaultValue={college} />
                        <Input name="city" type="text" placeholder="City" className="flex-1" defaultValue={city} />
                        <Button type="submit">Search</Button>
                    </form>
                </div>
                {/* Placeholder for search results */}
                <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow p-8 flex flex-col min-h-[300px] overflow-y-auto">
                    {usrs && usrs.length > 0 ? (
                        <ul className="flex flex-col gap-2 w-full">
                            {usrs.map((usr) => (
                                <Link key={usr.id} href={`/profile/${usr.id}`}>
                                    <li className="flex gap-2 w-full p-2 rounded border hover:bg-muted cursor-pointer transition-color">
                                        <img src={usr.image ?? "https://avatar.vercel.sh/" + usr.email} className="w-10 h-10 rounded-full" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium font-bold">{usr.name}</span>
                                            <span className="text-xs text-muted-foreground">College: {usr.college}</span>
                                            <span className="text-xs text-muted-foreground">Course: {usr.course}</span>
                                            <span className="text-xs text-muted-foreground">Skills: {usr.skills}</span>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-muted-foreground">(No results found)</span>
                    )}
                </div>
            </section>
        </main>
    );
}