import { createUserWithEmailAndPassword, signOut as firebaseSignOut, sendPasswordResetEmail, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth";

import {
    doc,
    serverTimestamp,
    setDoc,
    Timestamp,
} from "firebase/firestore";

import React, { createContext, useContext, useEffect, useState } from "react";

import { Auth as AuthAccount } from "../../interface/Auth";

import {
    auth,
    db,
    onAuthStateChanged
} from "../firebase/Firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<UserCredential | void>;
    signUp: (email: string, password: string, displayName: string, phoneNumber: string) => Promise<UserCredential | void>;
    signOut: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    verificationRequired: boolean;
    verificationSuccess: boolean;
    setVerificationRequired: (value: boolean) => void;
    verifyUser: (uid: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Tambahkan helper untuk format nomor telepon ke +62
function formatPhoneNumber(phone: string): string {
    let p = phone.replace(/[^0-9]/g, '');
    if (p.startsWith('0')) {
        p = '62' + p.slice(1);
    }
    if (!p.startsWith('62')) {
        p = '62' + p;
    }
    return '+' + p;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [verificationRequired, setVerificationRequired] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);

    useEffect(() => {
        // Listen to Firebase Auth state
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
            setError(null);
        });
        return () => unsubscribe();
    }, []);

    // Create Firestore account document
    const createAccount = async (
        userCredential: UserCredential,
        displayName: string,
        phoneNumber: string
    ) => {
        const { user } = userCredential;
        const expireAt = Timestamp.fromDate(
            new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        ); // 3 hari dari sekarang
        const formattedPhone = phoneNumber ? formatPhoneNumber(phoneNumber) : "";
        const data: AuthAccount = {
            uid: user.uid,
            photoURL: user.photoURL || "",
            email: user.email || "",
            displayName,
            phoneNumber: formattedPhone,
            role: "user",
            createdAt: serverTimestamp() as any,
            updatedAt: serverTimestamp() as any,
            isActive: "true",
            isVerified: "false",
            expireAt,
        };
        await setDoc(doc(db, "accounts", user.uid), data);
    };

    const handleSignIn = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            setUser(cred.user);
            return cred;
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (email: string, password: string, displayName: string, phoneNumber: string) => {
        setLoading(true);
        setError(null);
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            // Format phone number before saving
            await createAccount(cred, displayName, phoneNumber);
            await firebaseSignOut(auth);
            setUser(null);
            setVerificationRequired(true);
            setVerificationSuccess(false);
            return cred;
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        setError(null);
        try {
            await firebaseSignOut(auth);
            setUser(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const verifyUser = async (uid: string) => {
        setLoading(true);
        setError(null);
        try {
            const userDoc = doc(db, "accounts", uid);
            await setDoc(userDoc, { isVerified: "true" }, { merge: true });
            setVerificationSuccess(true);
            setVerificationRequired(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, error, signIn: handleSignIn, signUp: handleSignUp, signOut: handleSignOut, forgotPassword, verificationRequired, verificationSuccess, setVerificationRequired, verifyUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
