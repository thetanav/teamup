import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { and, eq, ilike, or } from "drizzle-orm";
import { users } from "@/server/db/schema";
import Link from "next/link";
import {
  sanitizeSearchParam,
  parseSkills,
  buildSearchSummary,
  generateSmartSuggestions,
  isSearchTooSpecific,
} from "@/lib/utils";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { city, college, course, skills, q } = await searchParams;

  // Build search conditions dynamically based on provided parameters
  const searchConditions = [];

  // Handle universal search parameter 'q'
  const universalQuery = sanitizeSearchParam(q);
  if (universalQuery) {
    // Search across all fields with the universal query
    searchConditions.push(
      or(
        ilike(users.college, `%${universalQuery}%`),
        ilike(users.city, `%${universalQuery}%`),
        ilike(users.skills, `%${universalQuery}%`),
      ),
    );
  } else {
    // Handle specific field searches
    const sanitizedCollege = sanitizeSearchParam(college);
    const sanitizedCity = sanitizeSearchParam(city);
    const sanitizedCourse = sanitizeSearchParam(course);
    const skillList = parseSkills(skills);

    if (sanitizedCollege) {
      searchConditions.push(ilike(users.college, `%${sanitizedCollege}%`));
    }

    if (sanitizedCity) {
      searchConditions.push(ilike(users.city, `%${sanitizedCity}%`));
    }

    if (sanitizedCourse) {
      searchConditions.push(ilike(users.course, `%${sanitizedCourse}%`));
    }

    if (skillList.length > 0) {
      const skillConditions = skillList.map((skill) =>
        ilike(users.skills, `%${skill}%`),
      );
      searchConditions.push(or(...skillConditions));
    }
  }

  // If no search parameters provided, show all available users
  const whereCondition =
    searchConditions.length > 0
      ? and(or(...searchConditions), eq(users.available, true))
      : eq(users.available, true);

  const usrs = await db.select().from(users).where(whereCondition).limit(10);

  const hasActiveSearch =
    universalQuery ||
    sanitizeSearchParam(college) ||
    sanitizeSearchParam(city) ||
    sanitizeSearchParam(course) ||
    parseSkills(skills).length > 0;

  const smartSuggestions = generateSmartSuggestions({
    college,
    city,
    course,
    skills,
  });

  const searchTooSpecific = isSearchTooSpecific({
    college,
    city,
    course,
    skills,
  });

  return (
    <main className="bg-background flex min-h-[80vh] px-4 py-12">
      <aside className="hidden w-full max-w-sm pr-8 md:block">
        <div className="sticky top-24 flex flex-col gap-6">
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="mb-2 text-xl font-semibold">Advanced Search</h2>
            <form method="GET" className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Course</label>
                <Input
                  name="course"
                  type="text"
                  placeholder="e.g. Computer Science"
                  defaultValue={course}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Skills (separated by commas)
                </label>
                <Input
                  name="skills"
                  type="text"
                  placeholder="e.g. React, Python"
                  defaultValue={skills}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  College
                </label>
                <Input
                  name="college"
                  type="text"
                  placeholder="e.g. IIT Delhi"
                  defaultValue={college}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">City</label>
                <Input
                  name="city"
                  type="text"
                  placeholder="e.g. Mumbai"
                  defaultValue={city}
                />
              </div>
              <Button className="mt-2 w-full" type="submit">
                Apply Filters
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex flex-1 flex-col items-center">
        <div className="mx-auto mb-8 flex w-full max-w-3xl flex-col gap-4">
          {/* Mobile Advanced Search */}
          <div className="mb-4 md:hidden">
            <details className="bg-card rounded-lg border shadow">
              <summary className="cursor-pointer p-4 text-sm font-medium">
                🔍 Advanced Search Options
              </summary>
              <div className="border-t p-4 pt-0">
                <form method="GET" className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium">
                        College
                      </label>
                      <Input
                        name="college"
                        type="text"
                        placeholder="IIT Delhi"
                        defaultValue={college}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium">
                        City
                      </label>
                      <Input
                        name="city"
                        type="text"
                        placeholder="e.g. Mumbai"
                        defaultValue={city}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">
                      Course
                    </label>
                    <Input
                      name="course"
                      type="text"
                      placeholder="Computer Science"
                      defaultValue={course}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">
                      Skills
                    </label>
                    <Input
                      name="skills"
                      type="text"
                      placeholder="React, Python, etc."
                      defaultValue={skills}
                    />
                  </div>
                  <Button type="submit" size="sm" className="w-full">
                    Search
                  </Button>
                </form>
              </div>
            </details>
          </div>

          {/* Quick Search */}
          <form method="GET" className="flex w-full items-center gap-2">
            <Input
              name="q"
              type="text"
              placeholder="Search teammates..."
              className="flex-1"
              defaultValue={q}
            />
            <Button type="submit">Search</Button>
          </form>

          {/* Active filters display */}
          {(universalQuery || college || city || course || skills) && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">Active filters:</span>
              {universalQuery && (
                <span className="bg-primary/10 text-primary rounded-md px-2 py-1">
                  Search: {universalQuery}
                </span>
              )}
              {college && (
                <span className="bg-primary/10 text-primary rounded-md px-2 py-1">
                  College: {college}
                </span>
              )}
              {city && (
                <span className="bg-primary/10 text-primary rounded-md px-2 py-1">
                  City: {city}
                </span>
              )}
              {course && (
                <span className="bg-primary/10 text-primary rounded-md px-2 py-1">
                  Course: {course}
                </span>
              )}
              {skills && (
                <span className="bg-primary/10 text-primary rounded-md px-2 py-1">
                  Skills: {skills}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-6 px-2 text-xs"
              >
                <Link href="/search">Clear all</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Search results */}
        <div className="mx-auto flex min-h-[300px] w-full max-w-3xl flex-col overflow-y-auto">
          {usrs && usrs.length > 0 ? (
            <>
              <div className="mb-4 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Found {usrs.length} teammate{usrs.length !== 1 ? "s" : ""}
                  </h2>
                  <span className="text-muted-foreground text-sm">
                    {usrs.length >= 10 ? "Showing first 10 results" : ""}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {buildSearchSummary({ college, city, course, skills, q })}
                </p>
              </div>
              <ul className="flex w-full flex-col gap-3">
                {usrs.map((usr, index) => (
                  <Link key={usr.id} href={`/profile/${usr.id}`}>
                    <li className="group hover:bg-muted flex w-full cursor-pointer gap-3 rounded-lg border p-4 transition-all">
                      <div className="relative h-fit">
                        <img
                          src={
                            usr.image ?? "https://avatar.vercel.sh/" + usr.email
                          }
                          className="h-12 w-12 rounded-full"
                          alt={usr.name || "User avatar"}
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">{usr.name}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {usr.college && (
                            <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                              🎓 {usr.college}
                            </span>
                          )}
                          {usr.course && (
                            <span className="rounded-md bg-green-50 px-2 py-1 text-green-700 dark:bg-green-950 dark:text-green-300">
                              📚 {usr.course}
                            </span>
                          )}
                          {usr.city && (
                            <span className="rounded-md bg-purple-50 px-2 py-1 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                              📍 {usr.city}
                            </span>
                          )}
                        </div>
                        {usr.skills && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {usr.skills
                              .split(",")
                              .slice(0, 5)
                              .map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="rounded-md bg-orange-50 px-2 py-1 text-xs text-orange-700 dark:bg-orange-950 dark:text-orange-300"
                                >
                                  {skill.trim()}
                                </span>
                              ))}
                            {usr.skills.split(",").length > 4 && (
                              <span className="text-muted-foreground px-2 py-1 text-xs">
                                +{usr.skills.split(",").length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="mb-4 text-6xl">🔍</span>
              <h3 className="mb-2 text-lg font-semibold">No teammates found</h3>
              <p className="text-muted-foreground mb-4 max-w-sm text-sm">
                {searchTooSpecific
                  ? "Your search might be too specific. Try broadening your criteria."
                  : "Try adjusting your search filters or check back later as more people join TeamUp!"}
              </p>

              {/* Smart suggestions */}
              {smartSuggestions.length > 0 && (
                <div className="mb-4 w-full max-w-sm">
                  <p className="text-muted-foreground mb-2 text-xs font-medium">
                    Try these suggestions:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {smartSuggestions.map((suggestion, index) => (
                      <Link
                        key={index}
                        href={suggestion.href}
                        className="hover:bg-primary/20 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs transition-colors"
                      >
                        {suggestion.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {(universalQuery || college || city || course || skills) && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/search">Clear all filters</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Sponsored Content */}
      <aside className="hidden w-full max-w-sm pr-8 xl:block">
        <div className="sticky top-24 flex flex-col gap-6">
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="mb-2 text-xl font-semibold">Updates</h2>
            <div className="text-muted-foreground flex min-h-72 justify-center">
              no updates tell now
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
