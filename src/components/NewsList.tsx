import React from 'react';
import { useNews, NewsArticle } from '../hooks/useNews';

const NewsList = () => {
  const { news, loading, error } = useNews();

  // Helper function to safely get source name
  const getSourceName = (source: { name: string }): string => {
    return source?.name || 'News';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="mb-8">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Something went wrong</h3>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No news available</h3>
          <p className="text-gray-600">Check back later for the latest updates.</p>
        </div>
      </div>
    );
  }

  const articles = news as NewsArticle[];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Today's <span className="text-blue-600">Top Stories</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay informed with the latest news from around the world, curated just for you.
        </p>
        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live • {articles.length} articles updated
          </div>
        </div>
      </div>

      {/* Featured Article (First Article) */}
      {articles.length > 0 && (
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 text-white">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                    Featured Story
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  {articles[0]?.title || 'Loading...'}
                </h2>
                <p className="text-blue-100 mb-6 text-lg">
                  {articles[0]?.description || 'Click to read the full story and stay updated with the latest developments.'}
                </p>
                <a
                  href={articles[0]?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                >
                  Read Full Story
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              {articles[0]?.image && (
                <div className="h-64 md:h-full">
                  <img
                    src={articles[0].image}
                    alt={articles[0]?.title || 'News image'}
                    className="w-full h-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      if (target.parentElement) {
                        target.parentElement.style.display = 'none';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.slice(1).map((article, index) => (
          <article
            key={`${article.url}-${index}`}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Article Image */}
            {article?.image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article?.title || 'News image'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    if (target.parentElement) {
                      target.parentElement.style.display = 'none';
                    }
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded-full">
                    {getSourceName(article?.source)}
                  </span>
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="p-6">
              <div className="mb-3">
                <span className="text-sm text-blue-600 font-medium">
                  News
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors">
                <a
                  href={article?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {article?.title || 'Loading...'}
                </a>
              </h3>

              {article?.description && (
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {article.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article?.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Today'}
                </div>
                
                <a
                  href={article?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center transition-colors"
                >
                  Read more
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
          Load More Stories
        </button>
      </div>
    </div>
  );
};

export default NewsList;