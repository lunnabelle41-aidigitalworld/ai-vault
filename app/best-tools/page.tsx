'use client';

import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiSearch, 
  FiFilter, 
  FiChevronDown, 
  FiStar, 
  FiExternalLink, 
  FiArrowRight, 
  FiHeart, 
  FiBookmark, 
  FiAward, 
  FiTrendingUp, 
  FiZap, 
  FiShare2, 
  FiCheck, 
  FiClock 
} from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Playfair_Display, Inter } from 'next/font/google';

// Fonts
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Dynamically import Navbar and Footer with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

// Types
type PriceTier = 'Free' | 'Freemium' | 'Paid' | 'Contact' | 'Open Source';

type Tool = {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  image: string;
  rating: number;
  price: PriceTier;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  launchDate?: string;
  upvotes?: number;
  saves?: number;
  innovationScore?: number;
  expertReview?: number;
  marketImpact?: number;
};

// Sample data
const allTools: Tool[] = [
  {
    id: 'figma-ai',
    name: 'Figma AI',
    category: 'Design',
    description: 'AI-powered design tool that transforms your ideas into high-fidelity designs instantly.',
    url: 'https://figma.com/ai',
    image: 'https://cdn.worldvectorlogo.com/logos/figma-1.svg',
    rating: 4.9,
    price: 'Freemium' as const,
    tags: ['UI/UX', 'Design', 'Prototyping', 'AI-Powered'],
    featured: true,
    trending: true,
    isNew: true,
    innovationScore: 98,
    expertReview: 97,
    marketImpact: 95,
    upvotes: 1243,
    saves: 856,
    launchDate: '2022-10-12'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'Art',
    description: 'AI art generation tool that creates stunning images from text descriptions.',
    url: 'https://midjourney.com',
    image: 'https://pbs.twimg.com/profile_images/1594409615689175040/7vzBzX2A_400x400.jpg',
    rating: 4.8,
    price: 'Paid' as const,
    tags: ['Art', 'Image Generation', 'AI Art', 'Creative'],
    trending: true,
    innovationScore: 95,
    expertReview: 96,
    marketImpact: 94,
    upvotes: 2156,
    saves: 1342,
    launchDate: '2022-07-22'
  },
  // Add more tools as needed
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI Chat',
    description: 'Advanced AI language model that can understand and generate human-like text.',
    url: 'https://chat.openai.com',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    rating: 4.9,
    price: 'Freemium' as const,
    tags: ['AI Chat', 'Text Generation', 'Productivity'],
    featured: true,
    trending: true,
    isNew: false,
    innovationScore: 99,
    expertReview: 98,
    marketImpact: 99,
    upvotes: 3567,
    saves: 2456,
    launchDate: '2022-11-30'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'Development',
    description: 'AI pair programmer that helps you write better code faster.',
    url: 'https://github.com/features/copilot',
    image: 'https://github.githubassets.com/images/modules/site/icons/open_graph/github-mark.png',
    rating: 4.7,
    price: 'Paid' as const,
    tags: ['Coding', 'AI Assistant', 'Productivity'],
    featured: true,
    trending: true,
    isNew: false,
    innovationScore: 97,
    expertReview: 96,
    marketImpact: 95,
    upvotes: 2890,
    saves: 1987,
    launchDate: '2021-10-27'
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'Productivity',
    description: 'AI-powered workspace that helps you write better, think more clearly, and stay organized.',
    url: 'https://www.notion.so/product/ai',
    image: 'https://www.notion.so/cdn-cgi/image/format=auto,width=128,quality=100/front-static/pages/home/notion-app-icon-1.png',
    rating: 4.6,
    price: 'Freemium' as const,
    tags: ['Productivity', 'Note Taking', 'AI Writing'],
    featured: true,
    trending: true,
    isNew: true,
    innovationScore: 94,
    expertReview: 93,
    marketImpact: 92,
    upvotes: 1876,
    saves: 1456,
    launchDate: '2023-02-22'
  }
];

// Price badge component
const PriceBadge = ({ price }: { price: PriceTier }) => {
  const priceStyles = {
    'Free': 'bg-green-100 text-green-800',
    'Freemium': 'bg-purple-100 text-purple-800',
    'Paid': 'bg-blue-100 text-blue-800',
    'Contact': 'bg-yellow-100 text-yellow-800',
    'Open Source': 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priceStyles[price] || 'bg-gray-100 text-gray-800'}`}>
      {price}
    </span>
  );
};

// Tool card component
const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <div 
      className="group relative bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-10 transition-all duration-300 border border-white border-opacity-10 hover:border-opacity-20 overflow-hidden cursor-pointer"
      onClick={() => window.open(tool.url, '_blank')}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white bg-opacity-10 flex items-center justify-center">
              <img src={tool.image} alt={tool.name} className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-400">{tool.category}</span>
                <span className="text-gray-600">•</span>
                <div className="flex items-center text-amber-400">
                  <FiStar className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm text-gray-400">{tool.rating}</span>
                </div>
                {tool.isNew && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    New
                  </span>
                )}
              </div>
            </div>
          </div>
          <PriceBadge price={tool.price} />
        </div>
        
        <p className="text-gray-300 text-sm mb-4 flex-grow">{tool.description}</p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {tool.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white bg-opacity-10 text-gray-300">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-10">
            <div className="flex space-x-2">
              <button 
                className="p-2 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle like action
                }}
              >
                <FiHeart className="w-4 h-4 text-gray-400" />
              </button>
              <button 
                className="p-2 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle bookmark action
                }}
              >
                <FiBookmark className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <Link 
              href={`/tools/${tool.id}`}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
              <FiArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00F5FF]/20 via-[#00A3FF]/20 to-[#FFD700]/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

export default function BestToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let result = [...allTools];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(tool => tool.category === activeCategory);
    }

    // Sort the results
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => (b.launchDate || '').localeCompare(a.launchDate || ''));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        result = result.filter(tool => tool.featured);
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
        break;
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allTools.map(tool => tool.category));
    return ['All', ...Array.from(cats)];
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0A0F2C] to-[#1A1A1A] text-white ${playfair.variable} ${inter.variable} font-sans`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00F5FF]/10 to-transparent -z-10" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#00F5FF]/5 rounded-full filter blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Best AI Tools of {new Date().getFullYear()}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Handpicked collection of the most innovative and powerful AI tools to boost your productivity and creativity.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={searchRef}
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-700 rounded-xl bg-gray-900 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <div className="relative">
                <select
                  className="appearance-none bg-gray-900 bg-opacity-50 border border-gray-700 text-white text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <FiChevronDown className="h-4 w-4" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none bg-gray-900 bg-opacity-50 border border-gray-700 text-white text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="featured">Featured</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <FiChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.6,
                      ease: [0.6, -0.05, 0.01, 0.9]
                    }
                  }
                }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </motion.div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-300">No tools found</h3>
              <p className="mt-2 text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
