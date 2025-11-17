import { notFound } from 'next/navigation';
import { getToolById, getRecommendedTools, getTools } from '@/lib/tools';
import ToolPageContent from './ToolPageContent';

export default async function ToolPage({ params }: { params: { id: string } }) {
  const tool = await getToolById(params.id);
  
  if (!tool) {
    notFound();
  }

  // Get recommended tools from the same category
  const recommendedTools = await getRecommendedTools(
    tool.id, 
    tool.category,
    tool.tags || [],
    3
  );

  return <ToolPageContent tool={tool} recommendedTools={recommendedTools} />;
}

// Generate static paths for all tools
export async function generateStaticParams() {
  const tools = await getTools();
  
  return tools.map((tool) => ({
    id: tool.id,
  }));
}
