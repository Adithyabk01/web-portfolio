import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  FileText,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Workflow,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Truck,
  Building2,
  Coins
} from 'lucide-react';

interface LiveSimulatorProps {
  initialTab?: 'mediread' | 'kisan';
}

const SAMPLE_REPORTS = [
  {
    id: 'cbc-1',
    name: 'Complete Blood Count (CBC) with Elevated WBC',
    rawText: `PATIENT DIAGNOSTIC LABORATORY REPORT
Test: Comprehensive Hemogram / CBC
Hemoglobin: 14.2 g/dL (Reference: 13.0 - 17.0)
Total Leucocyte Count (WBC): 14,800 /mcL (Reference: 4,000 - 11,000) [HIGH]
Platelet Count: 245,000 /mcL (Reference: 150,000 - 450,000)
Neutrophils: 78% (Reference: 40 - 70) [HIGH]
Lymphocytes: 18% (Reference: 20 - 45) [LOW]
Erythrocyte Sedimentation Rate (ESR): 28 mm/hr (Reference: 0 - 15) [HIGH]`,
    extractedMetrics: [
      { key: 'Hemoglobin', value: '14.2 g/dL', status: 'normal', range: '13.0 - 17.0' },
      { key: 'WBC (Leucocytes)', value: '14,800 /mcL', status: 'high', range: '4,000 - 11,000', concern: 'Active Infection / Inflammation' },
      { key: 'Platelet Count', value: '245,000 /mcL', status: 'normal', range: '150,000 - 450,000' },
      { key: 'Neutrophils', value: '78%', status: 'high', range: '40 - 70', concern: 'Bacterial Response' },
      { key: 'Lymphocytes', value: '18%', status: 'low', range: '20 - 45', concern: 'Relative Depletion' },
      { key: 'ESR', value: '28 mm/hr', status: 'high', range: '0 - 15', concern: 'Elevated Inflammatory Marker' },
    ],
    explanation: 'Your blood test shows normal red blood cells and oxygen-carrying capacity (Hemoglobin). However, your White Blood Cell count (WBC) and Neutrophil levels are elevated above the standard range, together with a higher inflammatory rate (ESR). In non-technical terms, your immune system is actively fighting off a mild bacterial infection or inflammatory process. Please share these findings with your consulting physician for appropriate antibacterial or symptomatic care.',
    kannadaExplanation: 'ನಿಮ್ಮ ರಕ್ತ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಹಿಮೋಗ್ಲೋಬಿನ್ ಸಾಮಾನ್ಯವಾಗಿದೆ. ಆದರೆ ಬಿಳಿ ರಕ್ತ ಕಣಗಳು (WBC) ಮತ್ತು ನ್ಯೂಟ್ರೋಫಿಲ್‌ಗಳ ಮಟ್ಟ ಹೆಚ್ಚಾಗಿದೆ. ಇದು ದೇಹದಲ್ಲಿ ಸೋಂಕು ಅಥವಾ ಉರಿಯೂತ ವಿರುದ್ಧ ಪ್ರತಿರಕ್ಷಣಾ ವ್ಯವಸ್ಥೆ ಹೋರಾಡುತ್ತಿರುವುದನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಸೂಕ್ತ ಚಿಕಿತ್ಸೆಗಾಗಿ ನಿಮ್ಮ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.'
  },
  {
    id: 'metabolic-1',
    name: 'Fasting Lipid & Glycemic Panel',
    rawText: `METABOLIC & GLYCEMIC PROFILE
Fasting Blood Sugar (FBS): 138 mg/dL (Reference: 70 - 100) [HIGH]
Post Prandial Blood Sugar: 186 mg/dL (Reference: < 140) [HIGH]
HbA1c (Glycated Hemoglobin): 7.1% (Reference: < 5.7%) [HIGH]
Total Cholesterol: 218 mg/dL (Reference: < 200) [BORDERLINE]
Triglycerides: 192 mg/dL (Reference: < 150) [HIGH]
HDL (Good Cholesterol): 42 mg/dL (Reference: > 40) [OPTIMAL]`,
    extractedMetrics: [
      { key: 'Fasting Blood Sugar', value: '138 mg/dL', status: 'high', range: '70 - 100', concern: 'Impaired Fasting Glucose' },
      { key: 'Post Prandial Sugar', value: '186 mg/dL', status: 'high', range: '< 140', concern: 'Post-Meal Glycemic Spike' },
      { key: 'HbA1c', value: '7.1%', status: 'high', range: '< 5.7%', concern: 'Consistent 3-Month Hyperglycemia' },
      { key: 'Total Cholesterol', value: '218 mg/dL', status: 'high', range: '< 200', concern: 'Mild Hyperlipidemia' },
      { key: 'Triglycerides', value: '192 mg/dL', status: 'high', range: '< 150', concern: 'Elevated Serum Lipids' },
      { key: 'HDL', value: '42 mg/dL', status: 'normal', range: '> 40' }
    ],
    explanation: 'Your fasting sugar and 3-month average glucose (HbA1c at 7.1%) are higher than normal, indicating insulin resistance or developing diabetes mellitus. Additionally, blood triglycerides are slightly elevated. It is recommended to schedule a follow-up with your endocrinologist to discuss diet optimization, physical exercise routines, and potential glucose management therapy.',
    kannadaExplanation: 'ನಿಮ್ಮ ರಕ್ತದಲ್ಲಿನ ಸಕ್ಕರೆ ಅಂಶ (HbA1c 7.1%) ಮತ್ತು ಟ್ರೈಗ್ಲಿಸರೈಡ್‌ಗಳು ಸಾಮಾನ್ಯಕ್ಕಿಂತ ಹೆಚ್ಚಾಗಿದೆ. ಇದು ಇನ್ಸುಲಿನ್ ಪ್ರತಿರೋಧ ಅಥವಾ ಮಧುಮೇಹದ ಲಕ್ಷಣವಾಗಿದೆ. ದಯವಿಟ್ಟು ಆಹಾರ ನಿಯಂತ್ರಣ ಮತ್ತು ವೈದ್ಯಕೀಯ ಸಲಹೆಯನ್ನು ಪಡೆಯಿರಿ.'
  }
];

