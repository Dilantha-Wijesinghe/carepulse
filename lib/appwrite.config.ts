import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66a912180026e4c9bdfa")
  .setKey(
    "fa39ffb4db4c707ae285ace3f4c23e7881786ae1e2def7787336623089912dae735a8b3cd224463bf2b89e8ecb400d2179a448b0bfb6afd5ec9203619fb5cd066916c3e922fb27388f3531ff63017676b87b45562a767e8baadacb5a3fce7e916d8ce9a8618ce20d4b574d7796df58b3339e1752d04003e0893122f17fa9a9c9"
  );

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
