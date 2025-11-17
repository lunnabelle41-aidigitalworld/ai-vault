import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">404 - Page Not Found</h2>
          <p className="mt-2 text-sm text-gray-600">
            Oops! The blog post you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link 
            href="/" 
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Home
          </Link>
          <Link 
            href="/blog" 
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Visit our Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
