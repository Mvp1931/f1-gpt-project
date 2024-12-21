import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { newAccount } from "../../lib/ApiHelper"; // Import Appwrite client setup

export default function CallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const user = await newAccount.get();
                console.log("User logged in successfully:", user);
                router.push("/"); // Redirect to the main page
            } catch (error) {
                console.error("Error during callback:", error);
                router.push("/auth/login"); // Redirect to login on error
            }
        };

        handleAuthCallback();
    }, [router]);

    return <p>Processing login, please wait...</p>;
}
