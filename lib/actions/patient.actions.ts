"use server";

import { ID, Query } from "node-appwrite";
import {
  DATABASE_ID,
  databases,
  NEXT_PUBLIC_BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

/* eslint-disable-next-line no-undef */
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

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error("An error occurred while fetching user:", error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(
        NEXT_PUBLIC_BUCKET_ID!,
        ID.unique(),
        inputFile
      );

      console.log({
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
      });

      const newPatient = await databases.createDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        ID.unique(),
        {
          identificationDocumentId: file?.$id || null,
          identificationDocumentUrl: `${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
          ...patient,
        }
      );

      return parseStringify(newPatient);
    }
  } catch (error) {
    console.log(error);
  }
};
