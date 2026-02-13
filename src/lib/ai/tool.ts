// lib/tools.ts
import { DynamicTool } from "@langchain/core/tools";

export const weatherTool = new DynamicTool({
  name: "get_weather",
  description: "当用户询问特定城市的天气时调用。",
  func: async (input: string) => {
    // 这里调用实际的天气 API
    return `北京的天气目前是 20°C，多云。`;
  },
});