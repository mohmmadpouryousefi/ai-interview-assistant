import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* Main Container - Card-like UI */}
      <div className="w-full max-w-6xl bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-xl overflow-hidden relative">
        {/* Navbar Area */}
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
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
            </div>
            <div className="hidden lg:flex space-x-6 text-sm">
              <a href="#" className="text-gray-600">
                Home
              </a>
              <a href="#" className="text-gray-600">
                Pricing
              </a>
              <a href="#" className="text-gray-600">
                About
              </a>
              <Link href="/auth" className="text-gray-600">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center px-6 lg:px-12 py-8">
          {/* Left Content */}
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              AI-Powered
              <br />
              Interview Coach
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Get real-time feedback and
              <br />
              improve your interview skills
            </p>
            <Link
              href="/interview"
              className="inline-block bg-teal-600 text-white px-6 py-2 rounded-full text-base font-medium hover:bg-teal-700 transition-colors"
            >
              Start Practicing Now
            </Link>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2">
            <div className="aspect-[3/4] w-full max-w-md mx-auto">
              <div className="h-full rounded-xl overflow-hidden">
                <div className="h-full w-full relative">
                  <Image
                    src="/person.jpg"
                    alt="Person using interview app"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 lg:p-12 bg-gray-50">
          {/* AI Feedback Card */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 text-teal-600 mb-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-teal-600 mb-1">AI Feedback</h3>
            <p className="text-xs text-gray-500 text-center max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla
            </p>
            <button className="mt-3 text-xs text-teal-600 border border-teal-600 rounded-full px-4 py-1">
              Learn more
            </button>
          </div>

          {/* Video Analysis Card */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 text-teal-600 mb-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-teal-600 mb-1">Video Analysis</h3>
            <p className="text-xs text-gray-500 text-center max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla
            </p>
            <button className="mt-3 text-xs text-teal-600 border border-teal-600 rounded-full px-4 py-1">
              Learn more
            </button>
          </div>

          {/* Progress Tracking Card */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 text-teal-600 mb-3">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-teal-600 mb-1">
              Progress Tracking
            </h3>
            <p className="text-xs text-gray-500 text-center max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla
            </p>
            <button className="mt-3 text-xs text-teal-600 border border-teal-600 rounded-full px-4 py-1">
              Learn more
            </button>
          </div>
        </div>

        {/* Animated Vector in bottom-right corner */}
        <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 w-24 h-24 lg:w-32 lg:h-32 opacity-70 pointer-events-none">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full animate-float text-teal-400/30"
            fill="currentColor"
          >
            <path
              d="M45.4,-58.6C58.9,-47.9,69.7,-33.2,73.5,-16.7C77.3,-0.2,74.1,17.9,65.1,32.1C56.2,46.3,41.4,56.5,25.5,64.3C9.6,72.1,-7.4,77.5,-22.9,73.5C-38.4,69.5,-52.3,56.1,-62.3,40.3C-72.2,24.5,-78.1,6.2,-75.3,-10.8C-72.6,-27.8,-61.2,-43.5,-47,-55.4C-32.7,-67.3,-15.6,-75.4,0.6,-76.1C16.8,-76.8,31.9,-69.3,45.4,-58.6Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        {/* Second Animated Vector - smaller and different animation */}
        <div className="absolute bottom-16 right-16 lg:bottom-24 lg:right-32 w-12 h-12 lg:w-16 lg:h-16 opacity-60 pointer-events-none">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full animate-pulse text-blue-300/40"
            fill="currentColor"
          >
            <path
              d="M39.5,-48.4C51.9,-35.6,63,-22.9,67.1,-7.7C71.2,7.4,68.3,25,58.7,37.4C49.1,49.8,32.9,57,15.8,61.6C-1.2,66.2,-19.1,68.2,-35.8,63C-52.5,57.8,-68,45.3,-74.5,29C-81,12.7,-78.6,-7.4,-70.7,-25.3C-62.9,-43.1,-49.7,-58.6,-35,-67.1C-20.3,-75.6,-4,-77.1,7.3,-72C18.5,-66.9,27.2,-61.2,39.5,-48.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
