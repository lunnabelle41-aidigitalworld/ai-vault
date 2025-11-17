'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Playfair_Display, Inter } from 'next/font/google';
import { FiSearch, FiFilter, FiX, FiStar, FiHeart, FiShare2, FiExternalLink, FiChevronRight } from 'react-icons/fi';

// Fonts
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Dynamic imports with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

// Types
type Tool = {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  image: string;
  rating: number;
  price: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  new?: boolean;
  launchDate?: string;
  upvotes?: number;
  saves?: number;
  innovationScore: number;
  expertReview: number;
  marketImpact: number;
};

// Sample data - replace with your actual data source
const premiumTools: Tool[] = [
  {
    id: 'figma-ai',
    name: 'Figma AI',
    category: 'Design',
    description: 'AI-powered design tool that transforms your ideas into high-fidelity designs instantly.',
    url: 'https://figma.com/ai',
    image: 'https://cdn.worldvectorlogo.com/logos/figma-1.svg',
    rating: 4.9,
    price: 'Freemium',
    tags: ['UI/UX', 'Design', 'Prototyping', 'AI-Powered'],
    featured: true,
    trending: true,
    innovationScore: 98,
    expertReview: 97,
    marketImpact: 95
  },
  // Add more tools here...
];

const categories = ['All', 'Design', 'Development', 'Productivity', 'Marketing', 'Writing'];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.9] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const ToolCard = ({ tool }: { tool: Tool }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / 20);
    const rotateX = ((centerY - y) / 20);
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative bg-gradient-to-br from-[#0A0F2C] to-[#1A1A1A] rounded-2xl p-0.5 overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00F5FF] via-[#00F5FF] to-[#FFD700] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      
      <div className="relative bg-[#0A0F2C] rounded-2xl p-6 h-full">
        {/* Tool Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <img 
              src={tool.image} 
              alt={tool.name} 
              className="w-12 h-12 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/48';
              }}
            />
            <div>
              <h3 className="text-xl font-bold text-white">{tool.name}</h3>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(tool.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">{tool.rating}</span>
              </div>
            </div>
          </div>
          
          {tool.featured && (
            <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A0F2C] text-xs font-bold px-3 py-1 rounded-full flex items-center">
              <FiStar className="mr-1" />
              Featured
            </div>
          )}
        </div>
        
        {/* Tool Description */}
        <p className="text-gray-300 mb-4 line-clamp-2">{tool.description}</p>
        
        {/* Innovation Score */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Innovation</span>
            <span>{tool.innovationScore}/100</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#00F5FF] to-[#00FFA3] h-2 rounded-full" 
              style={{ width: `${tool.innovationScore}%` }}
            />
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-[#1A1A1A] text-gray-300 text-xs rounded-full border border-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-800">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-[#00F5FF] hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Visit Site
            <FiExternalLink className="ml-1.5 h-4 w-4" />
          </a>
          
          <div className="flex items-center space-x-3">
            <button 
              className="p-2 text-gray-400 hover:text-[#00F5FF] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
            >
              <FiHeart className={`h-5 w-5 ${isSaved ? 'fill-current text-red-500' : ''}`} />
            </button>
            
            <button 
              className="px-4 py-2 bg-gradient-to-r from-[#00F5FF] to-[#00A3FF] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                // Handle view details
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PremiumToolsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll for header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter tools based on search and category
  const filteredTools = premiumTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen bg-[#0A0F2C] text-white ${playfair.variable} ${inter.variable} font-sans`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00F5FF]/10 to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center bg-[#00F5FF]/10 text-[#00F5FF] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#00F5FF] rounded-full mr-2 animate-pulse"></span>
              Curated Excellence - Only the Top 1% of AI Tools
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F5FF] via-[#00FFA3] to-[#FFD700] animate-gradient">
                The Crown Jewels
              </span>
              <br />
              <span className="text-white">of AI Innovation</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Discover the most powerful and transformative AI tools that are shaping the future of technology and business.
            </p>
            
            <div className="max-w-xl mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for AI tools..."
                  className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl py-4 pl-5 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00F5FF]/50 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              </div>
              <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
                <div className="bg-[#00F5FF] text-[#0A0F2C] text-xs font-medium px-3 py-1 rounded-full flex items-center">
                  <kbd className="bg-[#0A0F2C] text-[#00F5FF] rounded px-2 py-0.5 mr-1">⌘</kbd> + <kbd className="bg-[#0A0F2C] text-[#00F5FF] rounded px-2 py-0.5 ml-1">K</kbd> to search
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Categories */}
      <div 
        ref={headerRef}
        className={`sticky top-0 z-40 bg-[#0A0F2C]/95 backdrop-blur-md border-b border-gray-800/50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-[#00F5FF] to-[#00A3FF] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-3 ml-4">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                <FiFilter className="h-5 w-5" />
              </button>
              <div className="h-6 w-px bg-gray-800" />
              <div className="text-sm text-gray-400">
                {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tools Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredTools.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="mx-auto w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-6">
                <FiSearch className="h-12 w-12 text-[#00F5FF]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No tools found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                We couldn't find any tools matching your search. Try adjusting your filters.
              </p>
              <button 
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-[#00F5FF] to-[#00A3FF] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0F2C] to-[#0A0F2C]/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            Ready to discover the future of AI?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of innovators and businesses using the world's most advanced AI tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-[#00F5FF] to-[#00A3FF] text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
              Get Started - It's Free
            </button>
            <button className="px-8 py-4 border border-gray-700 text-white font-medium rounded-xl hover:bg-gray-800/50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
      
      <style jsx global>{`
        body {
          background-color: #0A0F2C;
          color: white;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
