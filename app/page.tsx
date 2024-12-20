"use client";

import Image from "next/image";
import F1GPT_Logo from "./assets/f1gpt_logo.png";
import { useChat } from "ai/react";
import { Message } from "ai";

import Bubble from "./components/Bubble";
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionRow from "./components/PromptSuggestionRow";

const Home = () => {
    const {
        append,
        isLoading,
        messages,
        input,
        handleInputChange,
        handleSubmit,
    } = useChat();

    const noMessages = !messages || messages.length === 0;

    const handlePrompt = (promptText) => {
        const message: Message = {
            id: crypto.randomUUID(),
            content: promptText,
            role: "user",
        };
        append(message);
    };

    return (
        <main>
            <div className="headImage">
                <Image
                    src={F1GPT_Logo}
                    alt="f1-gpt logo"
                    width={250}
                ></Image>
            </div>
            <section className={noMessages ? "" : "populated"}>
                {noMessages ? (
                    <>
                        <p className="starter-text">
                            Ultimate Place for formula 1 super fans! ask me
                            anything about f1, f1 drivers, f1 teams, f1
                            statistics, f1 news, etc. We will come up with the
                            best answer for you.
                        </p>
                        <br />
                        <PromptSuggestionRow onPromptClick={handlePrompt} />
                    </>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <Bubble
                                key={`message-${index}`}
                                message={message}
                            />
                        ))}
                        {isLoading && <LoadingBubble />}
                    </>
                )}
            </section>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleInputChange}
                    className="question-box"
                    value={input}
                    placeholder="Ask me something about F1..."
                />
                <input
                    type="submit"
                    value="submit"
                    className="submit-button"
                />
            </form>
        </main>
    );
};

export default Home;
