import { DataAPIClient } from "@datastax/astra-db-ts";
import { embed, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { console } from "inspector";

const {
    ASTRA_DB_NAMESPACE,
    ASTRA_DB_COLLECTION1,
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN,
    OPENAI_API_KEY,
} = process.env as Record<string, string>;

const openai = createOpenAI({
    apiKey: OPENAI_API_KEY,
});

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);

const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export async function POST(request: Request) {
    const { messages } = await request.json();
    const latestMessage = messages[messages.length - 1]?.content;

    let docContext = "";

    // const embedding = await openai.embeddings.create({
    //     model: "text-embedding-3-small",
    //     input: latestMessage,
    //     encoding_format: "float",
    // });

    const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: latestMessage,
        maxRetries: 3,
    });

    try {
        const collection = db.collection(ASTRA_DB_COLLECTION1);
        const cursorResult = collection.find({
            sort: {
                $vector: embedding,
            },
            limit: 5,
        });

        const documents = await cursorResult.toArray();
        const docsMap = documents?.map((doc) => doc.text);
        docContext = JSON.stringify(docsMap);
    } catch (error) {
        console.error("Error querying database...", error);
        docContext = "";
    }

    const systemMessage = {
        role: "system",
        content: `You are an AI Assistant who knows everything about Formula one. Use below context to augment what you know about Formula one racing.the context will provide you with most recent page data from wikipedia, official Formula 1 website and others. If the context does not include the information you need, you need to answer the question based on your existing knowledge. Please do not mention the context source in the answer If you don't know the answer to a question, Please find answers from your existing knowledge. Do not make up answers. If you are unsure and the question is not answered here, please ask the user. Also, please format Answers with MarkDown formatting and Do Not Include Images in the response.
        ------
        Start Context
        Context: ${docContext}
        END Context
        ------
        `,
    };

    console.log(docContext);

    const userMessage = {
        role: "user",
        content: latestMessage,
    };

    try {
        const modelResponse = streamText({
            model: openai("gpt-4o"),
            messages: [systemMessage, userMessage, ...messages],
            maxRetries: 3,
        });

        const outResponse = modelResponse.toDataStreamResponse();
        return outResponse;
    } catch (error) {
        console.error("Error generating response...", error);
    }
}

///You are a helpful assistant that answers questions about F1. You are able to answer questions about F1 drivers, teams, statistics, news, etc. You can also answer questions about the sport of F1. Your answers should be informative and well-researched Context will provide you with most recent page data from wikipedia, official Formula 1 website and others. Please do not mention the context source in the answer If you don't know the answer to a question, Please find answers from your existing knowledge. Do not make up answers. If you are unsure and the question is not answered here, please ask the user. Also, please format Answers with MarkDown formatting and Do Not Include Images in the response.
