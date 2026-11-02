"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ categories = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Close mobile menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/category/latest?search=${encodeURIComponent(searchVal.trim())}`);
      setMobileSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Latest", href: "/" },
    { label: "Diet", href: "/category/diet" },
    { label: "Emerging", href: "/category/emerging" },
    { label: "Longevity", href: "/category/longevity" },
    { label: "Mental", href: "/category/mental" },
    { label: "Physical", href: "/category/physical" },
    { label: "Sleep", href: "/category/sleep" },
  ];

  return (
    <>
      {/* 1. Top Bar */}
      <div className="topbar">
        <div className="wrap">
          <span className="date">
            <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
          </span>
          <div className="t-right">
            <Link href="/about">About</Link>
            <span className="pill">Independent &amp; Ad-Free</span>
          </div>
        </div>
      </div>

      {/* 2. Masthead */}
      <header className="masthead">
        <div className="wrap masthead-wrap">
          <div className="brand has-logo">
            <Link href="/" className="custom-logo-link" rel="home" aria-label="Longevity Reviewed Home">
              <img
                src="/logo.png"
                className="custom-logo"
                alt="Longevity Reviewed"
              />
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="masthead-right desktop-only">
            <form className="search-box" role="search" onSubmit={handleSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                name="s"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search reporting…"
                aria-label="Search reporting"
              />
            </form>
          </div>

          {/* Mobile Action Buttons (Search & Hamburger) */}
          <div className="mobile-actions">
            <button
              type="button"
              className="mobile-btn"
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen);
                if (mobileMenuOpen) setMobileMenuOpen(false);
              }}
              aria-label="Toggle search"
              aria-expanded={mobileSearchOpen}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              type="button"
              className="mobile-btn hamburger-btn"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (mobileSearchOpen) setMobileSearchOpen(false);
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expandable Drawer */}
        {mobileSearchOpen && (
          <div className="mobile-search-expand">
            <div className="wrap">
              <form className="mobile-search-form" role="search" onSubmit={handleSearch}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="search"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search all reporting &amp; clinical reviews…"
                  autoFocus
                  aria-label="Search"
                />
                <button type="submit" className="mobile-search-submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* 3. Main Navigation Bar (Horizontal on Desktop & Mobile Scrollable Pills) */}
      <nav className="mainnav">
        <div className="wrap mainnav-wrap">
          <ul className="navlinks">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link href={link.href} className={isActive ? "live" : ""}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="nav-meta desktop-only">No sponsorships · No ads</span>
        </div>
      </nav>

      {/* 4. Full Mobile Menu Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <span className="drawer-title">Navigation</span>
              <button
                type="button"
                className="drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <form className="drawer-search" onSubmit={handleSearch}>
              <input
                type="search"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search topics or studies…"
                aria-label="Search topics"
              />
              <button type="submit">Search</button>
            </form>

            <div className="drawer-section">
              <span className="drawer-label">Desks &amp; Topics</span>
              <ul className="drawer-nav">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`drawer-link ${isActive ? "active" : ""}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{link.label}</span>
                        <span className="drawer-arrow">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="drawer-section">
              <span className="drawer-label">The Newsroom</span>
              <ul className="drawer-links-secondary">
                <li>
                  <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/our-standards" onClick={() => setMobileMenuOpen(false)}>
                    Our Standards &amp; Methodology
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Contact &amp; Story Tips
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate-disclosure" onClick={() => setMobileMenuOpen(false)}>
                    Affiliate Disclosure
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)}>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="drawer-footer">
              <div className="drawer-badge">Independent · Evidence-Based · Ad-Free</div>
              <p className="drawer-copy">© 2026 Longevity Reviewed</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
