import React from 'react';
import { Article } from '../types';

interface NewsCardProps {
  article: Article;
  isFavorite: boolean;
  onToggleFavorite: (article: Article) => void;
  onArticleClick?: (article: Article) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  isFavorite,
  onToggleFavorite,
  onArticleClick,
}) => {
  return (
    <div
      onClick={() => onArticleClick?.(article)}
      style={{
        backgroundColor: '#1e1e34',
        borderRadius: '24px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        height: 'fit-content',
        width: '100%',
        maxWidth: '400px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 32px 64px rgba(0, 0, 0, 0.4)';
        e.currentTarget.style.borderColor = 'rgba(233, 69, 96, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)';
      }}
    >
      {/* Image Container with Favorite Button */}
      <div style={{ 
        position: 'relative', 
        height: '240px', 
        overflow: 'hidden'
      }}>
        {(article.image_url || article.image) ? (
          <>
            <img
              src={article.image_url || article.image || ''}
              alt={article.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div style="
                      width: 100%; 
                      height: 100%; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center; 
                      background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
                      color: #9ca3af; 
                      font-size: 14px;
                      font-weight: 500;
                    ">
                      📰 No Image Available
                    </div>
                  `;
                }
              }}
            />
            
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
              pointerEvents: 'none'
            }}></div>
          </>
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
            color: '#9ca3af',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            📰 No Image Available
          </div>
        )}
        
        {/* Favorite Button - Properly positioned inside image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(article);
          }}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '44px',
            height: '44px',
            background: isFavorite 
              ? 'rgba(233, 69, 96, 0.9)' 
              : 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: isFavorite 
              ? '0 4px 20px rgba(233, 69, 96, 0.4)' 
              : '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.background = isFavorite 
              ? '#e94560' 
              : 'rgba(0, 0, 0, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = isFavorite 
              ? 'rgba(233, 69, 96, 0.9)' 
              : 'rgba(0, 0, 0, 0.6)';
          }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? "white" : "none"} 
            stroke="white" 
            strokeWidth="2"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {/* Title */}
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: 'white',
          lineHeight: '1.4',
          margin: 0,
          height: '3.5rem',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis',
          fontFamily: 'Inter, -apple-system, sans-serif'
        }}>
          {article.title}
        </h2>
        
        {/* Description */}
        <p style={{
          color: '#94a3b8',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          margin: 0,
          height: '4.5rem',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis'
        }}>
          {article.description}
        </p>
        
        {/* Meta Information */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: '#64748b',
          marginTop: 'auto'
        }}>
          <span style={{
            fontWeight: '600',
            color: '#e94560',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {article.source_id ?? "Unknown Source"}
          </span>
          <span>
            {article.pubDate
              ? new Date(article.pubDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              : "No Date"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;