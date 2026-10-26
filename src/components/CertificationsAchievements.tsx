import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Award, Trophy, CheckCircle2, ShieldCheck, Star, Users } from 'lucide-react';

export const CertificationsAchievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'certifications' | 'achievements'>('certifications');

  return (
    <section id="certifications" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
              VERIFIED CREDENTIALS & LEADERSHIP
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Certifications & Co-Curricular Impact
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Professional credentials issued by IBM, Google Cloud, HKUST, Vanderbilt, and Edunet alongside national hackathon milestones.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="inline-flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs self-start md:self-auto">
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-4 py-2 font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'certifications'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certifications ({PORTFOLIO_DATA.certifications.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-4 py-2 font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'achievements'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Hackathons & Leadership ({PORTFOLIO_DATA.achievements.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Certifications Grid */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTFOLIO_DATA.certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      {cert.issuer}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-3">
                    {cert.name}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono text-slate-300 bg-slate-900 rounded border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Achievements & Leadership */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-cyan-400">
                    {ach.organization}
                  </span>
                  {ach.type === 'hackathon' && (
                    <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-mono">
                      NATIONAL LEVEL
                    </span>
                  )}
                  {ach.type === 'leadership' && (
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-mono">
                      ORGANIZER
                    </span>
                  )}
                  {ach.type === 'award' && (
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-mono">
                      RUNNER-UP
                    </span>
                  )}
                  {ach.type === 'community' && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono">
                      COMMUNITY
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {ach.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
