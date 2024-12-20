import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({ onPromptClick }) => {
    const prompts = [
        "Who is head of Aston martin F! academy Team?",
        "Who is the current F1 world drivers champion?",
        "Who is highest paid F1 driver?",
        "Who is the fastest F1 driver?",
        "Who won F1 Constructors championship This year?",
    ];

    return (
        <>
            <div className="prompt-suggestion-row">
                {prompts.map((prompt, index) => (
                    <PromptSuggestionButton
                        key={`suggestion-${index}`}
                        text={prompt}
                        onClick={() => onPromptClick(prompt)}
                    />
                ))}
            </div>
        </>
    );
};

export default PromptSuggestionRow;
