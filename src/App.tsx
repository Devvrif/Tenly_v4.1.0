import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import Footer from './components/Footer';
import { Article } from './types';

// Environment configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Utility functions
const getArticleImage = (article: Article) => article.image || article.image_url || '';
const getArticleURL = (article: Article) => article.url || article.link || '#';
const getArticleSource = (article: Article) => article.source?.name || article.source_id || 'Unknown';
const getArticleDate = (article: Article) => article.publishedAt || article.pubDate || new Date().toISOString();

// Normalize API response
const normalizeArticle = (article: any): Article => ({
  title: article.title,
  description: article.description,
  url: article.url || article.link || '',
  image: article.image || article.image_url || '',
  publishedAt: article.publishedAt || article.pubDate || new Date().toISOString(),
  source: { name: article.source?.name || article.source_id || 'Unknown' },
  source_id: article.source_id || '',
  image_url: article.image_url || '',
  pubDate: article.pubDate || '',
  link: article.link || '',
});

const App: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async (isLoadMore = false) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        query: 'technology',
        category: 'technology',
        country: 'us',
        language: 'en',
        imageRequired: 'true'
      });

      const response = await fetch(`${API_BASE_URL}/api/news?${params}`);
      if (!response.ok) throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);

      const data = await response.json();
      if (!data || !Array.isArray(data.articles)) throw new Error('Invalid API response format');

      const normalizedArticles = data.articles.map(normalizeArticle);

      if (isLoadMore) setNews(prev => [...prev, ...normalizedArticles]);
      else setNews(normalizedArticles);

    } catch (err) {
      console.error('Error fetching news:', err);
      const msg = err instanceof Error ? err.message : 'Failed to fetch news. Check backend server.';
      setError(msg);
    } finally {
      if (isLoadMore) setLoadingMore(false);
      else setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  // Favorites persistence
  useEffect(() => {
    const saved = localStorage.getItem('news-favorites');
    if (saved) {
      try { setFavorites(JSON.parse(saved)); }
      catch (err) { console.error('Error loading favorites:', err); }
    }
  }, []);

  useEffect(() => { localStorage.setItem('news-favorites', JSON.stringify(favorites)); }, [favorites]);

  const toggleFavorite = useCallback((article: Article) => {
    setFavorites(prev => prev.find(f => f.url === article.url)
      ? prev.filter(f => f.url !== article.url)
      : [...prev, article]
    );
  }, []);

  const isFavorite = useCallback((article: Article) => favorites.some(f => f.url === article.url), [favorites]);

  const handleToggleFilters = useCallback(() => setShowFilters(prev => !prev), []);
  const handleToggleLogin = useCallback(() => setIsLoggedIn(prev => !prev), []);
  const handleHomeClick = useCallback(() => { setSelectedArticle(null); setShowFilters(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  const handleArticleClick = useCallback((article: Article) => setSelectedArticle(article), []);
  const handleCloseModal = useCallback(() => setSelectedArticle(null), []);
  const handleLoadMore = useCallback(() => { if (!loadingMore) fetchNews(true); }, [fetchNews, loadingMore]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape' && selectedArticle) handleCloseModal(); };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedArticle, handleCloseModal]);

  const formatDate = (dateString: string) => {
    try { return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch { return 'Unknown date'; }
  };

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', margin: 0, padding: 0, background: '#0a0a1a', color: '#fff', minHeight: '100vh', letterSpacing: '-0.01em', position: 'relative' }}>
      {/* Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: `radial-gradient(circle at 20% 20%, rgba(233,69,96,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(243,156,18,0.03) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(15,52,96,0.05) 0%, transparent 50%)`, zIndex: -1, pointerEvents: 'none' }} />

      <Header favorites={favorites} showFilters={showFilters} isLoggedIn={isLoggedIn} onToggleFilters={handleToggleFilters} onToggleLogin={handleToggleLogin} onHomeClick={handleHomeClick} />

      {/* Article Modal */}
      {selectedArticle && (
        <div style={{ position: 'fixed', top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.9)', backdropFilter:'blur(20px)', zIndex:2000, display:'flex',alignItems:'center',justifyContent:'center', padding:'20px' }}
          onClick={e => e.target === e.currentTarget && handleCloseModal()}>
          <div style={{ backgroundColor:'#1e1e34', borderRadius:'24px', maxWidth:'900px', maxHeight:'90vh', overflow:'auto', position:'relative', boxShadow:'0 32px 64px rgba(0,0,0,0.4)', border:'1px solid rgba(148,163,184,0.1)' }}>
            {/* Modal Header */}
            <div style={{ position:'sticky', top:0, background:'linear-gradient(135deg, #1e1e34 0%, #1a1a2e 100%)', borderRadius:'24px 24px 0 0', padding:'1.5rem 2rem', borderBottom:'1px solid rgba(148,163,184,0.1)', display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:10, backdropFilter:'blur(20px)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                <button onClick={handleCloseModal} style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:'12px', padding:'10px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#94a3b8', transition:'all 0.3s ease' }} aria-label="Close modal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5m7-7l-7 7 7 7"/></svg>
                </button>
                <span style={{ fontSize:'0.9rem', fontWeight:'600', color:'#e94560', textTransform:'uppercase', letterSpacing:'0.5px' }}>{getArticleSource(selectedArticle)}</span>
              </div>
              <button onClick={() => toggleFavorite(selectedArticle)} style={{ background:isFavorite(selectedArticle)?'rgba(233,69,96,0.2)':'rgba(255,255,255,0.08)', border:isFavorite(selectedArticle)?'1px solid rgba(233,69,96,0.3)':'1px solid rgba(255,255,255,0.15)', borderRadius:'12px', padding:'10px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.3s ease' }} aria-label={isFavorite(selectedArticle)?'Remove from favorites':'Add to favorites'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite(selectedArticle)?"#e94560":"none"} stroke={isFavorite(selectedArticle)?"#e94560":"#94a3b8"} strokeWidth="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding:'0 2rem 2rem' }}>
              {getArticleImage(selectedArticle) && <img src={getArticleImage(selectedArticle)} alt={selectedArticle.title} style={{ width:'100%', height:'350px', objectFit:'cover', borderRadius:'16px', marginBottom:'2rem' }} onError={e => (e.target as HTMLImageElement).style.display='none'} />}
              <h1 style={{ fontSize:'2rem', fontWeight:'800', color:'#fff', lineHeight:'1.3', marginBottom:'1rem' }}>{selectedArticle.title}</h1>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2rem', paddingBottom:'1rem', borderBottom:'1px solid rgba(148,163,184,0.1)' }}>
                <span style={{ fontSize:'0.9rem', color:'#94a3b8' }}>{formatDate(getArticleDate(selectedArticle))}</span>
              </div>
              {selectedArticle.description && <div style={{ fontSize:'1.1rem', lineHeight:'1.8', color:'#94a3b8', marginBottom:'2rem' }}>{selectedArticle.description}</div>}
              <a href={getArticleURL(selectedArticle)} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'linear-gradient(135deg, #e94560 0%, #f39c12 100%)', color:'white', textDecoration:'none', padding:'1rem 2rem', borderRadius:'16px', fontSize:'1rem', fontWeight:'600', boxShadow:'0 8px 25px rgba(233,69,96,0.3)', transition:'all 0.3s ease' }}>Read Full Article</a>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ padding:'4rem 2rem', maxWidth:'1400px', margin:'0 auto' }}>
        {/* Hero Section */}
        <div style={{ textAlign:'center', marginBottom:'4rem', padding:'3rem 0' }}>
          <h1 style={{ fontSize:'clamp(3rem, 8vw, 4.5rem)', fontWeight:'900', marginBottom:'1.5rem', background:'linear-gradient(135deg, #fff 0%, #e94560 50%, #f39c12 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:'-2px', lineHeight:'1.1' }}>Today's Top Stories</h1>
          <p style={{ fontSize:'1.25rem', color:'#94a3b8', maxWidth:'600px', margin:'0 auto 2rem', fontWeight:'400', lineHeight:'1.6' }}>Stay ahead with AI-curated news that matters. Get intelligent insights from trusted sources worldwide.</p>
        </div>

        {/* Loading */}
        {loading && <div style={{ textAlign:'center', padding:'6rem 0', display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem' }}><div style={{ width:'50px', height:'50px', border:'3px solid rgba(233,69,96,0.2)', borderTop:'3px solid #e94560', borderRadius:'50%', animation:'spin 1s linear infinite' }}/><p style={{ color:'#94a3b8', fontSize:'1.1rem', fontWeight:'500' }}>Curating today's most important stories...</p></div>}

        {/* Error */}
        {error && <div style={{ textAlign:'center', padding:'4rem', background:'rgba(233,69,96,0.05)', borderRadius:'24px', border:'1px solid rgba(233,69,96,0.2)', margin:'2rem 0' }}>
          <div style={{ fontSize:'1.25rem', color:'#e94560', marginBottom:'1rem', fontWeight:'600' }}>{error}</div>
          <button onClick={() => fetchNews()} style={{ background:'linear-gradient(135deg, #e94560 0%, #f39c12 100%)', color:'white', border:'none', borderRadius:'16px', padding:'1rem 2rem', fontSize:'1rem', fontWeight:'600', cursor:'pointer', boxShadow:'0 8px 25px rgba(233,69,96,0.3)'}}>Try Again</button>
        </div>}

        {/* News Grid */}
        {!loading && !error && news.length > 0 && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(380px, 1fr))', gap:'2rem', marginBottom:'4rem', justifyItems:'center' }}>
              {news.map((article, index) => (
                <NewsCard key={article.url || `article-${index}`} article={article} isFavorite={isFavorite(article)} onToggleFavorite={toggleFavorite} onArticleClick={handleArticleClick} />
              ))}
            </div>
            <div style={{ textAlign:'center', margin:'3rem 0' }}>
              <button onClick={handleLoadMore} disabled={loadingMore} style={{ background:loadingMore?'rgba(156,163,175,0.2)':'linear-gradient(135deg, #e94560 0%, #f39c12 100%)', color:loadingMore?'#9ca3af':'white', border:'none', borderRadius:'50px', padding:'1rem 3rem', fontSize:'1rem', fontWeight:'600', cursor:loadingMore?'not-allowed':'pointer', boxShadow:loadingMore?'none':'0 8px 25px rgba(233,69,96,0.3)', display:'flex', alignItems:'center', gap:'0.5rem', margin:'0 auto' }}>{loadingMore && <div style={{ width:'16px', height:'16px', border:'2px solid #d1d5db', borderTop:'2px solid #9ca3af', borderRadius:'50%', animation:'spin 1s linear infinite' }} />} {loadingMore?'Loading More...':'Load More Stories'}</button>
            </div>
          </>
        )}

        {/* Empty */}
        {!loading && !error && news.length === 0 && <div style={{ textAlign:'center', padding:'6rem' }}>
          <div style={{ fontSize:'1.25rem', color:'#94a3b8', marginBottom:'1.5rem', fontWeight:'600' }}>No news articles available at the moment.</div>
          <button onClick={() => fetchNews()} style={{ background:'linear-gradient(135deg, #e94560 0%, #f39c12 100%)', color:'white', border:'none', borderRadius:'16px', padding:'1rem 2rem', fontSize:'1rem', fontWeight:'600', cursor:'pointer', boxShadow:'0 8px 25px rgba(233,69,96,0.3)'}}>Refresh</button>
        </div>}
      </main>

      <Footer />

      <style>{`@keyframes spin {0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
    </div>
  );
};

export default App;
