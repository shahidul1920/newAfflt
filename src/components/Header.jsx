"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ categories = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/category/latest?search=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <>
      {/* 1. Top Bar */}
      <div className="topbar">
        <div className="wrap">
          <span className="date">
            <Link href="/affiliate-disclosure">Affiliate disclosure </Link>
          </span>
          <div className="t-right">
            <Link href="/about">About</Link>
            <span className="pill">Independent &amp; Ad-Free</span>
          </div>
        </div>
      </div>

      {/* 2. Masthead */}
      <header className="masthead">
        <div className="wrap">
          <div className="brand has-logo">
            <Link href="/" className="custom-logo-link" rel="home">
              <img
                src="/logo.png"
                className="custom-logo"
                alt="Longevity Reviewed"
                style={{ maxHeight: "46px", width: "auto" }}
              />
            </Link>
          </div>
          <div className="masthead-right">
            <form className="search-box" role="search" onSubmit={handleSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                name="s"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search reporting…"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </header>

      {/* 3. Main Navigation */}
      <nav className="mainnav">
        <div className="wrap">
          <ul className="navlinks">
            <li>
              <Link href="/" className={pathname === "/" ? "live" : ""}>
                Latest
              </Link>
            </li>
            <li><Link href="/category/diet" className={pathname === "/category/diet" ? "live" : ""}>Diet</Link></li>
            <li><Link href="/category/emerging" className={pathname === "/category/emerging" ? "live" : ""}>Emerging</Link></li>
            <li><Link href="/category/longevity" className={pathname === "/category/longevity" ? "live" : ""}>Longevity</Link></li>
            <li><Link href="/category/mental" className={pathname === "/category/mental" ? "live" : ""}>Mental</Link></li>
            <li><Link href="/category/physical" className={pathname === "/category/physical" ? "live" : ""}>Physical</Link></li>
            <li><Link href="/category/sleep" className={pathname === "/category/sleep" ? "live" : ""}>Sleep</Link></li>
          </ul>
          <span className="nav-meta">No sponsorships · No ads</span>
        </div>
      </nav>
    </>
  );
}
