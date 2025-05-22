import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

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
