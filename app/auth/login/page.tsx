"use client";

import { OAuthProvider } from "appwrite";
import { newAccount } from "../../lib/ApiHelper";
import "./login.css";

export default function LoginPage() {
    const initiateLogin = async () => {
        try {
            await newAccount.createOAuth2Session(
                "google" as OAuthProvider,
                "http://localhost:3000/",
                "https://localhost:3000/auth/callback"
            );
        } catch (error) {
            console.error("Error occurred while logging in:", error);
        }
    };

    return (
        <div className="login-window">
            <h1>Login to F1 GPT</h1>
            <button
                type="button"
                onClick={initiateLogin}
            >
                Sign in with Google...
            </button>
        </div>
    );
}
