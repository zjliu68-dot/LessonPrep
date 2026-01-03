
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

export interface ExerciseSet {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Array<{
    type: string;
    content: string;
    answer: string;
    level: '基础' | '提高' | '拓展';
  }>;
}

export interface StudentReport {
  studentName: string;
  mastery: { [key: string]: number }; // knowledge point -> score 0-100
  recentScores: number[];
  behaviorScore: number;
}
