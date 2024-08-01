"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log({ newUser });
    return newUser; // Make sure to return the new user
  } catch (error: any) {
    if (error.code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);
      if (documents.total > 0) {
        return documents.users[0]; // Return the first matched user
      }
    }
    console.error("An error occurred while creating a new user:", error);
    throw error;
  }
};
