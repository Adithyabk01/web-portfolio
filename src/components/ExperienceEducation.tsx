import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceEducation: React.FC = () => {
  return (
    <section id="experience" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            CAREER TIMELINE · TRACK RECORD
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Academic Foundation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Practical industry internship in applied machine learning paired with formal engineering coursework at PES College of Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Work Experience */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono text-slate-300 pb-2 border-b border-slate-800">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>INDUSTRY WORK EXPERIENCE</span>
            </div>

            {PORTFOLIO_DATA.experience.map((exp) => (
              <div
                key={exp.id}
                className="p-6 sm:p-7 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-cyan-400">{exp.company}</span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.duration}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {exp.role}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{exp.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-300">{exp.type}</span>
                </div>

                <div className="space-y-2.5 mb-6">
                  {exp.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[11px] font-mono text-slate-300 bg-slate-900 rounded border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Education Background */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-sm font-mono text-slate-300 pb-2 border-b border-slate-800">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>ACADEMIC DEGREES & EDUCATION</span>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono text-cyan-400">{edu.institution}</span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.duration}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    {edu.degree}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{edu.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-300 font-mono font-semibold">
                      {edu.score}
                    </span>
                    <span className="text-slate-400">({edu.scoreLabel})</span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                    {edu.details.map((detail, dIdx) => (
                      <div key={dIdx} className="text-xs text-slate-400 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">▪</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
