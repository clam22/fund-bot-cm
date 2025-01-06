import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { embed, streamText } from "ai";

export const maxDuration = 30;

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});
const index = pinecone.index("fund-bot-cm");

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: messages[messages.length - 1].content,
  });

  const queryResponse = await index.namespace("bot-namespace").query({
    vector: embedding,
    topK: 10,
    includeValues: true,
    includeMetadata: true,
  });

  const combinedMetadata: Record<string, any> = {};

  queryResponse.matches.forEach((match, index) => {
    combinedMetadata[`match_${index + 1}`] = match.metadata;
  });

  const bestMatchingResult = queryResponse.matches.reduce(
    (bestMatch, currentMatch) => {
      const bestMatchScore = bestMatch.score ?? 0;
      const currentMatchScore = currentMatch.score ?? 0;
      return currentMatchScore > bestMatchScore ? currentMatch : bestMatch;
    },
    queryResponse.matches[0]
  ).metadata;

  const jsonString = JSON.stringify(bestMatchingResult, null, 2);

  const pdfUrl = JSON.parse(jsonString)
    .metadata.replace('{"source":"s3://fund-bot-cm/', "")
    .replace('"}', "");

  // console.log(combinedMetadata);
  // console.log("Embedding:", embedding);
  // console.log("Original Message:", messages[0].content);
  // console.log("Query Response:", queryResponse);
  // console.log("Best Matching Result (JSON):", bestMatchingResult);
  console.log("(JSON):", pdfUrl);

  // console.log(messages)

  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    messages,
    system: `
    You are an investment assistant named Mwenzi (always introduce yourself when user says "hi" or "hello"), 
    providing information about funds and investments on the Satrix Website. 
    Based on the best result from Pinecone (selected based on relevance and score), 
    respond in detail to the user's query. Here's the relevant data you should use: ${JSON.stringify(
      bestMatchingResult
    )}. You may also look at the other relevant data: ${JSON.stringify(
      combinedMetadata
    )}. Use other revelevant data to suggest document names the user can look into.

    If the user asks something outside of the scope of the funds and investment respond wiith
    a sassy comment which indicates you have no knowledge about that. 

    Add the following link to your response every time (except when the user says "hi" or "hello"): "\n \n https://fund-bot-cm.s3.amazonaws.com/${pdfUrl}".

    Add more sources where necessary in this format.
  `,
  });

  return result.toDataStreamResponse();
}
