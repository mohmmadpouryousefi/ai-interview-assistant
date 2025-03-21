// import api from './api';

export interface InterviewQuestion {
  question: string;
  category: string;
  answer?: string;
  score?: number;
}

export interface InterviewSummary {
  id: string;
  jobPosition: string;
  experienceLevel: string;
  totalQuestions: number;
  answeredQuestions: number;
  interviewDate: string;
  duration: string;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  questionScores: {
    question: string;
    score: number;
  }[];
  userId: string;
}

export interface InterviewData {
  jobPosition: string;
  experienceLevel: string;
  questions: InterviewQuestion[];
  answers: string[];
  duration: string;
}

// Local storage keys
const CURRENT_INTERVIEW_KEY = "current_interview";
const INTERVIEW_HISTORY_KEY = "interview_history";

const interviewService = {
  // Store the current interview in progress
  saveCurrentInterview: (interviewData: Partial<InterviewData>) => {
    localStorage.setItem(CURRENT_INTERVIEW_KEY, JSON.stringify(interviewData));
  },

  // Get the current interview in progress
  getCurrentInterview: (): Partial<InterviewData> | null => {
    const data = localStorage.getItem(CURRENT_INTERVIEW_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Clear the current interview data
  clearCurrentInterview: () => {
    localStorage.removeItem(CURRENT_INTERVIEW_KEY);
  },

  // Complete an interview and save it to history
  completeInterview: (interviewData: InterviewData): InterviewSummary => {
    // Generate a basic score and feedback
    const scores = interviewData.questions.map(() => {
      // In a real app, this would be calculated based on AI analysis
      return Math.floor(Math.random() * 30) + 70; // Random score between 70-99
    });

    const overallScore = Math.floor(
      scores.reduce((sum, score) => sum + score, 0) / scores.length
    );

    // Generate some placeholder strengths and improvements
    const strengths = [
      "Good communication skills",
      "Clear and structured answers",
      "Demonstrated relevant experience",
    ];

    const improvements = [
      "Provide more specific examples",
      "Focus on quantifiable achievements",
      "Elaborate more on problem-solving approach",
    ];

    // Create the interview summary
    const summary: InterviewSummary = {
      id: Date.now().toString(),
      jobPosition: interviewData.jobPosition,
      experienceLevel: interviewData.experienceLevel,
      totalQuestions: interviewData.questions.length,
      answeredQuestions: interviewData.answers.filter((a) => a).length,
      interviewDate: new Date().toISOString(),
      duration: interviewData.duration,
      overallScore,
      strengths,
      improvements,
      questionScores: interviewData.questions.map((q, i) => ({
        question: q.question,
        score: scores[i],
      })),
      userId: "current-user", // In a real app, this would be the actual user ID
    };

    // Save to history
    const history = interviewService.getInterviewHistory();
    history.push(summary);
    localStorage.setItem(INTERVIEW_HISTORY_KEY, JSON.stringify(history));

    // Clear the current interview
    interviewService.clearCurrentInterview();

    return summary;
  },

  // Get all completed interviews
  getInterviewHistory: (): InterviewSummary[] => {
    const data = localStorage.getItem(INTERVIEW_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Get a specific interview by ID
  getInterviewById: (id: string): InterviewSummary | null => {
    const history = interviewService.getInterviewHistory();
    return history.find((interview) => interview.id === id) || null;
  },

  // Delete an interview from history
  deleteInterview: (id: string): boolean => {
    const history = interviewService.getInterviewHistory();
    const updatedHistory = history.filter((interview) => interview.id !== id);

    if (updatedHistory.length < history.length) {
      localStorage.setItem(
        INTERVIEW_HISTORY_KEY,
        JSON.stringify(updatedHistory)
      );
      return true;
    }

    return false;
  },

  // In a real app, these would connect to your backend API
  // saveInterviewToServer: async (summary: InterviewSummary) => {
  //   try {
  //     const response = await api.post('/interviews', summary);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Failed to save interview', error);
  //     throw error;
  //   }
  // },

  // getInterviewsFromServer: async () => {
  //   try {
  //     const response = await api.get('/interviews');
  //     return response.data;
  //   } catch (error) {
  //     console.error('Failed to fetch interviews', error);
  //     throw error;
  //   }
  // }
};

export default interviewService;
