'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, Hammer, ChevronRight } from 'lucide-react'
import { SearchModal } from '../search/SearchModal'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Global '/' keyboard listener to trigger search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navLinks = [
    { label: 'Calculators', href: '/calculators' },
    { label: 'Categories', href: '/#categories' },
    { label: 'Guides', href: '/guides' },
    { label: 'About', href: '/about' },
  ]

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-surface/95 backdrop-blur-md border-b border-charcoal-200/80 shadow-subtle'
            : 'bg-background border-b border-charcoal-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-charcoal-900 flex items-center justify-center text-white shadow-sm group-hover:bg-primary-600 transition-colors">
              <Hammer className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-charcoal-950 tracking-tight leading-tight group-hover:text-primary-600 transition-colors">
                BuildCalc
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-charcoal-400 -mt-0.5">
                ESTIMATOR &bull; HUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50/70'
                      : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-charcoal-100/60'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Search Trigger and CTA */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-charcoal-200 bg-surface hover:border-charcoal-300 text-charcoal-500 hover:text-charcoal-800 transition-colors text-xs font-medium shadow-sm"
              title="Search calculators (Press /)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search calculators...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-charcoal-100 border border-charcoal-200 rounded text-charcoal-500">
                /
              </kbd>
            </button>

            <Link
              href="/calculators"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-charcoal-900 text-white hover:bg-primary-600 text-xs font-semibold shadow-sm transition-colors"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-charcoal-600 hover:text-charcoal-950 hover:bg-charcoal-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-charcoal-200 bg-surface px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-charcoal-800 hover:bg-charcoal-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-charcoal-100">
              <Link
                href="/calculators"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-primary-600 text-white text-sm font-semibold shadow-sm"
              >
                All Calculators (12)
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
