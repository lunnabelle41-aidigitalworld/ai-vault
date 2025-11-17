import { notFound } from 'next/navigation';
import { blogPosts } from '../data';
import BlogPostContent from './BlogPostContent';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id, // Using id as the slug since that's what's in the data
  }));
}

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.id === params.slug);
  
  if (!post) {
    return <BlogPostContent post={null} error="Post not found" />;
  }

  return <BlogPostContent post={post} error={null} />;
}