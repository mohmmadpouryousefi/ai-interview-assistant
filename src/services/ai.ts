import api from "./api";

export interface QuestionRequestParams {
  jobPosition: string;
  experienceLevel?: string;
  count?: number;
}

export interface Question {
  question: string;
  category: string;
}

export interface QuestionsResponse {
  questions: Question[];
  notice?: string;
}

/**
 * AI Service provides methods to interact with the AI features of the application
 */
const aiService = {
  /**
   * Generate interview questions based on job position and experience level
   * @param params The parameters for generating questions
   * @returns A Promise that resolves to the generated questions
   */
  generateQuestions: async (
    params: QuestionRequestParams
  ): Promise<QuestionsResponse> => {
    try {
      const response = await api.post("/ai/questions", params);
      return response.data;
    } catch (error: any) {
      console.error("Error generating questions:", error);

      // If the API call fails, return a simplified error response
      // This helps the UI show a graceful error instead of crashing
      if (error.response) {
        throw new Error(
          error.response.data.error || "Failed to generate questions"
        );
      }
      throw new Error("Network error: Could not connect to the server");
    }
  },
};

export default aiService;
