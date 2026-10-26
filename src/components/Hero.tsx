import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ThreeCanvas } from './ThreeCanvas';
import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Phone,
  Box,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  onResumeClick: () => void;
  onDeployClick: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onResumeClick, onDeployClick, onSelectProject }) => {
  const [heroViewMode, setHeroViewMode] = useState<'3d' | 'photo'>('3d');
  const [photoHoverTilt, setPhotoHoverTilt] = useState({ x: 0, y: 0 });

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setPhotoHoverTilt({ x, y });
  };

  const handlePhotoMouseLeave = () => {
    setPhotoHoverTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-slate-800/80 bg-grid-pattern">
      {/* Background ambient lighting glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed kicker with typographic separator */}
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider mb-4">
              <span>B.E. COMPUTER SCIENCE & ENGINEERING</span>
              <span aria-hidden="true">·</span>
              <span>ARTIFICIAL INTELLIGENCE & MACHINE LEARNING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-5 [text-wrap:balance]">
              Architecting Production Web Platforms & Applied AI/ML Systems
            </h1>

            {/* Sub-headline / Lead paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl font-normal">
              Hi, I'm <strong className="text-white font-semibold">{PORTFOLIO_DATA.personal.name}</strong>. I bridge full-stack web architectures (React, TypeScript, FastAPI, PostgreSQL) with practical machine learning pipelines, NLP extraction, and local LLM integrations (Llama3 via Ollama, LangChain, scikit-learn).
            </p>

            {/* Location & Quick Contact Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 mb-8">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PORTFOLIO_DATA.personal.email}</span>
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PORTFOLIO_DATA.personal.phone}</span>
              </a>
            </div>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-xl shadow-lg shadow-cyan-950/40 transition-all whitespace-nowrap"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onResumeClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-700/80 rounded-xl transition-colors whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Resumes & PDFs</span>
              </button>

              <button
                onClick={onDeployClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-cyan-300 bg-cyan-950/30 hover:bg-cyan-950/60 border border-cyan-500/40 rounded-xl transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Deploy to Vercel</span>
              </button>
            </div>

            {/* Social Links & Trust Indicators */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 font-mono">PROFILES:</span>
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800/60"
              >
                <Github className="w-4 h-4 text-slate-400" />
                <span>GitHub</span>
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800/60"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <span className="text-xs text-slate-500 ml-auto hidden sm:inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Active 2026 Status</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas / Photo Showcase Bezel */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* View Mode Segmented Controls */}
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-mono text-slate-400">HERO VISUAL EXPERIENCE</span>
              <div className="inline-flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-lg text-xs">
                <button
                  onClick={() => setHeroViewMode('3d')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                    heroViewMode === '3d'
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Interactive 3D</span>
                </button>
                <button
                  onClick={() => setHeroViewMode('photo')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                    heroViewMode === 'photo'
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Hero Photo</span>
                </button>
              </div>
            </div>

            {/* Container */}
            <div className="w-full h-[460px] sm:h-[500px] relative">
              {heroViewMode === '3d' ? (
                <ThreeCanvas
                  heroPhotoUrl={PORTFOLIO_DATA.personal.photoUrl}
                  className="w-full h-full"
                />
              ) : (
                /* Interactive 3D Perspective Photo Card */
                <div
                  onMouseMove={handlePhotoMouseMove}
                  onMouseLeave={handlePhotoMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateY(${photoHoverTilt.x}deg) rotateX(${photoHoverTilt.y}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-2xl flex flex-col group"
                >
                  {/* Photo itself */}
                  <img
                    src={PORTFOLIO_DATA.personal.photoUrl}
                    alt="Adithya B K standing on coastal rocks with crashing ocean waves"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* High-Tech Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent pointer-events-none" />

                  {/* Corner cyber tech markers */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
                    ADITHYA B K // MANDYA, INDIA
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-slate-950/85 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-slate-300">
                    PESCE · CSE (AI/ML)
                  </div>

                  {/* Bottom details card overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-cyan-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Adithya B K</h4>
                        <p className="text-xs text-slate-300">PESCE Mandya (2023-2027) · 7.73 CGPA</p>
                      </div>
                      <button
                        onClick={() => setHeroViewMode('3d')}
                        className="px-2.5 py-1 text-xs font-mono text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Box className="w-3 h-3" />
                        <span>Launch 3D</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Mandatory Full-Width KPI & Proof Strip (placed below the 2-column split, adhering to frontend design guidelines) */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PORTFOLIO_DATA.personal.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight text-cyan-400">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
