# ai 工具开发
## 第一阶段: 
1. 训练模型[]
2. 大预言模型基础(LLM): transfromer架构， token字符单位，context window 上下文窗口
3. 提示词工程(prompt): 学习如何通过设定角色、提供示例（Few-shot）和链式思考（CoT）来优化 AI 输出。
4. 模型选项

## 第二阶段： 工程实现： 搭建躯干
1. API 集成
2. 向量数据库（Vector Databases）: 如果你的工具需要处理长文本或私人文档，必须学习 RAG（检索增强生成）。
(1) 关键工具：Pinecone, Milvus, Weaviate。
(2) 原理：将文本转为向量（Embedding），实现语义搜索。
3. 开发框架
(1) LangChain / LlamaIndex：目前最主流的 AI 应用开发框架。
(2) Vercel AI SDK：适合前端开发者快速搭建 AI 聊天界面。

## 第三阶段:
1. Agentic Workflow（智能体工作流）：
(1) Tool Calling（函数调用）：让 AI 学会使用计算器、搜索网页或操作你的数据库。
(2) 多智能体协作：学习如何让多个 AI 角色分工合作。
2. 微调（Fine-tuning） vs. RAG：
(1) 了解什么时候该给 AI 喂资料（RAG），什么时候该训练它改变语气或遵循特定格式（Fine-tuning）。