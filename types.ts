
export type AppView = 'dashboard' | 'lesson-planner' | 'exercise-lab' | 'hub' | 'collab' | 'analytics' | 'personal-advice';

export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  grade: string;
  goals: string[];
  content: string;
  mindMapData?: any;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  type: '教案' | '习题' | '实验' | '课件';
  subject: string;
  grade: string;
  author: string;
  downloads: number;
  likes: number;
  previewUrl: string;
}

export interface Exercise {
  level: string;
  content: string;
  answer: string;
  analysis: string;
}

export interface StudentReport {
  studentName: string;
  mastery: { [key: string]: number };
  recentScores: number[];
  behaviorScore: number;
}
