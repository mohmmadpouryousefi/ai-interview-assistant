import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import interviewService, { InterviewQuestion } from "../services/interviews";

const Interview = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Job positions and experience levels
  const jobPositions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "UI/UX Designer",
    "Product Manager",
  ];

  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level"];

  // State for the interview setup and process
  const [setupCompleted, setSetupCompleted] = useState(false);
  const [selectedJob, setSelectedJob] = useState(jobPositions[0]);
  const [selectedExperience, setSelectedExperience] = useState(
    experienceLevels[0]
  );
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  // Check authentication
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, loading, router]);

  // Load any in-progress interview from storage
  useEffect(() => {
    const savedInterview = interviewService.getCurrentInterview();
    if (savedInterview) {
      if (savedInterview.jobPosition)
        setSelectedJob(savedInterview.jobPosition);
      if (savedInterview.experienceLevel)
        setSelectedExperience(savedInterview.experienceLevel);
      if (savedInterview.questions) {
        setQuestions(savedInterview.questions);
        setSetupCompleted(true);
      }
      if (savedInterview.answers) setAnswers(savedInterview.answers);
    }
  }, []);

  // Save current interview state when it changes
  useEffect(() => {
    if (setupCompleted) {
      interviewService.saveCurrentInterview({
        jobPosition: selectedJob,
        experienceLevel: selectedExperience,
        questions,
        answers,
        duration: recordingTime > 0 ? formatTime(recordingTime) : "0:00",
      });
    }
  }, [
    setupCompleted,
    questions,
    answers,
    recordingTime,
    selectedJob,
    selectedExperience,
  ]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Start recording answer
  const startRecording = () => {
    setIsRecording(true);
    startTimeRef.current = new Date();

    timerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsedSeconds = Math.floor(
          (new Date().getTime() - startTimeRef.current.getTime()) / 1000
        );
        setRecordingTime(elapsedSeconds);
      }
    }, 1000);
  };

  // Stop recording answer
  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
  };

  // Save the current answer
  const saveAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  // Handle setup form submission
  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would call the AI service to generate questions
      // For now, we'll use mock questions
      const mockQuestions: InterviewQuestion[] = [
        {
          question: `What experience do you have with the technologies required for a ${selectedJob} position?`,
          category: "Technical Skills",
        },
        {
          question: `Describe a challenging project you worked on as a ${selectedJob}.`,
          category: "Experience",
        },
        {
          question: `How do you stay updated with the latest trends in ${selectedJob.toLowerCase()} development?`,
          category: "Professional Development",
        },
        {
          question:
            "Describe your approach to problem-solving when faced with a difficult technical challenge.",
          category: "Problem Solving",
        },
        {
          question: "How do you handle feedback on your work?",
          category: "Teamwork",
        },
      ];

      setQuestions(mockQuestions);
      setAnswers(new Array(mockQuestions.length).fill(""));
      setSetupCompleted(true);
    } catch (error) {
      console.error("Error generating interview questions:", error);
      alert("Failed to generate interview questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to the next question
  const nextQuestion = () => {
    stopRecording();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
      setRecordingTime(0);
    } else {
      completeInterview();
    }
  };

  // Navigate to the previous question
  const prevQuestion = () => {
    stopRecording();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(false);
      setRecordingTime(0);
    }
  };

  // Submit the current answer for feedback
  const submitAnswer = () => {
    stopRecording();
    setShowFeedback(true);
  };

  // Complete the interview and redirect to summary
  const completeInterview = () => {
    // Calculate total duration
    const totalDuration = formatTime(
      answers.reduce((total, _, index) => {
        // In a real app, this would be the actual answer durations
        // For now, we'll estimate 60-120 seconds per question
        return total + Math.floor(Math.random() * 60) + 60;
      }, 0)
    );

    // Complete the interview and get the summary
    const summary = interviewService.completeInterview({
      jobPosition: selectedJob,
      experienceLevel: selectedExperience,
      questions,
      answers,
      duration: totalDuration,
    });

    // Navigate to the summary page with the interview ID
    router.push(`/interview-summary?id=${summary.id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!setupCompleted) {
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

        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-4">
                <h1 className="text-xl font-bold text-white">
                  Interview Setup
                </h1>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Customize your interview experience by selecting your job
                  position and experience level. Our AI will generate relevant
                  questions for your practice.
                </p>

                <form onSubmit={handleSetupSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="jobPosition"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Job Position
                      </label>
                      <select
                        id="jobPosition"
                        value={selectedJob}
                        onChange={(e) => setSelectedJob(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                      >
                        {jobPositions.map((job) => (
                          <option key={job} value={job}>
                            {job}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="experienceLevel"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Experience Level
                      </label>
                      <select
                        id="experienceLevel"
                        value={selectedExperience}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                      >
                        {experienceLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Generating Questions...
                          </>
                        ) : (
                          "Start Interview"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
              <div className="text-sm text-gray-600 mr-4">
                <span className="font-medium">{selectedJob}</span> •{" "}
                {selectedExperience}
              </div>
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-teal-600"
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
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-teal-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / questions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Interview Question
              </h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {questions[currentQuestionIndex]?.category}
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-800 mb-6">
                {questions[currentQuestionIndex]?.question}
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
                      value={answers[currentQuestionIndex] || ""}
                      onChange={(e) => saveAnswer(e.target.value)}
                      disabled={isRecording}
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {isRecording ? (
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

                      {isRecording && (
                        <div className="ml-4 flex items-center text-red-500">
                          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                          <span className="text-sm">
                            {formatTime(recordingTime)}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={submitAnswer}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      disabled={!answers[currentQuestionIndex] && !isRecording}
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
                      <li>Good communication skills and articulation</li>
                      <li>Clear structure in your response</li>
                      <li>You demonstrated relevant knowledge</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-amber-600 mb-2">
                      Areas for improvement:
                    </h4>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>Provide more specific examples</li>
                      <li>Quantify your achievements where possible</li>
                      <li>Be more concise in your explanations</li>
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
                      {currentQuestionIndex < questions.length - 1
                        ? "Next Question"
                        : "Finish Interview"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          {!showFeedback && (
            <div className="flex justify-between mb-6">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Question
              </button>
              {/* Spacer for layout balance */}
              <div></div>
            </div>
          )}

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
              <li>Practice your responses but don&apos;t memorize them</li>
              <li>
                Show enthusiasm and positive energy in your voice and body
                language
              </li>
            </ul>

            <span className="flex items-center px-3 py-1 text-sm font-bold mt-4">
              <div className="mr-2">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              Don&apos;t forget to speak slowly and clearly
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Interview;
