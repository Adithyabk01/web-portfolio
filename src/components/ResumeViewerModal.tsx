import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Download, FileText, ExternalLink, CheckCircle2, Copy, Check, Eye } from 'lucide-react';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultResumeId?: string;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({
  isOpen,
  onClose,
  defaultResumeId = 'sde'
}) => {
  const [selectedResumeId, setSelectedResumeId] = useState(defaultResumeId);
  const [viewMode, setViewMode] = useState<'structured' | 'pdf'>('structured');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const activeResume = PORTFOLIO_DATA.resumes.find((r) => r.id === selectedResumeId) || PORTFOLIO_DATA.resumes[0];

  const handleCopySummary = async () => {
    const textToCopy = `${PORTFOLIO_DATA.personal.name} - ${PORTFOLIO_DATA.personal.rolePrimary}
Email: ${PORTFOLIO_DATA.personal.email} | Phone: ${PORTFOLIO_DATA.personal.phone}
LinkedIn: ${PORTFOLIO_DATA.personal.linkedin} | GitHub: ${PORTFOLIO_DATA.personal.github}

SUMMARY:
${PORTFOLIO_DATA.personal.bio}

EDUCATION:
PES College of Engineering, Mandya - B.E. in CSE (AI & ML) (7.73 CGPA)

KEY PROJECTS:
1. Kisan Sethu - AI-Powered AgriTech Marketplace (React, TypeScript, FastAPI, PostgreSQL)
2. MediRead - AI-Based Medical Report Understanding System (Python, NLP, Llama3 via Ollama)
3. Startup Investment Trends in India - Data Analytics & BI (Python, MySQL, Power BI)
4. The Typing Arena - Real-Time Typing Competition Platform (HTML5, CSS3, JS, Lovable AI)

EXPERIENCE:
Machine Learning Trainee (Internship) - Employability.life (Aug 2024 - Oct 2024)`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        throw new Error('Fallback needed');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
      } catch {}
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl bg-[#0c121e] border border-cyan-500/40 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/80">
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-1">
              OFFICIAL VERIFIED CURRICULUM VITAE & PROFILES
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {activeResume.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
            {/* View Mode Toggle */}
            <div className="inline-flex p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-xs mr-2">
              <button
                onClick={() => setViewMode('structured')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'structured'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive View
              </button>
              <button
                onClick={() => setViewMode('pdf')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'pdf'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Embedded PDF
              </button>
            </div>

            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
              title="Copy resume text summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <a
              href={activeResume.path}
              download={activeResume.filename}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={activeResume.path}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Selector Tabs */}
        <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          {PORTFOLIO_DATA.resumes.map((resume) => (
            <button
              key={resume.id}
              onClick={() => setSelectedResumeId(resume.id)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedResumeId === resume.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>
                {resume.id === 'sde'
                  ? '1. SDE Full-Stack Resume'
                  : resume.id === 'aiml'
                  ? '2. AI/ML & NLP Resume'
                  : '3. PESCE Student Profile'}
              </span>
            </button>
          ))}
        </div>

        {/* Focus strip */}
        <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <p className="text-slate-400 text-[11px] sm:text-xs">
            {activeResume.description}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-500">TAGS:</span>
            {activeResume.focus.map((f, i) => (
              <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono text-[10px] border border-slate-800">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 w-full overflow-y-auto bg-slate-950 p-4 sm:p-8">
          {viewMode === 'structured' ? (
            /* Interactive Structured Resume View */
            <div className="max-w-3xl mx-auto bg-[#0a0e17] rounded-xl border border-slate-800 p-6 sm:p-10 text-slate-300 space-y-8 shadow-xl">
              
              {/* Header */}
              <div className="border-b border-slate-800 pb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {PORTFOLIO_DATA.personal.name}
                </h1>
                <p className="text-cyan-400 font-mono text-xs sm:text-sm mt-1">
                  {selectedResumeId === 'sde'
                    ? 'Software Engineer | Full-Stack Development'
                    : selectedResumeId === 'aiml'
                    ? 'AI/ML Engineer | Applied Machine Learning & NLP'
                    : 'B.E. Computer Science & Engineering (Artificial Intelligence & Machine Learning)'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-y-1 gap-x-3 text-xs text-slate-400 mt-3 font-mono">
                  <span>{PORTFOLIO_DATA.personal.phone}</span>
                  <span>·</span>
                  <span>{PORTFOLIO_DATA.personal.email}</span>
                  <span>·</span>
                  <span>{PORTFOLIO_DATA.personal.location}</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h2 className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {PORTFOLIO_DATA.personal.bio}
                </p>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs font-mono text-cyan-400 tracking-wider mb-3">
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  {PORTFOLIO_DATA.education.map((edu, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 text-xs">
                      <div>
                        <div className="font-bold text-white text-sm">{edu.institution}</div>
                        <div className="text-slate-300">{edu.degree}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{edu.score} ({edu.scoreLabel})</div>
                      </div>
                      <div className="font-mono text-slate-400 shrink-0 sm:text-right">
                        <div>{edu.duration}</div>
                        <div className="text-[11px] text-slate-500">{edu.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-xs font-mono text-cyan-400 tracking-wider mb-3">
                  WORK EXPERIENCE
                </h2>
                {PORTFOLIO_DATA.experience.map((exp) => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                      <div>
                        <div className="font-bold text-white text-sm">{exp.role}</div>
                        <div className="text-cyan-300 text-xs">{exp.company}</div>
                      </div>
                      <div className="text-xs font-mono text-slate-400 sm:text-right">
                        <div>{exp.duration}</div>
                        <div className="text-[11px] text-slate-500">{exp.location}</div>
                      </div>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300 pl-4 list-disc">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-xs font-mono text-cyan-400 tracking-wider mb-3">
                  ENGINEERING PROJECTS
                </h2>
                <div className="space-y-5">
                  {PORTFOLIO_DATA.projects.slice(0, 4).map((p) => (
                    <div key={p.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs sm:text-sm">{p.title}</span>
                        <span className="text-[11px] font-mono text-slate-400">{p.domain}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {p.summary}
                      </p>
                      <div className="text-[11px] font-mono text-cyan-300">
                        Tech Stack: {p.techStack.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Additional */}
              <div>
                <h2 className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
                  CERTIFICATIONS & HONORS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {PORTFOLIO_DATA.certifications.slice(0, 6).map((c) => (
                    <div key={c.id} className="p-2 rounded bg-slate-900/60 border border-slate-800">
                      <div className="font-semibold text-white">{c.name}</div>
                      <div className="text-[11px] text-cyan-400 font-mono">{c.issuer}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* Embedded PDF Iframe with Fallback Message */
            <div className="w-full h-full min-h-[500px] flex flex-col">
              <iframe
                src={`${activeResume.path}#toolbar=1&navpanes=0`}
                title={activeResume.title}
                className="w-full flex-1 rounded-xl border border-slate-800 bg-white"
              />
              <div className="mt-3 text-center text-xs text-slate-500 font-mono">
                If the PDF plugin does not render in your browser sandbox, switch to "Interactive View" or click "Download PDF" above.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
