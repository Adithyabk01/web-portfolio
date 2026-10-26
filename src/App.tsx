import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { LiveSimulator } from './components/LiveSimulator';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceEducation } from './components/ExperienceEducation';
import { CertificationsAchievements } from './components/CertificationsAchievements';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeViewerModal } from './components/ResumeViewerModal';
import { VercelDeployModal } from './components/VercelDeployModal';
import { FileText, Rocket } from 'lucide-react';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [resumeModalTab, setResumeModalTab] = useState<'sde' | 'aiml' | 'profile'>('sde');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const handleOpenResume = (tab: 'sde' | 'aiml' | 'profile' = 'sde') => {
    setResumeModalTab(tab);
    setIsResumeModalOpen(true);
  };

  const handleOpenSimulator = (feature: 'mediread' | 'kisan') => {
    const el = document.getElementById('architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Navigation (Strict 3-zone contract) */}
      <Navbar
        onResumeClick={() => handleOpenResume('sde')}
        onDeployClick={() => setIsDeployModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with 3D Canvas / Photo Bezel Switcher & Proof Strip */}
        <Hero
          onResumeClick={() => handleOpenResume('sde')}
          onDeployClick={() => setIsDeployModalOpen(true)}
        />

        {/* 2. Projects Showcase with Architecture Inspection Modal */}
        <ProjectsSection onOpenSimulator={handleOpenSimulator} />

        {/* 3. Interactive Live Simulator (MediRead & Kisan Sethu) */}
        <LiveSimulator initialTab="mediread" />

        {/* 4. Technical Skills Matrix */}
        <SkillsSection />

        {/* 5. Work Experience & Academic Foundation */}
        <ExperienceEducation />

        {/* 6. Certifications & Hackathons / Co-Curricular */}
        <CertificationsAchievements />

        {/* 7. Contact & Collaboration */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Resume Viewer Modal */}
      <ResumeViewerModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        defaultResumeId={resumeModalTab}
      />

      {/* Vercel Hosting & Deployment Modal */}
      <VercelDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* Floating Quick Action Bar (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 hidden md:flex items-center gap-2">
        <button
          onClick={() => handleOpenResume('sde')}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl shadow-2xl backdrop-blur-md transition-all hover:scale-105"
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>Resumes</span>
        </button>
        <button
          onClick={() => setIsDeployModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-xl shadow-2xl transition-all hover:scale-105"
        >
          <Rocket className="w-3.5 h-3.5" />
          <span>Vercel Deploy</span>
        </button>
      </div>
    </div>
  );
}
