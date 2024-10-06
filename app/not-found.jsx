import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <a className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
          Go Back Home
        </a>
      </Link>
    </div>
  );
};

export default NotFound;