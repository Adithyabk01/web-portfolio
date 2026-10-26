import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import {
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  Cpu,
  Database,
  Code2,
  CheckCircle2,
  Workflow
} from 'lucide-react';

interface ProjectsSectionProps {
  onOpenSimulator?: (feature: 'mediread' | 'kisan') => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenSimulator }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'aiml' | 'fullstack' | 'data' | 'mobile'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
              PORTFOLIO SHOWCASE · ENGINEERING & APPLIED AI
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects & Systems Architecture
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Production-focused web platforms, automated machine learning pipelines, and interactive analytics dashboards designed and deployed with scalable architectures.
            </p>
          </div>

          {/* Filter Tabs (Interactive Segmented Controls as permitted by Constitution) */}
          <div className="inline-flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto self-start md:self-auto text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Works ({PORTFOLIO_DATA.projects.length})
            </button>
            <button
              onClick={() => setActiveFilter('aiml')}
              className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'aiml'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI & ML
            </button>
            <button
              onClick={() => setActiveFilter('fullstack')}
              className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'fullstack'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Full-Stack
            </button>
            <button
              onClick={() => setActiveFilter('data')}
              className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'data'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Data & BI
            </button>
            <button
              onClick={() => setActiveFilter('mobile')}
              className={`px-3.5 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'mobile'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mobile (iOS)
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group flex flex-col justify-between rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 ${
                project.featured ? 'relative' : ''
              }`}
            >
              <div>
                {/* Clean unboxed metadata with dot separators (No static pill badges!) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-3">
                  <span className="text-cyan-400">{project.domain}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.role}</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium mb-3.5">
                  {project.subtitle}
                </p>

                {/* Summary */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Technical Highlights preview */}
                <div className="space-y-2 mb-6">
                  {project.keyHighlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Stack tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-800/80">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] font-mono text-slate-300 bg-slate-800/80 rounded border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>System Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.id === 'mediread' && onOpenSimulator && (
                      <button
                        onClick={() => onOpenSimulator('mediread')}
                        className="px-2.5 py-1 text-xs font-mono text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Live Demo</span>
                      </button>
                    )}
                    {project.id === 'kisan-sethu' && onOpenSimulator && (
                      <button
                        onClick={() => onOpenSimulator('kisan')}
                        className="px-2.5 py-1 text-xs font-mono text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Workflow className="w-3 h-3" />
                        <span>Flow Demo</span>
                      </button>
                    )}
                    <a
                      href={project.githubUrl || PORTFOLIO_DATA.personal.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c121e] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <span>{selectedProject.domain}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProject.role}</span>
                {selectedProject.duration && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProject.duration}</span>
                  </>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                {selectedProject.subtitle}
              </p>
            </div>

            {/* Architecture Pipeline Flow */}
            {selectedProject.architectureFlow && (
              <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-cyan-400" />
                  <span>DATA & INFERENCE PIPELINE ARCHITECTURE</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                  {selectedProject.architectureFlow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="px-3 py-2 rounded-lg bg-slate-950 border border-cyan-500/30 text-slate-200 font-mono text-center flex-1">
                        {step}
                      </div>
                      {idx < selectedProject.architectureFlow!.length - 1 && (
                        <div className="text-cyan-400 text-center font-mono font-bold hidden sm:block">
                          →
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Problem & Outcome Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <h4 className="text-xs font-mono text-amber-400 mb-2 flex items-center gap-1.5">
                  <span>PROBLEM CONTEXT</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <h4 className="text-xs font-mono text-emerald-400 mb-2 flex items-center gap-1.5">
                  <span>ENGINEERING OUTCOME</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedProject.outcome}
                </p>
              </div>
            </div>

            {/* Key Technical Highlights */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-slate-400 mb-3">
                IMPLEMENTATION HIGHLIGHTS & INVARIANTS
              </h4>
              <div className="space-y-2.5">
                {selectedProject.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-mono text-slate-400 mb-2">
                TECHNOLOGY STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono text-cyan-300 bg-cyan-950/40 rounded-lg border border-cyan-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer action buttons in modal */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <a
                href={selectedProject.githubUrl || PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>

              {selectedProject.id === 'mediread' && onOpenSimulator && (
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenSimulator('mediread');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Try MediRead Live Simulator</span>
                </button>
              )}

              {selectedProject.id === 'kisan-sethu' && onOpenSimulator && (
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenSimulator('kisan');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  <Workflow className="w-4 h-4" />
                  <span>Explore 4-Role Architecture</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
