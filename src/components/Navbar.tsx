import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">
        AI Interview Assistant
      </h1>
      <div className="space-x-4">
        <Link href="/" className="text-gray-600 hover:text-blue-500">
          Home
        </Link>
        <Link href="/pricing" className="text-gray-600 hover:text-blue-500">
          Pricing
        </Link>
        <Link href="/dashboard" className="text-gray-600 hover:text-blue-500">
          Dashboard
        </Link>
        <Link
          href="/auth"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
