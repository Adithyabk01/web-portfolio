import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Menu, X, FileText, Rocket, Github, Linkedin, Mail } from 'lucide-react';

interface NavbarProps {
  onResumeClick: () => void;
  onDeployClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onResumeClick, onDeployClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#07090e]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (strictly single text element, no subtitle tags or location chips) */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-tr from-cyan-400 to-blue-500"></span>
          <span>{PORTFOLIO_DATA.personal.name}</span>
        </a>

        {/* Zone 2: 4-5 single-line clean text nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#projects" className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0">
            Projects
          </a>
          <a href="#architecture" className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0">
            Live Lab
          </a>
          <a href="#skills" className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0">
            Skills
          </a>
          <a href="#experience" className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0">
            Experience & Education
          </a>
          <a href="#certifications" className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0">
            Certifications
          </a>
          <a href="#contact" className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0">
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action + secondary utilities */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onResumeClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/70 rounded-lg transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resumes (2)</span>
          </button>

          <button
            onClick={onDeployClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Deploy to Vercel</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0a0d16] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-slate-300">
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-cyan-400"
            >
              Projects
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-cyan-400"
            >
              Live Lab
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-cyan-400"
            >
              Skills
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-cyan-400"
            >
              Experience & Education
            </a>
            <a
              href="#certifications"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-cyan-400"
            >
              Certifications & Awards
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800/80 hover:text-cyan-400"
            >
              Contact
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onResumeClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View & Download Resumes</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
