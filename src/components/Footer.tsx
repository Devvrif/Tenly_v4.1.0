import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
      borderTop: '1px solid rgba(148, 163, 184, 0.1)',
      marginTop: '6rem',
      padding: '4rem 0 2rem',
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(233, 69, 96, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(243, 156, 18, 0.03) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }}></div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          
          {/* Brand Section */}
          <div style={{ maxWidth: '350px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #e94560 0%, #f39c12 100%)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: '900',
                color: 'white',
                boxShadow: '0 8px 25px rgba(233, 69, 96, 0.3)'
              }}>
                T
              </div>
              
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                color: 'white',
                margin: 0,
                fontFamily: 'Inter, -apple-system, sans-serif'
              }}>
                Tenly
              </h3>
            </div>
            
            <p style={{
              color: '#94a3b8',
              lineHeight: '1.7',
              marginBottom: '2rem',
              fontSize: '0.95rem'
            }}>
              Tenly delivers intelligent news insights powered by AI, connecting you with the stories that shape our world. Experience journalism reimagined for the digital age.
            </p>
            
            {/* Newsletter Signup */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                color: 'white',
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                margin: 0
              }}>
                Stay Updated
              </h4>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.85rem',
                marginBottom: '1rem',
                margin: '0 0 1rem 0'
              }}>
                Get the latest news delivered to your inbox
              </p>
              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: 'white',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
                <button style={{
                  background: 'linear-gradient(135deg, #e94560 0%, #f39c12 100%)',
                  border: 'none',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease'
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0'
            }}>
              Explore
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                'Latest News',
                'Trending Stories', 
                'World News',
                'Technology',
                'Business',
                'Sports',
                'Health',
                'Science'
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '0.75rem' }}>
                  <button
                    style={{
                      color: '#94a3b8',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e94560';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#94a3b8';
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0'
            }}>
              Resources
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                'About Us',
                'Editorial Policy',
                'Fact-Checking',
                'API Access',
                'Press Kit',
                'Careers',
                'Advertise',
                'Partnerships'
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '0.75rem' }}>
                  <button
                    style={{
                      color: '#94a3b8',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e94560';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#94a3b8';
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Social */}
          <div>
            <h3 style={{
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0'
            }}>
              Support
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 2rem 0'
            }}>
              {[
                'Help Center',
                'Contact Us',
                'Privacy Policy',
                'Terms of Service',
                'Cookie Policy',
                'Report Issue'
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '0.75rem' }}>
                  <button
                    style={{
                      color: '#94a3b8',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e94560';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#94a3b8';
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <h4 style={{
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: '700',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              Follow Us
            </h4>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}>
              {[
                { name: 'Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'YouTube', icon: 'M23.498 6.186a2.978 2.978 0 0 0-2.096-2.107C19.567 3.65 12 3.65 12 3.65s-7.567 0-9.402.429A2.978 2.978 0 0 0 .502 6.186C.073 8.022.073 12 .073 12s0 3.978.429 5.814a2.978 2.978 0 0 0 2.096 2.107C4.433 20.35 12 20.35 12 20.35s7.567 0 9.402-.429a2.978 2.978 0 0 0 2.096-2.107C23.927 15.978 23.927 12 23.927 12s0-3.978-.429-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }
              ].map((social, index) => (
                <button
                  key={index}
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e94560';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#94a3b8';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label={social.name}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.icon} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.85rem'
        }}>
          © 2026 Tenly. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
