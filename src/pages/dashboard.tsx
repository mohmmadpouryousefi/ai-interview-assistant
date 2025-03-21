import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProgressCharts from "@/components/ProgressCharts";
import StatsCard from "@/components/StatsCard";

export default function Dashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-teal-600">Loading...</div>
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
              <Link href="/" className="flex items-center">
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
              {user && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-4">
                    Hello, {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome section */}
          <div className="bg-white rounded-3xl shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">
              Track your progress and continue improving your interview skills.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard
              title="Total Interviews"
              value="24"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              }
              change={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Average Score"
              value="78%"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              }
              change={{ value: 4, isPositive: true }}
            />
            <StatsCard
              title="Best Skill"
              value="Problem Solving"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              }
            />
            <StatsCard
              title="Next Goal"
              value="85% Score"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
              change={{ value: 7, isPositive: false }}
            />
          </div>

          {/* Progress Charts */}
          <div className="bg-white rounded-3xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Your Progress
            </h2>
            <ProgressCharts />
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/interview"
                className="bg-blue-500 text-white p-4 rounded-lg transition-colors hover:bg-blue-600 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
                Start New Interview
              </Link>
              <Link
                href="/history"
                className="bg-green-500 text-white p-4 rounded-lg transition-colors hover:bg-green-600 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
                View Interview History
              </Link>
              <Link
                href="/profile"
                className="bg-purple-500 text-white p-4 rounded-lg transition-colors hover:bg-purple-600 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
