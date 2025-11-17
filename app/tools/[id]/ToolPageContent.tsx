'use client';

import { Tool } from '@/types/tool';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ToolPageContent({ 
  tool,
  recommendedTools 
}: { 
  tool: Tool;
  recommendedTools: Tool[];
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-6"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" /> Back to all tools
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="p-8 md:w-2/3">
              <div className="flex items-center mb-6">
                {tool.logo ? (
                  <div className="w-16 h-16 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center mr-4 overflow-hidden border border-gray-200 dark:border-gray-600">
                    <Image 
                      src={tool.logo} 
                      alt={`${tool.name} logo`} 
                      width={48} 
                      height={48}
                      className="object-contain p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/placeholder-logo.svg';
                      }}
                    />
                  </div>
                ) : null}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500 mr-2">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(tool.rating || 0) ? '★' : '☆'}
                        </span>
                      ))}
                    </span>
                    {tool.rating && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({tool.rating.toFixed(1)})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">{tool.description}</p>
                
                <div className="mt-6">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Visit Website <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2 w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 dark:bg-gray-700 md:w-1/3">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Details</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</span>
                  <p className="text-gray-900 dark:text-white">{tool.category}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Pricing</span>
                  <p className="text-gray-900 dark:text-white">{tool.pricing || 'Free'}</p>
                </div>
                
                {tool.tags && tool.tags.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tags</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tool.tags.map((tag: string) => (
                        <span 
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {recommendedTools.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTools.map((tool) => (
              <div key={tool.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/tools/${tool.id}`} className="block">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {tool.logo && (
                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center mr-3 overflow-hidden border border-gray-200 dark:border-gray-600">
                          <Image 
                            src={tool.logo} 
                            alt={`${tool.name} logo`} 
                            width={32} 
                            height={32}
                            className="object-contain p-1"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = '/placeholder-logo.svg';
                            }}
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{tool.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
