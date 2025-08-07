import { Timestamp } from "firebase/firestore";

export interface Auth {
  uid: string;
  photoURL?: string;
  email: string;
  coverURL?: string;
  displayName: string;
  phoneNumber: string;
  role: "admin" | "user" | "superadmin";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expireAt: Timestamp;
  isActive: "true" | "false";
  isVerified: "true" | "false";
}
