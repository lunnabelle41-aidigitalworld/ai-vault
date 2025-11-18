import { notFound } from 'next/navigation';
import { blogPosts } from '../data';
import BlogPostContent from './BlogPostContent';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id, // Using id as the slug since that's what's in the data
  }));
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.id === resolvedParams.slug);
  
  if (!post) {
    return <BlogPostContent post={null} error="Post not found" />;
  }

  return <BlogPostContent post={post} error={null} />;
}