import React, { useState } from 'react';
import { Article } from '../types';

interface HeaderProps {
  favorites: Article[];
  showFilters: boolean;
  isLoggedIn: boolean;
  user?: any; // Add user prop 
  onToggleFilters: () => void;
  onToggleLogin: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  favorites,
  showFilters,
  isLoggedIn,
  onToggleFilters,
  onToggleLogin,
  onHomeClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState('technology');

  return (
    <>
      <header style={{
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '85px'
        }}>
          
          {/* Logo Section */}
          <div 
            onClick={onHomeClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {/* Animated T Logo */}
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #e94560 0%, #f39c12 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(233, 69, 96, 0.4)'
            }}>
              <span style={{
                fontSize: '26px',
                fontWeight: '900',
                color: 'white',
                fontFamily: 'Inter, -apple-system, sans-serif',
                letterSpacing: '-1px',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}>
                T
              </span>
            </div>
            
            {/* Brand Name */}
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: 'white',
                margin: 0,
                fontFamily: 'Inter, -apple-system, sans-serif',
                letterSpacing: '-1px',
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Tenly
              </h1>
              <p style={{
                fontSize: '0.7rem',
                color: '#94a3b8',
                margin: 0,
                fontWeight: '600',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}>
                Intelligent News Insights
              </p>
            </div>
          </div>

          {/* Center Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '0.75rem 1rem',
            borderRadius: '20px',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            
            {/* Country Select */}
            <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: '500',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="us" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>🇺🇸 US</option>
              <option value="gb" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>🇬🇧 UK</option>
              <option value="in" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>🇮🇳 India</option>
              <option value="ca" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>🇨🇦 Canada</option>
              <option value="au" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>🇦🇺 Australia</option>
            </select>

            {/* Language Select */}
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: '500',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="en" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>English</option>
              <option value="es" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>Español</option>
              <option value="fr" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>Français</option>
              <option value="de" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>Deutsch</option>
              <option value="hi" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>हिंदी</option>
            </select>

            {/* Category Select */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: '500',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="general" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>All Topics</option>
              <option value="business" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>Business</option>
              <option value="technology" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>Technology</option>
              <option value="sports" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>Sports</option>
              <option value="entertainment" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>Entertainment</option>
              <option value="health" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>Health</option>
              <option value="science" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>Science</option>
            </select>

            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search breaking news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '0.5rem 2.5rem 0.5rem 0.75rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: 'white',
                  fontSize: '0.8rem',
                  outline: 'none',
                  width: '220px'
                }}
              />
              <svg 
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#94a3b8',
                  pointerEvents: 'none'
                }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </div>
          </div>

          {/* Right Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            
            {/* Home Button */}
            <button
              onClick={onHomeClick}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9.5L12 4l9 5.5v11a2 2 0 01-2 2H5a2 2 0 01-2-2v-11z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              Home
            </button>

            {/* Favorites */}
            <button 
              onClick={onToggleFilters}
              style={{
                background: 'rgba(233, 69, 96, 0.1)',
                border: '1px solid rgba(233, 69, 96, 0.3)',
                color: '#e94560',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              Favorites
              {favorites.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#e94560',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '10px',
                  minWidth: '20px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(233, 69, 96, 0.4)'
                }}>
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Login/Profile */}
            <button
              onClick={onToggleLogin}
              style={{
                background: isLoggedIn 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                  : 'linear-gradient(135deg, #e94560 0%, #f39c12 100%)',
                border: 'none',
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                padding: '0.75rem 1.25rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: isLoggedIn 
                  ? '0 8px 25px rgba(16, 185, 129, 0.3)' 
                  : '0 8px 25px rgba(233, 69, 96, 0.3)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {isLoggedIn ? 'Profile' : 'Sign In'}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;