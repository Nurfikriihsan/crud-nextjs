"use server"

import { db } from "@/db/drizzle";
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export async function getUsers() {
    try {
        const result = await db.select().from(users);
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
        await db.insert(users).values(user).returning();
    }
    catch (error) {
        console.error(error);
        return { error: 'Failed to create user' };
    }
}

export async function updateUser(id: string, user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
        await db.update(users).set(user).where(eq(users.id, id));
    }
    catch (error) {
        console.error(error);
        return { error: 'Failed to update user' };
    }
}

export async function deleteUser(id: string) {
    try {
        await db.delete(users).where(eq(users.id, id));
    }
    catch (error) {
        console.error(error);
        return { error: 'Failed to delete user' };
    }
}