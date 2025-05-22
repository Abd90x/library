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

export const updateUserStatus = async (id: string, status: IUser["status"]) => {
  try {
    const response = await db
      .update(users)
      .set({ status })
      .where(eq(users.id, id))
      .returning();

    if (response.length > 0) {
      return {
        success: true,
        message: "User status updated successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to update user status",
    };
  }
};
