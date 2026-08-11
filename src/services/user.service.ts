import { db } from "@/db";
import { users } from "@/db/schema/user.schema";
import { eq } from "drizzle-orm";

type CreateUserInput = {
  clerkId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  phone?: string | null;
};

export async function createUser(data: CreateUserInput) {
  const [user] = await db
    .insert(users)
    .values({
      clerkId: data.clerkId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      imageUrl: data.imageUrl,
      phone: data.phone,
    })
    .onConflictDoNothing({
      target: users.clerkId,
    })
    .returning();

  return user;
}

export async function updateUser(
  clerkId: string,
  data: Partial<Omit<CreateUserInput, "clerkId">>
) {
  const [user] = await db
    .update(users)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(users.clerkId, clerkId))
    .returning();

  return user;
}

export async function deleteUser(clerkId: string) {
  const [user] = await db
    .delete(users)
    .where(eq(users.clerkId, clerkId))
    .returning();

  return user;
}