import "./global.css";

export const metadata = {
    title: "F1 GPT",
    description: "Place to answer all of our formula 1 questions",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
