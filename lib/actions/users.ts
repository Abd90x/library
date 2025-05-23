"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  try {
    const response = await db.select().from(users);
    if (response.length > 0) {
      return {
        success: true,
        message: "Users loaded successfully",
        data: response,
      };
    } else
      return {
        success: false,
        message: "No users found",
      };
  } catch (error) {
    return {
      success: false,
      message: "Failed to load users",
    };
  }
};

export const updateUser = async (id: string, data: Partial<IUser>) => {
  try {
    let canChangeRole: IUser[] = [];

    if (data.role && data.role !== "ADMIN")
      canChangeRole = await db
        .select()
        .from(users)
        .where(eq(users.role, "ADMIN"));

    if (canChangeRole.length === 1) {
      return {
        success: false,
        message: "Sholud at least one admin exist",
      };
    }

    const response = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    if (response.length > 0) {
      return {
        success: true,
        message: "User updated successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to update user",
    };
  }
};
