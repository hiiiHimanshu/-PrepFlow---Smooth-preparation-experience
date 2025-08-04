import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    // Check if all required environment variables are present
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn("Firebase Admin SDK not initialized: Missing required environment variables");
      return null;
    }

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace newlines in the private key
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

const firebaseAdmin = initFirebaseAdmin();

export const auth = firebaseAdmin?.auth;
export const db = firebaseAdmin?.db;
