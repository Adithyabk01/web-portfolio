import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Search, Code2, Cpu, Globe, Database, Terminal, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'languages' | 'aiMl' | 'webDevelopment' | 'databasesCloud' | 'toolsCore'>('all');

  const groups = [
    { id: 'all', name: 'All Competencies', icon: Code2 },
    { id: 'languages', name: 'Programming Languages', icon: Terminal, items: PORTFOLIO_DATA.skills.languages },
    { id: 'aiMl', name: 'AI, ML & NLP', icon: Cpu, items: PORTFOLIO_DATA.skills.aiMl },
    { id: 'webDevelopment', name: 'Full-Stack & Systems', icon: Globe, items: PORTFOLIO_DATA.skills.webDevelopment },
    { id: 'databasesCloud', name: 'Databases, BI & OS', icon: Database, items: PORTFOLIO_DATA.skills.databasesCloud },
    { id: 'toolsCore', name: 'Developer Tools & Core CS', icon: Terminal, items: PORTFOLIO_DATA.skills.toolsCore },
  ];

  const allSkills = [
    ...PORTFOLIO_DATA.skills.languages.map(s => ({ ...s, category: 'Programming Languages' })),
    ...PORTFOLIO_DATA.skills.aiMl.map(s => ({ ...s, category: 'AI, ML & NLP' })),
    ...PORTFOLIO_DATA.skills.webDevelopment.map(s => ({ ...s, category: 'Full-Stack & Systems' })),
    ...PORTFOLIO_DATA.skills.databasesCloud.map(s => ({ ...s, category: 'Databases, BI & OS' })),
    ...PORTFOLIO_DATA.skills.toolsCore.map(s => ({ ...s, category: 'Developer Tools & Core CS' })),
  ];

  const filteredSkills = allSkills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedGroup === 'all') return matchesSearch;
    if (selectedGroup === 'languages') return matchesSearch && s.category === 'Programming Languages';
    if (selectedGroup === 'aiMl') return matchesSearch && s.category === 'AI, ML & NLP';
    if (selectedGroup === 'webDevelopment') return matchesSearch && s.category === 'Full-Stack & Systems';
    if (selectedGroup === 'databasesCloud') return matchesSearch && s.category === 'Databases, BI & OS';
    if (selectedGroup === 'toolsCore') return matchesSearch && s.category === 'Developer Tools & Core CS';
    return matchesSearch;
  });

  return (
    <section id="skills" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
              TECHNICAL MATRIX · CORE COMPETENCIES
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Languages, Frameworks & AI Architecture
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Equipped with deep fundamentals in data structures, algorithms, system design, and applied machine learning frameworks.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills (e.g., Python, Llama3)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGroup(g.id as any)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                selectedGroup === g.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{skill.category}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm font-mono">
            No technical skills matching "{searchTerm}". Try another keyword.
          </div>
        )}

      </div>
    </section>
  );
};
