import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

// Fetch profile by email
export async function getProfile(email: string) {
    const user = await db.query.users.findFirst({
        where: (u, { eq }) => eq(u.email, email),
    });

    return {
        name: user?.name,
        college: user?.college,
        course: user?.course,
        session: user?.session,
        bio: user?.bio,
        skills: user?.skills,
    };
}

// Update profile by email
export async function updateProfile(email: string, data: any) {
    const updated = await db.update(users)
        .set(data)
        .where(eq(users.email, email))
        .returning({
            name: users.name,
            college: users.college,
            course: users.course,
            session: users.session,
            bio: users.bio,
            skills: users.skills,
        })
    return updated[0]
} 