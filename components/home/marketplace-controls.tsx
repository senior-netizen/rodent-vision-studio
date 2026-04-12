'use client';

const MARKETPLACE_GRID_SELECTOR = '.mp-grid';
const FADE_DURATION_MS = 300;

export function MarketplaceControls() {
  const fadeMarketplaceGrid = () => {
    const grid = document.querySelector<HTMLElement>(MARKETPLACE_GRID_SELECTOR);
    if (!grid) {
      return;
    }

    grid.style.transition = `opacity ${FADE_DURATION_MS}ms`;
    grid.style.opacity = '0.4';

    window.setTimeout(() => {
      grid.style.opacity = '1';
    }, FADE_DURATION_MS);
  };

  return (
    <>
      <button className="mp-nav-btn" onClick={fadeMarketplaceGrid}>←</button>
      <button className="mp-nav-btn" onClick={fadeMarketplaceGrid}>→</button>
    </>
  );
}
