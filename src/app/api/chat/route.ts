import { ChatOpenAI } from "@langchain/openai";
import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// 强制使用 Edge Runtime 以获得最快的流式响应
export const runtime = "edge";

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY ?? process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return new Response(
      "Missing OPENAI_API_KEY (or DEEPSEEK_API_KEY). Set it in .env.local or your environment.",
      { status: 500 }
    );
  }

  const openaiBaseUrl =
    process.env.OPENAI_BASE_URL ?? process.env.OPENAI_API_BASE;
  const modelName = process.env.OPENAI_MODEL ?? "deepseek-chat";
  const { messages } = await req.json();

  console.log('payload')

  // 1. 初始化模型
  const model = new ChatOpenAI({
    modelName,
    streaming: true,
    temperature: 0.7,
    timeout: 60_000,
    apiKey,
    ...(openaiBaseUrl ? { configuration: { baseURL: openaiBaseUrl } } : {}),
  });

  // 2. 构造对话模板
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "你是一个友好的 AI 助手。"],
    ...messages.map((m: any) => {
      const text =
        m?.parts
          ?.filter((part: any) => part?.type === "text")
          .map((part: any) => part.text)
          .join("") ?? m?.content ?? "";
      return [m.role === "user" ? "human" : "ai", text];
    }),
  ]);

  // 3. 创建链
  const chain = prompt.pipe(model);

  // 4. 将 LangChain 流转换为 AI SDK 的 UI 消息流
  const uiStream = createUIMessageStream({
    execute: async ({ writer }) => {
      const messageId = crypto.randomUUID(); 
      writer.write({ type: "text-start", id: messageId });
      try {
        const stream = await chain.stream({});
        for await (const chunk of stream as AsyncIterable<any>) {
          const text = (() => {
            if (typeof chunk === "string") return chunk;
            if (typeof (chunk as { text?: unknown })?.text === "string") {
              return (chunk as { text: string }).text;
            }
            const content = (chunk as { content?: unknown })?.content;
            if (typeof content === "string") return content;
            if (Array.isArray(content)) {
              return content
                .map((part) => {
                  if (typeof part === "string") return part;
                  if (part && typeof part === "object" && "text" in part) {
                    return String((part as { text?: unknown }).text ?? "");
                  }
                  return "";
                })
                .join("");
            }
            return "";
          })();
          if (text) {
            writer.write({ type: "text-delta", id: messageId, delta: text });
          }
        }
      } catch (error) {
        const errorText =
          error instanceof Error ? error.message : "生成回复时发生错误。";
        writer.write({ type: "text-delta", id: messageId, delta: errorText });
      } finally {
        writer.write({ type: "text-end", id: messageId });
      }
    },
    onError: (error) => {
      console.error(error);
      return "生成回复时发生错误。";
    },
  });

  return createUIMessageStreamResponse({ stream: uiStream });
}