import React, { useState } from 'react';
import { X, Copy, Check, Rocket, Globe, Terminal, ExternalLink, ShieldCheck } from 'lucide-react';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedVercelJson, setCopiedVercelJson] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  if (!isOpen) return null;

  const vercelJsonContent = `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`;

  const cliCommands = `# 1. Push your repository to GitHub:
git init
git add .
git commit -m "feat: Adithya B K 3D Portfolio Website"
git branch -M main
git remote add origin https://github.com/Adithyabk01/adithya-portfolio.git
git push -u origin main

# 2. Deploy instantly via Vercel CLI (or import on vercel.com):
npx vercel --prod`;

  const handleCopy = async (text: string, type: 'json' | 'cli') => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
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

    if (type === 'json') {
      setCopiedVercelJson(true);
      setTimeout(() => setCopiedVercelJson(false), 2000);
    } else {
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c121e] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Rocket className="w-4 h-4" />
            <span>DEPLOYMENT & DOMAIN HOSTING</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            Hosting on Vercel & Custom Domain
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Your portfolio is pre-configured for instant zero-config deployment on Vercel, Netlify, or GitHub Pages.
          </p>
        </div>

        {/* Current Live Status in AI Studio */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>LIVE AI STUDIO PREVIEW DEPLOYED</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
              ACTIVE & RESPONSIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The application is already running in real time with high-performance WebGL 3D rendering, responsive layouts, and interactive project deep dives.
          </p>
        </div>

        {/* 3 Simple Steps to Vercel */}
        <div className="space-y-4 mb-6 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="font-bold text-white mb-1">
              Step 1: Push Code to your GitHub Repo
            </div>
            <p className="text-xs text-slate-400 mb-2">
              Run this in your terminal to initialize and push to <span className="text-cyan-300 font-mono">github.com/Adithyabk01/adithya-portfolio</span>:
            </p>
            <div className="relative">
              <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-slate-300 overflow-x-auto">
                {cliCommands}
              </pre>
              <button
                onClick={() => handleCopy(cliCommands, 'cli')}
                className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                title="Copy commands"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="font-bold text-white mb-1">
              Step 2: Connect with Vercel
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Go to <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-mono">vercel.com/new</a>, import your GitHub repository, choose <strong>Vite</strong> as Framework Preset, and click <strong>Deploy</strong>. Vercel will automatically build with <code className="text-cyan-300 font-mono">npm run build</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="font-bold text-white mb-1">
              Step 3: Connect Custom Domain (Optional)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              In your Vercel project dashboard under <strong>Settings → Domains</strong>, add your custom domain (e.g., <code className="text-cyan-300 font-mono">adithyabk.dev</code> or <code className="text-cyan-300 font-mono">adithya.tech</code>). Vercel provides automatic SSL certificates and global edge CDN caching.
            </p>
          </div>
        </div>

        {/* Vercel JSON Config */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-300">
              Optional <code className="text-cyan-300 font-mono">vercel.json</code> SPA Rewrite Configuration
            </span>
            <button
              onClick={() => handleCopy(vercelJsonContent, 'json')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              {copiedVercelJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedVercelJson ? 'Copied' : 'Copy Config'}</span>
            </button>
          </div>
          <pre className="p-2.5 rounded bg-slate-950 text-[11px] font-mono text-slate-400 overflow-x-auto">
            {vercelJsonContent}
          </pre>
        </div>

        {/* Footer Link */}
        <div className="flex items-center justify-end">
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
          >
            <span>Open Vercel Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
