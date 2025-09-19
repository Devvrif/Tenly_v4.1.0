import React from 'react';

interface Article {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  image: string | null;
  publishedAt: string;
}

const App: React.FC = () => {
  const [news, setNews] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://localhost:4000/api/news')
      .then(res => res.json())
      .then(data => {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e5e5',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        
        {/* Logo - Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>T</span>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>Tenly</div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '-2px' }}>News Hub</div>
          </div>
        </div>

        {/* Buttons - Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {/* Home Button */}
          <button style={{
            backgroundColor: '#dbeafe',
            color: '#2563eb',
            border: 'none',
            borderRadius: '10px',
            padding: '8px 12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>🏠</span>Home
          </button>

          {/* Favorites Button */}
          <button style={{
            backgroundColor: 'transparent',
            color: '#6b7280',
            border: 'none',
            borderRadius: '10px',
            padding: '8px 12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>❤️</span>Favorites
          </button>

          {/* Login Button */}
          <button style={{
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Sign In
          </button>
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
          Today's Top Stories
        </h1>

        {loading && <div>Loading news...</div>}

        {!loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {news.map((article, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                {article.image && (
                  <img 
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: '100%',
                      height: '160px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '12px'
                    }}
                  />
                )}
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  marginBottom: '8px',
                  color: '#1f2937',
                  lineHeight: '1.4'
                }}>
                  {article.title}
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#6b7280', 
                  marginBottom: '12px',
                  lineHeight: '1.4'
                }}>
                  {article.description}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {article.source.name}
                  </span>
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#2563eb',
                      fontSize: '14px',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;