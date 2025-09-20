import React, { useState, useEffect } from 'react';

interface Article {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  image: string | null;
  publishedAt: string;
}

interface Filters {
  country: string;
  language: string;
  category: string;
  query: string;
}

const App: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    country: 'us',
    language: 'en',
    category: 'technology',
    query: 'technology'
  });

  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'in', name: 'India' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' }
  ];

  const categories = [
    { code: 'technology', name: 'Technology' },
    { code: 'business', name: 'Business' },
    { code: 'health', name: 'Health' },
    { code: 'science', name: 'Science' },
    { code: 'sports', name: 'Sports' },
    { code: 'entertainment', name: 'Entertainment' },
    { code: 'politics', name: 'Politics' }
  ];

  const fetchNews = async (isLoadMore = false) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    try {
      const params = new URLSearchParams({
        query: filters.query,
        category: filters.category,
        country: filters.country,
        language: filters.language,
        imageRequired: 'true'
      });

      const response = await fetch(`http://localhost:4000/api/news?${params}`);
      const data = await response.json();
      
      if (isLoadMore) {
        setNews(prev => [...prev, ...(data.articles || [])]);
      } else {
        setNews(data.articles || []);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchNews();
    setShowFilters(false);
  };

  const toggleFavorite = (article: Article) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.url === article.url);
      if (exists) {
        return prev.filter(fav => fav.url !== article.url);
      } else {
        return [...prev, article];
      }
    });
  };

  const isFavorite = (article: Article) => {
    return favorites.some(fav => fav.url === article.url);
  };

  const goHome = () => {
    setSelectedArticle(null);
    setShowFavorites(false);
    setShowFilters(false);
  };

  const currentNews = showFavorites ? favorites : news;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', margin: 0, padding: 0, backgroundColor: '#fafbfc', minHeight: '100vh' }}>
      
      {/* Enhanced Sticky Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        
        {/* Enhanced Logo with Perfect T */}
        <div 
          onClick={goHome}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '14px', 
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            padding: '8px 12px',
            borderRadius: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(79, 70, 229, 0.25)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div style={{
              fontSize: '22px',
              fontWeight: '800',
              color: 'white',
              fontFamily: 'Georgia, serif',
              letterSpacing: '-1px'
            }}>
              T
            </div>
          </div>
          <div>
            <div style={{ 
              fontSize: '22px', 
              fontWeight: '800', 
              background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              Tenly
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#64748b', 
              fontWeight: '500',
              marginTop: '-2px',
              letterSpacing: '0.3px'
            }}>
              News Redefined
            </div>
          </div>
        </div>

        {/* Dynamic Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {/* Filter Button */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            style={{
              background: showFilters 
                ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' 
                : 'rgba(248, 250, 252, 0.8)',
              color: showFilters ? 'white' : '#475569',
              border: showFilters ? 'none' : '1px solid rgba(226, 232, 240, 0.8)',
              borderRadius: '10px',
              padding: '9px 14px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)',
              boxShadow: showFilters ? '0 4px 12px rgba(79, 70, 229, 0.25)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              if (!showFilters) {
                e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showFilters) {
                e.currentTarget.style.backgroundColor = 'rgba(248, 250, 252, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
              }
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"/>
            </svg>
            Filters
          </button>

          {/* Home Button */}
          <button 
            onClick={goHome}
            style={{
              background: (!selectedArticle && !showFavorites) 
                ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' 
                : 'rgba(248, 250, 252, 0.8)',
              color: (!selectedArticle && !showFavorites) ? 'white' : '#475569',
              border: (!selectedArticle && !showFavorites) ? 'none' : '1px solid rgba(226, 232, 240, 0.8)',
              borderRadius: '10px',
              padding: '9px 14px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: (!selectedArticle && !showFavorites) ? '0 4px 12px rgba(59, 130, 246, 0.25)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              if (selectedArticle || showFavorites) {
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedArticle || showFavorites) {
                e.currentTarget.style.backgroundColor = 'rgba(248, 250, 252, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
              }
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Home
          </button>

          {/* Favorites Button */}
          <button 
            onClick={() => setShowFavorites(!showFavorites)}
            style={{
              background: showFavorites 
                ? 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' 
                : 'rgba(248, 250, 252, 0.8)',
              color: showFavorites ? 'white' : '#475569',
              border: showFavorites ? 'none' : '1px solid rgba(226, 232, 240, 0.8)',
              borderRadius: '10px',
              padding: '9px 14px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              position: 'relative',
              boxShadow: showFavorites ? '0 4px 12px rgba(236, 72, 153, 0.25)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              if (!showFavorites) {
                e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showFavorites) {
                e.currentTarget.style.backgroundColor = 'rgba(248, 250, 252, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
              }
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={showFavorites ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            Favorites
            {favorites.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '10px',
                padding: '2px 6px',
                fontSize: '10px',
                fontWeight: '600',
                minWidth: '18px',
                textAlign: 'center'
              }}>
                {favorites.length}
              </span>
            )}
          </button>

          {/* Login/Logout Button */}
          <button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            style={{
              background: isLoggedIn 
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '9px 16px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: isLoggedIn 
                ? '0 4px 12px rgba(16, 185, 129, 0.25)' 
                : '0 4px 12px rgba(99, 102, 241, 0.25)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = isLoggedIn 
                ? '0 6px 20px rgba(16, 185, 129, 0.35)' 
                : '0 6px 20px rgba(99, 102, 241, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = isLoggedIn 
                ? '0 4px 12px rgba(16, 185, 129, 0.25)' 
                : '0 4px 12px rgba(99, 102, 241, 0.25)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isLoggedIn ? (
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5m0 0l-5-5m5 5H9"/>
              ) : (
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-5-4l-5-5m0 0l5-5m-5 5h16"/>
              )}
            </svg>
            {isLoggedIn ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </header>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            {/* Article Header */}
            <div style={{
              position: 'sticky',
              top: 0,
              backgroundColor: 'white',
              borderRadius: '16px 16px 0 0',
              padding: '20px 24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setSelectedArticle(null)}
                  style={{
                    background: 'rgba(75, 85, 99, 0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2">
                    <path d="M19 12H5m7-7l-7 7 7 7"/>
                  </svg>
                </button>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>
                  {selectedArticle.source.name}
                </span>
              </div>
              
              <button
                onClick={() => toggleFavorite(selectedArticle)}
                style={{
                  background: isFavorite(selectedArticle) 
                    ? 'rgba(239, 68, 68, 0.1)' 
                    : 'rgba(156, 163, 175, 0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite(selectedArticle) ? "#ef4444" : "none"} stroke={isFavorite(selectedArticle) ? "#ef4444" : "#9ca3af"} strokeWidth="2">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>

            {/* Article Content */}
            <div style={{ padding: '0 24px 24px' }}>
              {selectedArticle.image && (
                <img 
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    marginBottom: '24px'
                  }}
                />
              )}
              
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#111827',
                lineHeight: '1.3',
                marginBottom: '16px'
              }}>
                {selectedArticle.title}
              </h1>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f3f4f6'
              }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  {new Date(selectedArticle.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#374151',
                marginBottom: '32px'
              }}>
                {selectedArticle.description}
              </div>
              
              <a
                href={selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(79, 70, 229, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.25)';
                }}
              >
                Read Full Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17l10-10M17 7H7v10"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div style={{
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '20px'
            }}>
              
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                  Search Query
                </label>
                <input
                  type="text"
                  value={filters.query}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                  placeholder="Enter keywords..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat.code} value={cat.code}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                  Country
                </label>
                <select
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>{country.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                  Language
                </label>
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={applyFilters}
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Apply Filters
              </button>
              <button
                onClick={() => setShowFilters(false)}
                style={{
                  background: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: '800', 
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            {showFavorites ? `Your Favorites (${favorites.length})` : "Today's Top Stories"}
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {showFavorites 
              ? "Your saved articles for later reading" 
              : "Stay informed with the latest news from around the world, curated just for you."
            }
          </p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '80px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #f1f5f9',
              borderTop: '3px solid #4f46e5',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <p style={{ color: '#64748b', fontSize: '16px' }}>Loading latest news...</p>
          </div>
        )}

        {showFavorites && favorites.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'rgba(236, 72, 153, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              No favorites yet
            </h3>
            <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '24px' }}>
              Start adding articles to your favorites by clicking the heart icon
            </p>
            <button
              onClick={goHome}
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Explore News
            </button>
          </div>
        )}

        {!loading && currentNews.length > 0 && (
          <>
            {/* News Grid with Favorite Hearts */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px',
              marginBottom: '48px'
            }}>
              {currentNews.map((article, index) => (
                <article key={index} style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  position: 'relative'
                }}>
                  {/* Favorite Button on Card */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(article);
                    }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill={isFavorite(article) ? "#ef4444" : "none"} 
                      stroke={isFavorite(article) ? "#ef4444" : "#6b7280"} 
                      strokeWidth="2"
                    >
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>

                  <div onClick={() => setSelectedArticle(article)}>
                    {article.image && (
                      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                        <img 
                          src={article.image}
                          alt={article.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '12px',
                          background: 'rgba(0, 0, 0, 0.8)',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backdropFilter: 'blur(4px)'
                        }}>
                          {article.source.name}
                        </div>
                      </div>
                    )}
                    
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '700', 
                        marginBottom: '12px',
                        color: '#1f2937',
                        lineHeight: '1.4'
                      }}>
                        {article.title}
                      </h3>
                      
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#64748b', 
                        marginBottom: '16px',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {article.description}
                      </p>
                      
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                      }}>
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                        <span style={{
                          color: '#4f46e5',
                          fontSize: '14px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          Read More
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Section - Only show when not viewing favorites */}
            {!showFavorites && (
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => fetchNews(true)}
                  disabled={loadingMore}
                  style={{
                    background: loadingMore 
                      ? 'rgba(156, 163, 175, 0.2)' 
                      : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    color: loadingMore ? '#9ca3af' : 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: loadingMore ? 'not-allowed' : 'pointer',
                    boxShadow: loadingMore ? 'none' : '0 4px 12px rgba(79, 70, 229, 0.25)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    margin: '0 auto'
                  }}
                  onMouseEnter={(e) => {
                    if (!loadingMore) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(79, 70, 229, 0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loadingMore) {
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.25)';
                    }
                  }}
                >
                  {loadingMore && (
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #d1d5db',
                      borderTop: '2px solid #9ca3af',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                  )}
                  {loadingMore ? 'Loading More...' : 'Load More Stories'}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Premium Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        color: 'white',
        padding: '48px 24px 32px',
        marginTop: '80px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginBottom: '32px'
          }}>
            
            {/* Brand Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: 'white', fontFamily: 'Georgia, serif' }}>T</span>
                </div>
                <span style={{ fontSize: '24px', fontWeight: '700' }}>Tenly</span>
              </div>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '16px' }}>
                Your trusted source for real-time news and stories that matter. Stay informed, stay ahead.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </div>
                <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s ease' }}>Home</a>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s ease' }}>About Us</a>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s ease' }}>Privacy Policy</a>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s ease' }}>Terms of Service</a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Categories</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {categories.slice(0, 4).map(cat => (
                  <a key={cat.code} href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s ease' }}>
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Stay Updated</h4>
              <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '16px' }}>
                Subscribe to our newsletter for daily news updates.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
                <button style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
              © 2025 Tenly. All rights reserved. Built with passion for quality journalism.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Terms</a>
              <a href="#" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}>Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default App;