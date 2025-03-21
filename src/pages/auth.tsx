import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const router = useRouter();

  // Use the auth context
  const { login, register } = useAuth();

  // Check password strength
  const checkPasswordStrength = (pass: string) => {
    setPasswordFeedback({
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[^A-Za-z0-9]/.test(pass),
    });
  };

  // Password validation
  const isPasswordValid = () => {
    const { length, uppercase, lowercase, number, special } = passwordFeedback;
    return length && uppercase && lowercase && number && special;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!isLogin) {
      checkPasswordStrength(newPassword);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // If registering, validate password strength
    if (!isLogin && !isPasswordValid()) {
      setError("Please use a stronger password that meets all requirements");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        // The redirect happens in the auth context after successful login
      } else {
        await register(name, email, password);
        // The redirect happens in the auth context after successful registration
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          (isLogin ? "Login failed" : "Registration failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* Main Container - Card-like UI */}
      <div className="w-full max-w-md bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-xl overflow-hidden relative">
        {/* Header with logo */}
        <div className="p-6 text-center">
          <Link href="/" className="inline-flex items-center">
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

        <div className="px-6 pb-8">
          {/* Toggle buttons */}
          <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                isLogin ? "bg-white text-teal-600 shadow-sm" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                !isLogin ? "bg-white text-teal-600 shadow-sm" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isLogin ? "Welcome Back!" : "Create Your Account"}
          </h1>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  disabled={loading}
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                {isLogin && (
                  <a href="#" className="text-xs text-teal-600 hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                required
                disabled={loading}
                pattern={
                  !isLogin
                    ? "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$"
                    : undefined
                }
                title={
                  !isLogin
                    ? "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
                    : undefined
                }
              />

              {/* Password strength indicators for registration */}
              {!isLogin && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-medium text-gray-700">
                    Password must contain:
                  </p>
                  <ul className="grid grid-cols-2 gap-1 text-xs">
                    <li
                      className={`flex items-center ${
                        passwordFeedback.length
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 mr-1 ${
                          passwordFeedback.length
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        {passwordFeedback.length ? (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        ) : (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                      At least 8 characters
                    </li>
                    <li
                      className={`flex items-center ${
                        passwordFeedback.uppercase
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 mr-1 ${
                          passwordFeedback.uppercase
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        {passwordFeedback.uppercase ? (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        ) : (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                      Uppercase letter
                    </li>
                    <li
                      className={`flex items-center ${
                        passwordFeedback.lowercase
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 mr-1 ${
                          passwordFeedback.lowercase
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        {passwordFeedback.lowercase ? (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        ) : (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                      Lowercase letter
                    </li>
                    <li
                      className={`flex items-center ${
                        passwordFeedback.number
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 mr-1 ${
                          passwordFeedback.number
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        {passwordFeedback.number ? (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        ) : (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                      Number
                    </li>
                    <li
                      className={`flex items-center ${
                        passwordFeedback.special
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 mr-1 ${
                          passwordFeedback.special
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        {passwordFeedback.special ? (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        ) : (
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                      Special character
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-teal-600 text-white py-2 rounded-full font-medium hover:bg-teal-700 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              } ${!isLogin && !isPasswordValid() ? "opacity-70" : ""}`}
              disabled={loading || (!isLogin && !isPasswordValid())}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-teal-600 hover:underline font-medium"
                disabled={loading}
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>

        {/* Decorative blob in the background */}
        <div className="absolute -bottom-16 -left-16 w-48 h-48 opacity-10 pointer-events-none">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full text-teal-600"
            fill="currentColor"
          >
            <path
              d="M45.4,-58.6C58.9,-47.9,69.7,-33.2,73.5,-16.7C77.3,-0.2,74.1,17.9,65.1,32.1C56.2,46.3,41.4,56.5,25.5,64.3C9.6,72.1,-7.4,77.5,-22.9,73.5C-38.4,69.5,-52.3,56.1,-62.3,40.3C-72.2,24.5,-78.1,6.2,-75.3,-10.8C-72.6,-27.8,-61.2,-43.5,-47,-55.4C-32.7,-67.3,-15.6,-75.4,0.6,-76.1C16.8,-76.8,31.9,-69.3,45.4,-58.6Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
