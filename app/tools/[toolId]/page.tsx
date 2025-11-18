import { notFound } from 'next/navigation';
import { tools } from '../data';
import Link from 'next/link';

export default async function ToolDetails({ params }: { params: Promise<{ toolId: string }> }) {
  const resolvedParams = await params;
  const tool = tools.find((t) => t.id === resolvedParams.toolId);

  if (!tool) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tool Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400 mx-2">/</span>
              </li>
              <li>
                <Link href="/tools" className="text-gray-500 hover:text-gray-700">
                  Tools
                </Link>
              </li>
              <li>
                <span className="text-gray-400 mx-2">/</span>
              </li>
              <li className="text-gray-700 font-medium" aria-current="page">
                {tool.name}
              </li>
            </ol>
          </nav>

          <div className="mt-8 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-tool.jpg';
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {tool.price}
                  </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(tool.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">{tool.rating}/5.0</span>
                  </div>
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
                >
                  Visit Website
                </a>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="text-gray-900">{tool.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="bg-white p-8 rounded-xl shadow-md"
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{tool.name}</h1>
                <p className="text-xl text-gray-600 mb-6">{tool.description}</p>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
                  <ul className="space-y-3">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">About {tool.name}</h2>
                  <div className="prose max-w-none text-gray-700">
                    <p>
                      {tool.name} is a {tool.category.toLowerCase()} tool that helps professionals and teams achieve their goals more efficiently. 
                      With its powerful features and intuitive interface, it's no wonder that {tool.name} is trusted by thousands of users worldwide.
                    </p>
                    <p className="mt-4">
                      Whether you're a beginner or an expert, {tool.name} provides the tools and resources you need to succeed in today's fast-paced digital landscape.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Tools */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tools
                    .filter((t) => t.category === tool.category && t.id !== tool.id)
                    .slice(0, 2)
                    .map((relatedTool) => (
                      <Link
                        key={relatedTool.id}
                        href={`/tools/${relatedTool.id}`}
                        className="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <img
                              src={relatedTool.image}
                              alt={relatedTool.name}
                              className="h-8 w-8 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-tool.jpg';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{relatedTool.name}</h3>
                            <p className="text-sm text-gray-500">{relatedTool.category}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