export const LiveSimulator: React.FC<LiveSimulatorProps> = ({ initialTab = 'mediread' }) => {
  const [activeTab, setActiveTab] = useState<'mediread' | 'kisan'>(initialTab);
  
  // MediRead State
  const [selectedReportIndex, setSelectedReportIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportLang, setReportLang] = useState<'english' | 'kannada'>('english');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Kisan Sethu State
  const [activeRole, setActiveRole] = useState<'farmer' | 'buyer' | 'agent' | 'transporter'>('farmer');

  const currentReport = SAMPLE_REPORTS[selectedReportIndex];

  const handleSpeak = (text: string) => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis) {
        if (isSpeaking) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.warn('Speech synthesis restricted in sandbox:', err);
      setIsSpeaking(false);
    }
  };

  const simulateExtraction = (idx: number) => {
    setIsProcessing(true);
    try {
      if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    } catch {}
    setTimeout(() => {
      setSelectedReportIndex(idx);
      setIsProcessing(false);
    }, 400);
  };

  return (
    <section id="architecture" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#090d16] bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            INTERACTIVE SYSTEM ARCHITECTURE & DEMO LAB
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Explore Core Project Pipelines in Action
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Test the live regex extraction and LLM clinical summarizer from <strong>MediRead</strong>, or inspect the 4-role JWT RBAC coordination matrix from <strong>Kisan Sethu</strong>.
          </p>

          {/* Interactive Feature Switcher */}
          <div className="mt-6 inline-flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('mediread')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'mediread'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MediRead: AI Clinical Report Pipeline
            </button>
            <button
              onClick={() => setActiveTab('kisan')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                activeTab === 'kisan'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kisan Sethu: Multi-Role Marketplace Flow
            </button>
          </div>
        </div>

        {/* --- TAB 1: MEDIREAD SIMULATOR --- */}
        {activeTab === 'mediread' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Input Selection & Raw Parser View */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>PDF MEDICAL REPORT INPUT</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">SAMPLE SELECTOR</span>
                </div>

                <div className="space-y-2 mb-4">
                  {SAMPLE_REPORTS.map((r, i) => (
                    <button
                      key={r.id}
                      onClick={() => simulateExtraction(i)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                        selectedReportIndex === i
                          ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-sm'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-semibold text-slate-200">{r.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Click to run regex extraction & AI explanation</div>
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 mb-2">RAW PARSED PDF TEXT BUFFER</div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap max-h-48 border border-slate-800/80 leading-relaxed">
                    {currentReport.rawText}
                  </pre>
                </div>
              </div>

              {/* Extraction Pipeline Telemetry */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono space-y-2">
                <div className="flex items-center justify-between text-cyan-400">
                  <span>ENGINE: Python 3.11 + Llama3 (Ollama)</span>
                  <span>STATUS: READY</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  • Text parsing & regex tokenization applied: 6 biomarkers detected
                  <br />
                  • Clinical reference ranges verified against diagnostic invariants
                </div>
              </div>
            </div>

            {/* Right: Structured Biomarkers & Patient AI Translation */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Structured Extracted Metrics */}
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-mono text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>EXTRACTED BIOMARKER REPUTATION MATRIX</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {currentReport.extractedMetrics.length} PARAMETERS IDENTIFIED
                  </span>
                </div>

                {isProcessing ? (
                  <div className="py-12 flex flex-col items-center justify-center text-cyan-400 space-y-3">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span className="text-xs font-mono">EXTRACTING METRICS & RUNNING OLLAMA INFERENCE...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentReport.extractedMetrics.map((metric, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                          metric.status === 'high'
                            ? 'bg-red-950/20 border-red-500/40 text-red-200'
                            : metric.status === 'low'
                            ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                            : 'bg-slate-900/40 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-white">{metric.key}</span>
                          {metric.status !== 'normal' && (
                            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-red-900/50 text-red-300 border border-red-700/60">
                              {metric.status}
                            </span>
                          )}
                        </div>
                        <div className="text-base font-bold font-mono text-cyan-300 my-1">
                          {metric.value}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
                          <span>Ref: {metric.range}</span>
                          {metric.concern && (
                            <span className="text-red-400 font-mono text-[10px]">{metric.concern}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Llama3 AI Translation & Audio Output */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0c1626] to-[#07090e] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      PATIENT-FRIENDLY CLINICAL EXPLANATION (LLAMA3 / OLLAMA)
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Language Switch */}
                    <div className="inline-flex p-0.5 bg-slate-900 border border-slate-700 rounded-lg text-xs">
                      <button
                        onClick={() => setReportLang('english')}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          reportLang === 'english' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400'
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setReportLang('kannada')}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          reportLang === 'kannada' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400'
                        }`}
                      >
                        ಕನ್ನಡ (Kannada)
                      </button>
                    </div>

                    {/* Speech Output */}
                    <button
                      onClick={() => handleSpeak(reportLang === 'english' ? currentReport.explanation : currentReport.kannadaExplanation)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isSpeaking
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                          : 'bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border-cyan-500/50'
                      }`}
                      title="Audio Speech Synthesis (Voice Output for Non-Technical Users)"
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isSpeaking ? 'Stop Audio' : 'Play Voice'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-4">
                  {reportLang === 'english' ? currentReport.explanation : currentReport.kannadaExplanation}
                </p>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-cyan-400/90 text-[11px]">
                    Pipeline: PDF Regex → Rule-Based Classifier → Local Llama3 Prompt → TTS
                  </span>
                  <span className="text-[11px] text-slate-500">Privacy: Zero Cloud Exposure</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- TAB 2: KISAN SETHU 4-ROLE FLOW --- */}
        {activeTab === 'kisan' && (
          <div className="space-y-8">
            {/* 4 Roles Segmented Picker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'farmer', title: '1. Farmer (Grower)', icon: UserCheck, desc: 'Crop listing, disease diagnosis & QR Farmer ID' },
                { id: 'buyer', title: '2. Buyer (Trader/Wholesaler)', icon: Building2, desc: 'Direct procurement, bulk bidding & quality metrics' },
                { id: 'agent', title: '3. Agri Agent (FPO / Panchayat)', icon: ShieldCheck, desc: 'Scheme verification, MSP coordination & dispute audit' },
                { id: 'transporter', title: '4. Transporter (Logistics)', icon: Truck, desc: 'Route optimization, fleet tracking & delivery proofs' },
              ].map((r) => {
                const IconComponent = r.icon;
                const isSelected = activeRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setActiveRole(r.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-cyan-950/50 border-cyan-400 shadow-lg text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 mb-2 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <div className="text-xs font-bold text-white">{r.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">{r.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Role Workflow Details */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-cyan-500/30 shadow-2xl">
              {activeRole === 'farmer' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-mono text-emerald-400">ROLE: FARMER / PRODUCER (JWT SCOPE: role_farmer)</span>
                      <h3 className="text-xl font-bold text-white mt-1">Digital Crop Listing & AI Disease Diagnosis</h3>
                    </div>
                    <span className="px-3 py-1 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 text-xs font-mono">
                      AUTHENTICATED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">MODULE 1: AI DISEASE DETECTION</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Upload smartphone photograph of infected paddy or tomato foliage; OpenCV preprocessing and CNN classifier yields diagnosis with organic treatment recommendations.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">MODULE 2: QR DIGITAL FARMER ID</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Unique encrypted cryptographic QR code verifying land holding record, FPO affiliation, and authentic organic produce certification for instantaneous mandi check-in.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">MODULE 3: MULTILINGUAL CHATBOT</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Speech-enabled regional interface in Kannada and Hindi for querying MSP floor rates, fertilizer subsidies, and local weekly mandi auctions.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeRole === 'buyer' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-mono text-blue-400">ROLE: BUYER / WHOLESALER (JWT SCOPE: role_buyer)</span>
                      <h3 className="text-xl font-bold text-white mt-1">Transparent Bidding & Direct Sourcing Contract</h3>
                    </div>
                    <span className="px-3 py-1 rounded-md bg-blue-950/60 text-blue-300 border border-blue-500/40 text-xs font-mono">
                      AUTHENTICATED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">AUCTION BID ENGINE</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Place competitive spot bids on authenticated farmer harvest lots with automated escrow deposit locks in PostgreSQL.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">PRODUCE QUALITY GRADING</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Inspect moisture indices, color uniformity scores, and harvest timestamps verified by regional collection agents.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">CONTRACT SETTLEMENT</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Instant digital contract generation eliminating 3 layers of middlemen commissions, boosting farmer net realizations.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeRole === 'agent' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-mono text-amber-400">ROLE: AGENT / GRAM PANCHAYAT (JWT SCOPE: role_agent)</span>
                      <h3 className="text-xl font-bold text-white mt-1">Government Scheme Tracking & Verification Audits</h3>
                    </div>
                    <span className="px-3 py-1 rounded-md bg-amber-950/60 text-amber-300 border border-amber-500/40 text-xs font-mono">
                      SUPERVISORY
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">FARMER VERIFICATION</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Scan farmer QR codes to validate land documents, Gram Panchayat census ID, and eligibility for PM-KISAN or state subsidies.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">MSP BENCHMARKING</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Enforce Minimum Support Price guarantees preventing distress sales during sudden seasonal supply gluts.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">DISPUTE MEDIATION</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Arbitrate weighment and payment escrow disputes with immutable transaction log records.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeRole === 'transporter' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-mono text-purple-400">ROLE: TRANSPORTER / FLEET (JWT SCOPE: role_transporter)</span>
                      <h3 className="text-xl font-bold text-white mt-1">Cold-Chain & Consolidated Rural Fleet Logistics</h3>
                    </div>
                    <span className="px-3 py-1 rounded-md bg-purple-950/60 text-purple-300 border border-purple-500/40 text-xs font-mono">
                      DISPATCHED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">ROUTE CONSOLIDATION</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Aggregate partial loads across neighboring village collection points to fill 3-ton and 10-ton vehicles efficiently.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">REAL-TIME TELEMETRY</div>
                      <p className="text-xs text-slate-300 mt-1">
                        FastAPI WebSockets broadcasting vehicle dispatch status, transit milestones, and estimated time of arrival (ETA).
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">PROOF OF DELIVERY (PoD)</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Digital sign-off with OTP confirmation triggers instant fund release from escrow to farmer and transporter accounts.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
