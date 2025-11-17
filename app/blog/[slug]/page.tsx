'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '../data';

interface PostParams {
  slug: string;
}

export default function BlogPostPage() {
  const router = useRouter();
  const params = useParams<PostParams>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params?.slug) {
      setError('Invalid post slug');
      setLoading(false);
      return;
    }

    // Find the blog post by slug
    const foundPost = blogPosts.find((p) => p.id === params.slug);
    
    if (!foundPost) {
      setError('Post not found');
      setLoading(false);
      return;
    }

    setPost(foundPost);
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link 
            href="/blog" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article className="prose lg:prose-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600 mb-6">
            <div className="flex items-center">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">{post.author.name}</p>
                <div className="flex items-center text-sm">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-auto rounded-lg mb-8"
        />

        <div 
          className="prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}
