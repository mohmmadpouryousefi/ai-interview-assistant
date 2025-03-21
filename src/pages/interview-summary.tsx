import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import interviewService, { InterviewSummary } from "../services/interviews";

const InterviewSummaryPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [summary, setSummary] = useState<InterviewSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Check authentication and load summary
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth");
        return;
      }

      if (id) {
        // Fetch interview summary by ID
        const interviewSummary = interviewService.getInterviewById(
          id as string
        );

        if (interviewSummary) {
          setSummary(interviewSummary);
        } else {
          setError("Interview not found");
        }

        setIsLoading(false);
      }
    }
  }, [loading, isAuthenticated, router, id]);

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen bg-gray-100">
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
              <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4">
                <h1 className="text-xl font-bold text-white">Error</h1>
              </div>
              <div className="p-8 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="mt-3 text-lg font-medium text-gray-900">
                  {error || "Interview summary not found"}
                </h3>
                <p className="mt-2 text-base text-gray-500 mb-6">
                  We couldn&apos;t find the interview you&apos;re looking for.
                  It may have been deleted or the ID is incorrect.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
            <div className="flex items-center space-x-4">
              <Link
                href="/history"
                className="text-sm text-gray-600 hover:text-teal-600"
              >
                Interview History
              </Link>
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-teal-600"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Summary Header */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-4">
              <h1 className="text-xl font-bold text-white flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Interview Summary: {summary.jobPosition}
              </h1>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h2 className="text-sm font-medium text-gray-500">
                    JOB POSITION
                  </h2>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {summary.jobPosition}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h2 className="text-sm font-medium text-gray-500">DATE</h2>
                  <p className="mt-1 text-lg text-gray-900">
                    {formatDate(summary.interviewDate)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h2 className="text-sm font-medium text-gray-500">
                    EXPERIENCE LEVEL
                  </h2>
                  <p className="mt-1 text-lg text-gray-900">
                    {summary.experienceLevel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
            {/* Overall Score */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden h-full">
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    Overall Score
                  </h2>
                </div>
                <div className="p-6 flex flex-col items-center justify-center">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-36 h-36">
                      <circle
                        className="text-gray-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="60"
                        cx="72"
                        cy="72"
                      />
                      <circle
                        className={`${
                          summary.overallScore >= 90
                            ? "text-green-500"
                            : summary.overallScore >= 80
                            ? "text-teal-500"
                            : summary.overallScore >= 70
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                        strokeWidth="10"
                        strokeDasharray={376.8}
                        strokeDashoffset={
                          376.8 - (376.8 * summary.overallScore) / 100
                        }
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="60"
                        cx="72"
                        cy="72"
                      />
                    </svg>
                    <span className="absolute text-4xl font-bold text-gray-900">
                      {summary.overallScore}
                    </span>
                    <span className="absolute mt-12 text-sm font-medium text-gray-500">
                      OUT OF 100
                    </span>
                  </div>
                  <p className="mt-4 text-center text-lg font-medium">
                    {summary.overallScore >= 90
                      ? "Excellent!"
                      : summary.overallScore >= 80
                      ? "Great job!"
                      : summary.overallScore >= 70
                      ? "Good effort!"
                      : "Keep practicing!"}
                  </p>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    {summary.overallScore >= 90
                      ? "You're well prepared for interviews."
                      : summary.overallScore >= 80
                      ? "With minor improvements, you'll excel in interviews."
                      : summary.overallScore >= 70
                      ? "Continue practicing to improve your interview skills."
                      : "More preparation will help you improve significantly."}
                  </p>
                </div>
              </div>
            </div>

            {/* Interview Details */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden h-full">
                <div className="bg-gradient-to-r from-teal-500 to-indigo-500 px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    Interview Details
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h2 className="text-sm font-medium text-gray-500">
                        DURATION
                      </h2>
                      <p className="mt-1 text-lg text-gray-900">
                        {summary.duration}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h2 className="text-sm font-medium text-gray-500">
                        QUESTIONS
                      </h2>
                      <p className="mt-1 text-lg text-gray-900">
                        {summary.answeredQuestions} of {summary.totalQuestions}{" "}
                        answered
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Interview Progress
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium text-gray-900">
                        <span>Questions Answered</span>
                        <span>
                          {summary.answeredQuestions}/{summary.totalQuestions}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${
                              (summary.answeredQuestions /
                                summary.totalQuestions) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths and Improvements */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Key Strengths
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {summary.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700">{strength}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  Areas for Improvement
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {summary.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700">
                        {improvement}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Question Breakdown */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Question Breakdown
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {summary.questionScores.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 mb-1">
                        {item.question}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          item.score >= 90
                            ? "text-green-600"
                            : item.score >= 80
                            ? "text-teal-600"
                            : item.score >= 70
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          item.score >= 90
                            ? "bg-green-500"
                            : item.score >= 80
                            ? "bg-teal-500"
                            : item.score >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link
              href="/interview"
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Practice Another Interview
            </Link>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </Link>
              <Link
                href="/history"
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                View History
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewSummaryPage;
