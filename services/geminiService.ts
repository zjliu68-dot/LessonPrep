
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonPlan = async (params: {
  syllabus: string;
  goals: string;
  content: string;
  mode: string;
  subject: string;
}) => {
  const ai = getAI();
  const prompt = `
    作为理科教学专家，基于以下信息生成一份专业的理科教案：
    学科：${params.subject}
    教学大纲：${params.syllabus}
    教学目标：${params.goals}
    教材内容：${params.content}
    教学模式偏好：${params.mode}

    要求输出为结构化内容，包含：
    1. 教学目标（三维目标）
    2. 教学重难点
    3. 导入环节设计
    4. 核心知识点讲解
    5. 课堂互动活动设计
    6. 课堂总结
    7. 课后作业建议
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
      topP: 0.95,
    }
  });

  return response.text;
};

export const generateExercises = async (params: {
  topic: string;
  difficulty: string;
  grade: string;
}) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `针对${params.grade}${params.topic}设计分层习题。难度：${params.difficulty}。
               请生成3道习题，分别为：基础巩固题、能力提高题、思维拓展题。每题附带详细解析和答案。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.STRING },
            content: { type: Type.STRING },
            answer: { type: Type.STRING },
            analysis: { type: Type.STRING }
          },
          required: ["level", "content", "answer", "analysis"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
};

export const getPersonalizedAdvice = async (report: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `根据以下学生学情数据提供针对性的教学建议：${JSON.stringify(report)}. 
               包含：1. 薄弱环节定位 2. 推荐教学资源类型 3. 教学方法优化方案。`,
  });
  return response.text;
};
