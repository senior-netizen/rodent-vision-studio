import { MarketplaceControls } from '@/components/home/marketplace-controls';

export default function HomePage() {
  return (
    <>
      <nav>
        <a href="#" className="nav-logo">
          <span className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 8L12 3L20 8V16L12 21L4 16V8Z" fill="#1ac99e" opacity="0.2" />
              <path d="M4 8L12 3L20 8" stroke="#1ac99e" strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 3V12M4 8L12 12L20 8" stroke="#1ac99e" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </span>
          Pallet Ross
        </a>
        <div className="nav-links">
          <a href="#">Get Started</a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="nav-dot" />Create strategy
          </a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
          <a href="#">Solution</a>
          <a href="#">E-Commerce</a>
        </div>
        <div className="nav-actions">
          <div className="nav-icon">✎</div>
          <div className="nav-icon">⚙</div>
        </div>
      </nav>

      <div className="hero">
        <h1>A place to display your masterpiece.</h1>
        <p className="hero-sub">Artists can display their masterpieces, and buyers can discover and purchase works that resonate with them.</p>
        <div className="hero-btns">
          <a href="#" className="btn-primary">Join for $9.99/m</a>
          <a href="#" className="btn-ghost">Read more</a>
        </div>
        <div className="cards-fan">
          <span className="bubble teal bubble-1">@coplin</span>
          <span className="bubble green bubble-2">@andree</span>
          <div className="fan-card"><div className="art-1 art-shape"><div className="art-text" style={{ fontSize: 40, opacity: 0.3 }}>★</div></div></div>
          <div className="fan-card"><div className="art-2 art-shape"><div className="art-text" style={{ color: '#999', fontSize: 18 }}>MANGA</div></div></div>
          <div className="fan-card"><div className="art-3 art-shape"><div className="art-text">FRIO</div></div></div>
          <div className="fan-card"><div className="art-4 art-shape"><div className="art-text" style={{ fontSize: 20 }}>21<br /><small style={{ fontSize: 12 }}>AUG</small></div></div></div>
          <div className="fan-card"><div className="art-5 art-shape"><div className="art-text" style={{ fontSize: 16 }}>INDEP.<br />DAY</div></div></div>
          <div className="fan-card"><div className="art-6 art-shape"><div className="art-text" style={{ fontSize: 48 }}>♣</div></div></div>
        </div>
      </div>

      <div className="section-wrap" style={{ background: '#fafaf8', padding: '60px 2rem' }}>
        <div className="gateway">
          <div className="gateway-label">CLASS BY REATHA C. PHELAN</div>
          <div className="gateway-inner">
            <div className="gateway-text">
              <span className="gateway-bubble">@reatha</span>
              <h2>Gateway to artist people.</h2>
              <div className="gateway-controls">
                <button className="watch-btn">Watch</button>
                <button className="ctrl-btn">←</button>
                <button className="ctrl-btn">→</button>
              </div>
            </div>
            <div className="gateway-img">
              <div className="art-gradient-warm" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <svg width="200" height="300" viewBox="0 0 200 300" style={{ position: 'absolute' }}>
                  <ellipse cx="100" cy="80" rx="50" ry="60" fill="rgba(0,0,0,0.15)" />
                  <rect x="60" y="140" width="80" height="120" rx="10" fill="rgba(0,0,0,0.1)" />
                </svg>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 80, fontWeight: 800, color: 'rgba(255,255,255,0.2)', userSelect: 'none' }}>★</div>
              </div>
              <div className="gateway-logo-overlay">
                <div className="logo-sq"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 8L12 3L20 8V16L12 21L4 16V8Z" fill="none" stroke="#111" strokeWidth="2" /></svg></div>
                <div className="logo-sq logo-sq-dark"><svg width="20" height="20" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="#fff" /></svg></div>
              </div>
              <div className="dots-overlay">
                <div className="dot-ind active" />
                <div className="dot-ind active" />
                <div className="dot-ind" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="community-wrap">
        <div className="avatar-row top-row">
          <div className="avatar-card art-7" />
          <div className="avatar-card art-8" />
          <div className="avatar-card" style={{ background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 9, fontWeight: 600, color: '#888', textAlign: 'center', padding: 4 }}>JUST<br />IT!</span></div>
          <div className="avatar-card art-9" />
          <div className="avatar-card art-10" />
          <div className="avatar-card art-11" />
          <div className="avatar-card" style={{ background: '#fff3e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, color: '#f57c00' }}>WHO</span></div>
          <div className="avatar-card art-12" />
          <div className="avatar-card art-gradient-purple" />
          <div className="avatar-card art-teal" />
        </div>

        <div className="community-icon">🐦</div>
        <h2>You will find yourself among us</h2>
        <p>Dive into a dynamic community where artists and buyers seamlessly merge.</p>

        <div className="avatar-row bottom-row">
          <div className="avatar-card art-1" />
          <div className="avatar-card" style={{ background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}><span style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 800, color: '#1b5e20', lineHeight: 1.1, textAlign: 'center' }}>Swung</span></div>
          <div className="avatar-card" style={{ background: '#fce4ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, color: '#e91e63' }}>Cre</span></div>
          <div className="avatar-card art-dark" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="40" height="40" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="#4a90e2" /><path d="M15 30 Q25 15 35 30" stroke="#fff" strokeWidth="3" fill="none" /></svg></div>
          <div className="avatar-card art-gradient-dots" />
          <div className="avatar-card art-gradient-rainbow" />
          <div className="avatar-card art-8" />
          <div className="avatar-card art-7" />
          <div className="avatar-card art-9" />
          <div className="avatar-card art-gradient-warm" />
        </div>
      </div>

      <div className="marketplace-wrap">
        <div className="marketplace-inner">
          <div className="marketplace-header">
            <div className="mp-left">
              <div className="mp-label">Get More Closer</div>
              <h2>Marketplace<br />for Creativity</h2>
              <p className="mp-desc">In the realm of Artnesia, creativity knows no bounds, eternal marketplace celebrates the timeless nature of art.</p>
              <div className="mp-nav">
                <MarketplaceControls />
              </div>
            </div>
            <div className="mp-right">
              <button className="view-all-btn">View All</button>
            </div>
          </div>
          <div className="mp-grid">
            <div className="mp-card">
              <div className="art-gradient-dots" style={{ width: '100%', aspectRatio: '1' }} />
              <div className="mp-card-label">Artnesia Gap</div>
              <div className="mp-progress" />
            </div>
            <div className="mp-card">
              <div className="art-gradient-rainbow" style={{ width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '60%', height: '60%', background: 'white', borderRadius: '50%', opacity: 0.15 }} />
              </div>
              <div className="mp-card-label">Immortalise Works</div>
            </div>
            <div className="mp-card">
              <div style={{ background: 'linear-gradient(135deg,#fff9c4,#4caf50,#ff5722)', width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 50 }}>🦋</div>
              </div>
              <div className="mp-card-label">Creativity Class</div>
            </div>
            <div className="mp-card">
              <div style={{ background: 'linear-gradient(135deg,#1565c0,#e91e63,#ff9800)', width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 50 }}>🎭</div>
              </div>
              <div className="mp-card-label">Celebrates Party</div>
            </div>
          </div>
        </div>
      </div>

      <div className="gallery-wrap">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem' }}>Featured Artists</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px,4vw,50px)', fontWeight: 800, letterSpacing: '-1.5px' }}>Discover &amp; explore art</h2>
        </div>
        <div className="gallery-grid">
          <div className="g-card art-7" />
          <div className="g-card art-dark" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800 }}>★</span></div>
          <div className="g-card art-gradient-rainbow" />
          <div className="g-card" style={{ background: 'linear-gradient(135deg,#1a1a2e,#e53935)' }} />
          <div className="g-card art-teal" />
          <div className="g-card art-1" />
          <div className="g-card art-8" />
          <div className="g-card featured art-orange">
            <button className="like-btn">♥ Like</button>
            <div className="featured-overlay">
              <span className="tag">@artist</span>
              <div className="name">Trisha Woodward</div>
              <div className="source">from ArtRoss</div>
            </div>
          </div>
          <div className="g-card art-gradient-purple" />
          <div className="g-card art-11" />
          <div className="g-card art-12" />
          <div className="g-card art-9" />
          <div className="g-card art-gradient-warm" />
          <div className="g-card art-10" />
          <div className="g-card art-gradient-dots" />
        </div>
      </div>

      <footer>
        <h2>Join Pallet Ross today</h2>
        <p>Start displaying and discovering masterpieces with thousands of artists and collectors.</p>
        <button className="footer-btn">Get Started — $9.99/m</button>
        <div className="footer-links">
          <a href="#">Get Started</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
          <a href="#">Solution</a>
          <a href="#">E-Commerce</a>
        </div>
        <div style={{ marginTop: '2rem', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2024 Pallet Ross. All rights reserved.</div>
      </footer>
    </>
  );
}
