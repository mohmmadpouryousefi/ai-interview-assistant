import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Categories of job positions
const JOB_CATEGORIES = {
  SOFTWARE_ENGINEER: "Software Engineer",
  DATA_SCIENTIST: "Data Scientist",
  PRODUCT_MANAGER: "Product Manager",
  MARKETING: "Marketing",
  SALES: "Sales",
  CUSTOMER_SERVICE: "Customer Service",
  FINANCE: "Finance",
  HR: "Human Resources",
  DESIGN: "Design/UX",
  OPERATIONS: "Operations",
};

// Default questions by category - fallback if AI generation fails
const DEFAULT_QUESTIONS = {
  [JOB_CATEGORIES.SOFTWARE_ENGINEER]: [
    "Explain the difference between inheritance and composition in object-oriented programming.",
    "How would you optimize a website that loads slowly?",
    "Describe a challenging bug you've encountered and how you solved it.",
    "What's your experience with agile development methodologies?",
    "How do you approach testing your code?",
  ],
  [JOB_CATEGORIES.DATA_SCIENTIST]: [
    "Explain the difference between supervised and unsupervised learning.",
    "How would you handle missing data in a dataset?",
    "Describe a project where you applied machine learning techniques.",
    "How do you evaluate model performance?",
    "Explain overfitting and how to prevent it.",
  ],
  // Default questions for other categories...
};

// Generate interview questions using OpenRouter.ai
export const generateQuestions = async (req: Request, res: Response) => {
  try {
    const { jobPosition, experienceLevel, count = 5 } = req.body;

    if (!jobPosition) {
      return res.status(400).json({ error: "Job position is required" });
    }

    // OpenRouter.ai API integration
    const prompt = `Generate ${count} professional interview questions for a ${
      experienceLevel || "mid-level"
    } ${jobPosition} position. 
    The questions must be challenging but fair, and must assess both technical skills and soft skills relevant to this role.
    Format the output as a JSON array of question objects with "question" and "category" fields. Categories can be "technical", "behavioral", or "role-specific".`;

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo", // Can be changed based on your preference
          messages: [
            {
              role: "system",
              content:
                "You are a professional job interviewer. Your task is to generate relevant and insightful interview questions for specific job roles.",
            },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": `${process.env.APP_URL || "http://localhost:3000"}`,
            "X-Title": "AI Interview Assistant",
          },
        }
      );

      let questions;
      try {
        const content = response.data.choices[0].message.content;
        const parsedContent = JSON.parse(content);
        questions = parsedContent.questions || parsedContent;
      } catch (parseError) {
        // If parsing fails, extract questions using regex
        const content = response.data.choices[0].message.content;
        const questionsMatch = content.match(/\[(.*)\]/s);
        if (questionsMatch) {
          try {
            questions = JSON.parse(questionsMatch[0]);
          } catch {
            throw new Error("Failed to parse questions from AI response");
          }
        } else {
          throw new Error("Failed to parse questions from AI response");
        }
      }

      return res.status(200).json({ questions });
    } catch (aiError: any) {
      console.error("AI API error:", aiError.message);
      // Fallback to default questions if AI generation fails
      const closestCategory = findClosestCategory(jobPosition);
      const defaultQuestionsForJob =
        DEFAULT_QUESTIONS[closestCategory] ||
        DEFAULT_QUESTIONS[JOB_CATEGORIES.SOFTWARE_ENGINEER];

      // Format default questions to match expected output
      const formattedQuestions = defaultQuestionsForJob
        .slice(0, count)
        .map((question) => ({
          question,
          category: "general",
        }));

      return res.status(200).json({
        questions: formattedQuestions,
        notice: "Using default questions due to AI service unavailability",
      });
    }
  } catch (error: any) {
    console.error("Error generating questions:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to generate interview questions" });
  }
};

// Helper function to find the closest job category match
function findClosestCategory(jobPosition: string): string {
  jobPosition = jobPosition.toLowerCase();

  // Direct matches
  for (const category of Object.values(JOB_CATEGORIES)) {
    if (jobPosition.includes(category.toLowerCase())) {
      return category;
    }
  }

  // Check for keywords
  if (
    jobPosition.includes("develop") ||
    jobPosition.includes("software") ||
    jobPosition.includes("program") ||
    jobPosition.includes("code")
  ) {
    return JOB_CATEGORIES.SOFTWARE_ENGINEER;
  }

  if (
    jobPosition.includes("data") ||
    jobPosition.includes("machine learning") ||
    jobPosition.includes("analytics")
  ) {
    return JOB_CATEGORIES.DATA_SCIENTIST;
  }

  if (jobPosition.includes("market")) {
    return JOB_CATEGORIES.MARKETING;
  }

  if (jobPosition.includes("sale")) {
    return JOB_CATEGORIES.SALES;
  }

  if (
    jobPosition.includes("design") ||
    jobPosition.includes("ux") ||
    jobPosition.includes("user experience")
  ) {
    return JOB_CATEGORIES.DESIGN;
  }

  // Default fallback
  return JOB_CATEGORIES.SOFTWARE_ENGINEER;
}
