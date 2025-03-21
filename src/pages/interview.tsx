import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

// Mock interview questions - in a real app, these would come from your API
const mockQuestions = [
  {
    id: 1,
    question: "Tell me about yourself and your experience.",
    category: "Introduction",
    difficulty: "Easy",
  },
  {
    id: 2,
    question: "What are your strengths and weaknesses?",
    category: "Personal Assessment",
    difficulty: "Medium",
  },
  {
    id: 3,
    question:
      "Describe a challenging situation at work and how you handled it.",
    category: "Behavioral",
    difficulty: "Medium",
  },
  {
    id: 4,
    question: "Where do you see yourself in 5 years?",
    category: "Career Goals",
    difficulty: "Easy",
  },
  {
    id: 5,
    question: "Why do you want to work for our company?",
    category: "Company Fit",
    difficulty: "Medium",
  },
];

// Mock feedback responses
const mockFeedback = {
  good: [
    "Great job clearly articulating your experience.",
    "You provided specific examples which strengthened your answer.",
    "Your answer was well-structured and easy to follow.",
  ],
  improvement: [
    "Try to be more concise in your response.",
    "Consider including more quantifiable achievements.",
    "Focus more on how your experience relates to the position.",
  ],
};

export default function Interview() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [recording, setRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [loading, isAuthenticated, router]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((seconds) => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const startRecording = () => {
    setRecording(true);
    setTimerActive(true);
    // In a real app, start the recording process here
  };

  const stopRecording = () => {
    setRecording(false);
    setTimerActive(false);
    // In a real app, stop the recording process here
  };

  const submitAnswer = () => {
    stopRecording();
    setShowFeedback(true);
    // In a real app, send the answer to your backend for analysis
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
      setShowFeedback(false);
      setTimerSeconds(0);
    } else {
      // End of interview
      router.push("/interview-summary");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-teal-600">Loading...</div>
      </div>
    );
  }

  const currentQuestion = mockQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex items-center">
                <div className="text-teal-600 w-6 h-6 mr-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 3C9.23 3 6.19 5.95 6 9.66l-1.92 2.53c-.24.31 0 .81.42.81H6v3c0 1.11.89 2 2 2h1v3h7v-4.69c2.37-1.12 4-3.51 4-6.31 0-3.86-3.12-7-7-7z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-teal-600">
                  AI Interview
                </span>
                <span className="text-xs text-gray-500 ml-1">Assistant</span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-teal-600 mr-4"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Interview Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-700">
                Interview Progress
              </h2>
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {mockQuestions.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-teal-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / mockQuestions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-md p-6 mb-6">
            <div className="flex justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {currentQuestion.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {currentQuestion.difficulty}
              </span>
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-6">
              {currentQuestion.question}
            </h1>

            {!showFeedback ? (
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="answer"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Answer:
                  </label>
                  <textarea
                    id="answer"
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                    placeholder="Type your answer here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={recording}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {recording ? (
                      <button
                        onClick={stopRecording}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                          />
                        </svg>
                        Stop Recording
                      </button>
                    ) : (
                      <button
                        onClick={startRecording}
                        className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          />
                        </svg>
                        Start Recording
                      </button>
                    )}

                    {recording && (
                      <div className="ml-4 flex items-center text-red-500">
                        <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                        <span className="text-sm">
                          {formatTime(timerSeconds)}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={submitAnswer}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    disabled={!userAnswer && !recording}
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  AI Feedback
                </h3>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-green-600 mb-2">
                    What you did well:
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {mockFeedback.good.map((feedback, index) => (
                      <li key={`good-${index}`}>{feedback}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-amber-600 mb-2">
                    Areas for improvement:
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {mockFeedback.improvement.map((feedback, index) => (
                      <li key={`improve-${index}`}>{feedback}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setShowFeedback(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Edit Answer
                  </button>

                  <button
                    onClick={nextQuestion}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    {currentQuestionIndex < mockQuestions.length - 1
                      ? "Next Question"
                      : "Finish Interview"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="bg-blue-50 rounded-3xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-blue-800 mb-3">
              Interview Tips
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>Be specific and use examples from your experience</li>
              <li>
                Keep your answers concise and focused (1-2 minutes per question)
              </li>
              <li>
                Use the STAR method for behavioral questions (Situation, Task,
                Action, Result)
              </li>
              <li>
                Practice your responses but don't memorize them word-for-word
              </li>
              <li>
                Show enthusiasm and positive energy in your voice and body
                language
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
