import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from './data';

export const metadata: Metadata = {
  title: 'Blog - AI Vault',
  description: 'Latest articles and insights about AI, technology, and business',
};

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
      
      {featuredPost && (
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Featured Post</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-sm text-gray-500">
                  {new Date(featuredPost.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">
                <Link href={`/blog/${encodeURIComponent(featuredPost.id)}`} className="hover:text-blue-600 transition-colors">
                  {featuredPost.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
              <Link 
                href={`/blog/${encodeURIComponent(featuredPost.id)}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Read more →
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 2).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link 
                href={`/blog/${encodeURIComponent(post.id)}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
