import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import interviewService, { InterviewSummary } from "../services/interviews";

const History = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [interviews, setInterviews] = useState<InterviewSummary[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<string | null>(
    null
  );
  const [sortBy, setSortBy] = useState<"date" | "score">("date");
  const [filterText, setFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication and load history
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth");
        return;
      }

      // Load interview history
      const history = interviewService.getInterviewHistory();
      setInterviews(history);
      setIsLoading(false);
    }
  }, [loading, isAuthenticated, router]);

  // Filter and sort interviews
  const filteredInterviews = interviews
    .filter((interview) =>
      interview.jobPosition.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.interviewDate).getTime() -
          new Date(a.interviewDate).getTime()
        );
      }
      return b.overallScore - a.overallScore;
    });

  // Handle interview deletion
  const handleDeleteInterview = (id: string) => {
    if (confirm("Are you sure you want to delete this interview?")) {
      const deleted = interviewService.deleteInterview(id);
      if (deleted) {
        setInterviews(interviews.filter((interview) => interview.id !== id));
        if (selectedInterview === id) {
          setSelectedInterview(null);
        }
      }
    }
  };

  // Get the selected interview details
  const interviewDetail = selectedInterview
    ? interviews.find((i) => i.id === selectedInterview)
    : null;

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Interview List */}
            <div className="md:w-2/3">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-4">
                  <h1 className="text-xl font-bold text-white">
                    Interview History
                  </h1>
                </div>

                {/* Filters and Sort */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="w-full sm:w-64">
                      <label htmlFor="search" className="sr-only">
                        Search interviews
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          placeholder="Search interviews"
                          type="search"
                          value={filterText}
                          onChange={(e) => setFilterText(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <label
                        htmlFor="sortBy"
                        className="text-sm font-medium text-gray-700 mr-2"
                      >
                        Sort by:
                      </label>
                      <select
                        id="sortBy"
                        name="sortBy"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                        value={sortBy}
                        onChange={(e) =>
                          setSortBy(e.target.value as "date" | "score")
                        }
                      >
                        <option value="date">Date (newest first)</option>
                        <option value="score">Score (highest first)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Interview List */}
                <div className="overflow-hidden">
                  {filteredInterviews.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-gray-500">
                        No interviews found. Try adjusting your search or start
                        a new interview.
                      </p>
                      <Link
                        href="/interview"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
                      >
                        Start New Interview
                      </Link>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {filteredInterviews.map((interview) => (
                        <li key={interview.id}>
                          <button
                            onClick={() => setSelectedInterview(interview.id)}
                            className={`w-full text-left px-6 py-4 hover:bg-gray-50 focus:outline-none ${
                              selectedInterview === interview.id
                                ? "bg-teal-50"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {interview.jobPosition}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(
                                    interview.interviewDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <div className="ml-2 flex-shrink-0 flex">
                                  <p
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${
                                      interview.overallScore >= 90
                                        ? "bg-green-100 text-green-800"
                                        : interview.overallScore >= 80
                                        ? "bg-blue-100 text-blue-800"
                                        : interview.overallScore >= 70
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {interview.overallScore}%
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                  <svg
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {interview.duration}
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                  <svg
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                  </svg>
                                  {interview.answeredQuestions} of{" "}
                                  {interview.totalQuestions} questions
                                </p>
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Interview Details */}
            <div className="md:w-1/3">
              <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">
                    Interview Details
                  </h2>
                </div>

                {!interviewDetail ? (
                  <div className="p-6 text-center text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No interview selected
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select an interview from the list to view details.
                    </p>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {interviewDetail.jobPosition}
                      </h3>
                      <button
                        onClick={() =>
                          handleDeleteInterview(interviewDetail.id)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          DATE
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(
                            interviewDetail.interviewDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          SCORE
                        </p>
                        <p
                          className={`mt-1 text-sm font-semibold 
                          ${
                            interviewDetail.overallScore >= 90
                              ? "text-green-600"
                              : interviewDetail.overallScore >= 80
                              ? "text-blue-600"
                              : interviewDetail.overallScore >= 70
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {interviewDetail.overallScore}%
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          DURATION
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          {interviewDetail.duration}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs font-medium text-gray-500">
                          EXPERIENCE
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          {interviewDetail.experienceLevel}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg col-span-2">
                        <p className="text-xs font-medium text-gray-500">
                          QUESTIONS
                        </p>
                        <p className="mt-1 text-sm text-gray-900">
                          {interviewDetail.answeredQuestions} of{" "}
                          {interviewDetail.totalQuestions} answered
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Performance Summary
                      </h4>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full 
                            ${
                              interviewDetail.overallScore >= 90
                                ? "bg-green-600"
                                : interviewDetail.overallScore >= 80
                                ? "bg-blue-500"
                                : interviewDetail.overallScore >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          style={{ width: `${interviewDetail.overallScore}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link
                        href={`/interview-summary?id=${interviewDetail.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        View Detailed Feedback
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default History;
