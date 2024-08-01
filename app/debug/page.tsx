import React from "react";

export const {
  NEXT_PUBLIC_ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID,
} = process.env;

const Debug = () => {
  return (
    <div>
      <h1>Environment Variables</h1>
      <p>NEXT_PUBLIC_ENDPOINT: {NEXT_PUBLIC_ENDPOINT}</p>
      <p>PROJECT_ID: {PROJECT_ID}</p>
      <p>API_KEY: {API_KEY}</p>
    </div>
  );
};

export default Debug;
