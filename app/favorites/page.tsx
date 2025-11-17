'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faHeart as faHeartSolid, 
  faHeart as faHeartRegular, 
  faSearch, 
  faList, 
  faTh, 
  faShare, 
  faFilter 
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { Tool } from '@/types/tool';
import { getToolById } from '@/lib/tools';
import FavoritesButton from '@/components/Favorites/FavoritesButton';

const FavoritesPage = () => {
  const [favoriteTools, setFavoriteTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = async () => {
      const storedFavorites = localStorage.getItem('favoriteTools');
      if (storedFavorites) {
        const favoriteIds = JSON.parse(storedFavorites) as string[];
        const toolPromises = favoriteIds.map(id => getToolById(id));
        const tools = (await Promise.all(toolPromises)).filter((tool): tool is Tool => tool !== undefined);
        setFavoriteTools(tools);
      }
      setIsLoading(false);
    };

    // Add event listener for storage changes (in case favorites are updated in another tab)
    window.addEventListener('storage', loadFavorites);
    loadFavorites();

    return () => {
      window.removeEventListener('storage', loadFavorites);
    };
  }, []);

  const filteredTools = favoriteTools.filter((tool: Tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tool.description && tool.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All Categories', ...Array.from(new Set(favoriteTools.map((tool: Tool) => tool.category)))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Saved Tools
            </motion.h1>
            <p className="text-xl text-indigo-100">Loading your favorite AI tools...</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-xl shadow-sm animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Link href="/" className="mr-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Favorites</h1>
      </div>

      {favoriteTools.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
            <FontAwesomeIcon icon={faHeartRegular} className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No favorites yet</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Save your favorite AI tools to find them here later!</p>
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Browse Tools
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTools.map((tool: Tool) => (
            <div 
              key={tool.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    {tool.logo && (
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-3 overflow-hidden">
                        <img 
                          src={tool.logo} 
                          alt={`${tool.name} logo`} 
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/placeholder-logo.svg';
                          }}
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {tool.name}
                    </h3>
                  </div>
                  <FavoritesButton tool={tool} size="sm" showLabel={false} />
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {tool.pricing}
                  </span>
                  <Link 
                    href={`/tools/${tool.id}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
