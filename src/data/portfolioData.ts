export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'aiml' | 'fullstack' | 'data' | 'mobile';
  domain: string;
  duration?: string;
  role: string;
  summary: string;
  problem: string;
  outcome: string;
  techStack: string[];
  keyHighlights: string[];
  architectureFlow?: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  score: string;
  scoreLabel: string;
  details: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  badge?: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  description: string;
  type: 'hackathon' | 'leadership' | 'award' | 'community';
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Adithya B K',
    rolePrimary: 'AI/ML & Full-Stack Software Engineer',
    headline: 'Bridging High-Performance Web Architecture with Applied Machine Learning & NLP',
    bio: 'Computer Science undergraduate at PES College of Engineering, Mandya, specializing in Artificial Intelligence & Machine Learning (7.73 CGPA). Experienced in designing end-to-end production web applications, architecting robust REST APIs with JWT & RBAC, and developing applied ML pipelines with LLMs (Llama3/Ollama, LangChain) and scikit-learn.',
    email: 'adithya.bk01@gmail.com',
    secondaryEmail: 'adithyaappu677@gmail.com',
    phone: '+91 8971095311',
    location: 'Mandya, Karnataka, India',
    github: 'https://github.com/Adithyabk01',
    linkedin: 'https://linkedin.com/in/adithyabk01',
    photoUrl: '/assets/aistudio/IMG_20261026_111239_c388cae6.jpg',
    status: 'Available for Software Engineering & AI/ML Roles',
    stats: [
      { label: 'Academic CGPA', value: '7.73 / 10', detail: 'PES College of Engineering' },
      { label: 'SIH 2025 Qualifier', value: 'National Level', detail: 'Smart India Hackathon' },
      { label: 'Production Projects', value: '6+ Developed', detail: 'Full-Stack, ML & Data' },
      { label: 'Industry Certifications', value: '9 Completed', detail: 'IBM, Google Cloud, HKUST' },
    ]
  },

  resumes: [
    {
      id: 'sde',
      title: 'Software Engineer Resume (Full-Stack)',
      filename: 'Adithya_BK_SDE_Resume_28ad18e5.pdf',
      path: '/assets/aistudio/Adithya_BK_SDE_Resume_28ad18e5.pdf',
      description: 'Emphasizes Full-Stack development, FastAPI, React, TypeScript, PostgreSQL, and scalable system design.',
      focus: ['React.js', 'FastAPI', 'PostgreSQL', 'System Design', 'JWT RBAC', 'REST APIs']
    },
    {
      id: 'aiml',
      title: 'AI/ML Engineer Resume (Machine Learning & NLP)',
      filename: 'Adithya_BK_AIML_39fd1308.pdf',
      path: '/assets/aistudio/Adithya_BK_AIML_39fd1308.pdf',
      description: 'Focuses on Machine Learning pipelines, NLP, LLM integrations (Llama3 via Ollama, LangChain), and Data Science.',
      focus: ['Scikit-learn', 'NLP & LLMs', 'Llama3 / Ollama', 'EDA & Feature Engineering', 'Pandas & NumPy']
    },
    {
      id: 'profile',
      title: 'Academic Student Profile (PESCE)',
      filename: 'Adithya_B_K-AIML_a31cc302.pdf',
      path: '/assets/aistudio/Adithya_B_K-AIML_a31cc302.pdf',
      description: 'Official academic profile including coursework, hackathons, college leadership, and full curriculum records.',
      focus: ['B.E. Degree 2023-2027', 'HackSprint 5.0 Co-Organizer', 'Typing Arena Organizer', 'ISTE & NSS']
    }
  ],

  projects: [
    {
      id: 'kisan-sethu',
      title: 'Kisan Sethu (KrishiMitra)',
      subtitle: 'AI-Powered AgriTech Marketplace & Coordination Platform',
      category: 'fullstack',
      domain: 'AgriTech / Full-Stack & Applied AI',
      role: 'Product Designer & Full-Stack Developer',
      summary: 'Architected a full-stack digital marketplace connecting farmers, buyers, agricultural agents, and transporters with role-based JWT authentication and AI-driven intelligence.',
      problem: 'Agricultural ecosystems suffer from fragmented intermediary supply chains, lack of real-time crop disease diagnosis for rural farmers, and opaque pricing transparency between growers and bulk buyers.',
      outcome: 'Designed a 4-role unified ecosystem (Farmer, Buyer, Agent, Transporter) with RESTful endpoints, real-time status alerts, crop recommendation algorithms, and a proposed QR-based Digital Farmer ID verification system.',
      techStack: ['React.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'JWT Auth', 'REST APIs'],
      keyHighlights: [
        'JWT-based secure authentication with strict Role-Based Access Control (RBAC) across 4 distinct user profiles',
        'Built full REST APIs in FastAPI with PostgreSQL relational schema for orders, bids, and logistics tracking',
        'Engineered responsive dashboards tailored for rural connectivity using React and Tailwind CSS',
        'Specified AI feature modules: Crop recommendation, plant disease detection, and multilingual chatbot assistance'
      ],
      architectureFlow: [
        'Client (React/TypeScript UI)',
        'FastAPI Gateway & JWT RBAC Filter',
        'Business Logic (Bidding, Crop Tracking & Logistics)',
        'PostgreSQL Relational Storage & AI Inference Service'
      ],
      githubUrl: 'https://github.com/Adithyabk01',
      featured: true
    },
    {
      id: 'mediread',
      title: 'MediRead',
      subtitle: 'AI-Based Medical Report Understanding & Clinical Translation System',
      category: 'aiml',
      domain: 'Healthcare AI / NLP & LLMs',
      role: 'Backend & AI Integration Engineer',
      summary: 'Developed an automated pipeline extracting structured clinical metrics from PDF medical reports and generating simplified multilingual explanations with voice synthesis.',
      problem: 'Patients receive complex pathological reports with dense acronyms (e.g., HbA1c, SGPT, MCV, Neutrophils) that cause anxiety and comprehension barriers without immediate clinical consultation.',
      outcome: 'Streamlined report analysis through regex-based metric extraction, automatic flagging of out-of-range clinical biomarkers, and local Llama3 (via Ollama) translation into natural patient-friendly explanations with text-to-speech output.',
      techStack: ['Python', 'NLP', 'Llama3', 'Ollama', 'Regex Parsing', 'Speech Synthesis', 'Flask/FastAPI'],
      keyHighlights: [
        'Regex & text extraction pipeline parsing complex PDF laboratory test results into structured key-value pairs',
        'Rule-based abnormal-value concern classifier comparing results against standard clinical reference ranges',
        'Zero-cloud-leakage local LLM pipeline using Llama3 running on Ollama for contextual medical report explanation',
        'Integrated multilingual translation and voice output synthesis for non-technical patients and regional languages'
      ],
      architectureFlow: [
        'PDF Medical Report Upload',
        'Text Extraction & Regex Parser',
        'Clinical Concern Classifier (Reference Range Check)',
        'Llama3 via Ollama Natural Language Translation',
        'Audio Voice Synthesis & Multilingual Output'
      ],
      githubUrl: 'https://github.com/Adithyabk01',
      featured: true
    },
    {
      id: 'startup-trends',
      title: 'Startup Investment Trends in India',
      subtitle: 'Data Analytics & Interactive Business Intelligence Pipeline',
      category: 'data',
      domain: 'Data Analytics / Business Intelligence',
      role: 'Data Analyst & Dashboard Developer',
      duration: '1 Month',
      summary: 'Analyzed real-world Indian startup funding datasets using Python and MySQL to uncover investment trends across industries, funding stages, and geographic hubs, visualized via Power BI.',
      problem: 'Unstructured, messy venture capital funding datasets made it challenging for stakeholders to pinpoint macro sectoral shifts, city-by-city capital concentration, and seed vs growth equity patterns.',
      outcome: 'Built an end-to-end data pipeline in Python for data cleaning, normalisation, and MySQL warehousing, capped with high-impact interactive Power BI dashboards for executive data discovery.',
      techStack: ['Python', 'MySQL', 'Power BI', 'Pandas', 'NumPy', 'Data Modeling', 'DAX'],
      keyHighlights: [
        'Cleaned and structured raw multi-year startup investment datasets using Pandas and NumPy',
        'Engineered relational schema in MySQL optimizing querying across sectors, valuation tiers, and regions',
        'Built interactive Power BI visual dashboards surfacing city-level investment flows (Bengaluru, Delhi NCR, Mumbai) and year-over-year sector growth'
      ],
      architectureFlow: [
        'Raw Venture Capital Datasets',
        'Python Preprocessing & Deduplication',
        'MySQL Relational Data Warehouse',
        'Power BI Interactive BI Visualizations'
      ],
      githubUrl: 'https://github.com/Adithyabk01',
      featured: true
    },
    {
      id: 'typing-arena',
      title: 'The Typing Arena',
      subtitle: 'Real-Time Multi-Round Competitive Typing Platform',
      category: 'fullstack',
      domain: 'Web Development / Software Engineering',
      role: 'Full-Stack Developer & Organizer',
      summary: 'Real-time competitive web platform deployed for collegiate technical contests featuring multi-round challenges: Typing Master, Blind Typing, and Code Rush.',
      problem: 'Evaluating dozens of competitors in real-time speed coding and typing competitions with manual scoring causes evaluation delays and potential score discrepancies.',
      outcome: 'Created a synchronized platform handling simultaneous multi-round tests with automated WPM/accuracy computation, anti-cheat detection, and live dynamic leaderboards.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Lovable AI', 'Git', 'GitHub', 'Real-Time State'],
      keyHighlights: [
        'Designed multi-round game modes: Typing Master (speed), Blind Typing (screen obscured), and Code Rush (syntax challenge)',
        'Automated scoring algorithm computing net WPM, keystroke accuracy, and error penalties in real time',
        'Live leaderboard updating competition rankings instantly for audience and participants during ISTE events'
      ],
      githubUrl: 'https://github.com/Adithyabk01',
      featured: false
    },
    {
      id: 'cancer-cell-prediction',
      title: 'Cancer Cell Prediction Pipeline',
      subtitle: 'Supervised Learning Classification with Dimensionality Reduction',
      category: 'aiml',
      domain: 'Applied Machine Learning / Diagnostics',
      role: 'Machine Learning Developer (Internship)',
      duration: '6 Weeks',
      summary: 'Developed an end-to-end supervised machine learning classification pipeline for healthcare diagnostic datasets, reducing feature dimensionality from 32 to 18 features while maintaining high validation accuracy.',
      problem: 'High-dimensional medical diagnostic datasets often suffer from multicollinearity and noisy features that degrade model generalization and increase computation time.',
      outcome: 'Conducted rigorous correlation matrix analysis, feature pruning, and validated model robustness using 5-fold cross-validation with scikit-learn.',
      techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Data Analysis', 'Cross-Validation'],
      keyHighlights: [
        'Performed thorough exploratory data analysis (EDA) and correlation matrix pruning (32 down to 18 features)',
        'Trained and benchmarked supervised classification models (Logistic Regression, Random Forest, SVM)',
        'Validated generalization performance using stratified 5-fold cross-validation'
      ],
      githubUrl: 'https://github.com/Adithyabk01',
      featured: false
    },
    {
      id: 'ios-swift-app',
      title: 'iOS Application Development',
      subtitle: 'Native Mobile Experience in Swift & Xcode',
      category: 'mobile',
      domain: 'Mobile App Development',
      role: 'iOS App Developer',
      duration: 'Training Program',
      summary: 'Developed native iOS application modules as part of the iOS App Development program, implementing Swift programming paradigms, UIKit/SwiftUI components, and native iOS architectures.',
      problem: 'Building fluid, Apple Human Interface Guidelines-compliant mobile interfaces requiring strict memory safety and Swift concurrency principles.',
      outcome: 'Gained practical expertise in Swift syntax, view controller lifecycles, AutoLayout, and deploying builds via Xcode.',
      techStack: ['Swift', 'Xcode', 'iOS SDK', 'UI Components', 'Git'],
      keyHighlights: [
        'Implemented modern Swift language idioms and object-oriented architectures',
        'Constructed responsive UI layouts adhering to Apple Human Interface Guidelines',
        'Gained hands-on experience with native iOS SDK debugging and testing in Xcode simulators'
      ],
      githubUrl: 'https://github.com/Adithyabk01',
      featured: false
    }
  ] as Project[],

  skills: {
    languages: [
      { name: 'Python', level: 'Advanced', description: 'ML pipelines, FastAPI backends, data engineering' },
      { name: 'TypeScript', level: 'Advanced', description: 'Type-safe React SPAs, component architectures' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', description: 'Modern async/await, DOM, interactive apps' },
      { name: 'SQL', level: 'Proficient', description: 'Relational schema design, queries, aggregation' },
      { name: 'C++', level: 'Intermediate', description: 'Data structures, algorithm optimization' },
      { name: 'C', level: 'Intermediate', description: 'Systems fundamentals, memory management' },
      { name: 'Java', level: 'Foundational', description: 'OOP fundamentals, enterprise concepts' },
      { name: 'Swift', level: 'Intermediate', description: 'iOS application development, Xcode' }
    ],
    aiMl: [
      { name: 'Scikit-learn', level: 'Advanced', description: 'Supervised classification, regression, clustering' },
      { name: 'Pandas & NumPy', level: 'Advanced', description: 'High-speed tabular wrangling, vectorization' },
      { name: 'Natural Language Processing', level: 'Proficient', description: 'Tokenization, TF-IDF, text parsing' },
      { name: 'Llama3 / Ollama', level: 'Proficient', description: 'Local LLM inference, structured output prompting' },
      { name: 'LangChain', level: 'Intermediate', description: 'Chaining prompt templates, document QA' },
      { name: 'Feature Engineering', level: 'Advanced', description: 'Correlation analysis, dimensionality reduction' },
      { name: 'Prompt Engineering', level: 'Proficient', description: 'Structured prompt design, few-shot prompting' }
    ],
    webDevelopment: [
      { name: 'React.js', level: 'Advanced', description: 'Custom hooks, state management, modern patterns' },
      { name: 'FastAPI', level: 'Advanced', description: 'Async Python REST APIs, Pydantic schemas' },
      { name: 'Tailwind CSS', level: 'Advanced', description: 'Utility-first responsive styling, dark mode' },
      { name: 'REST API Architecture', level: 'Advanced', description: 'Endpoint design, pagination, error contracts' },
      { name: 'JWT & RBAC Auth', level: 'Proficient', description: 'Multi-role tokens, authorization gates' },
      { name: 'Three.js / WebGL', level: 'Intermediate', description: '3D scenes, PBR materials, interactive canvases' }
    ],
    databasesCloud: [
      { name: 'PostgreSQL', level: 'Proficient', description: 'Relational modeling, indexing, foreign keys' },
      { name: 'MySQL', level: 'Advanced', description: 'Data pipelines, stored procedures, indexing' },
      { name: 'Firebase', level: 'Proficient', description: 'Firestore, client authentication, realtime' },
      { name: 'Power BI', level: 'Advanced', description: 'DAX expressions, star schemas, dashboards' },
      { name: 'Linux / Bash', level: 'Proficient', description: 'Server administration, shell scripting, CLI tools' }
    ],
    toolsCore: [
      { name: 'Git & GitHub', level: 'Advanced', description: 'Version control, branching, PR workflows' },
      { name: 'VS Code & Jupyter', level: 'Advanced', description: 'Debugging, interactive data analysis' },
      { name: 'Xcode', level: 'Intermediate', description: 'iOS app compilation, simulator profiling' },
      { name: 'Judge0 API', level: 'Intermediate', description: 'Code execution sandboxes, runner integration' },
      { name: 'Data Structures & Algorithms', level: 'Proficient', description: 'Algorithmic problem solving, complexity analysis' }
    ]
  },

  experience: [
    {
      id: 'ml-trainee',
      role: 'Machine Learning Trainee (Internship)',
      company: 'Employability.life',
      location: 'Remote / Collaboration with Federation Univ Australia',
      duration: 'Aug 2024 – Oct 2024',
      type: 'Internship',
      highlights: [
        'Built a supervised-learning cancer-cell classification pipeline on a synthetic healthcare dataset end-to-end.',
        'Executed exploratory data analysis and correlation filtering to compress dimensionality from 32 to 18 decisive features.',
        'Evaluated multi-model generalization performance using 5-fold cross-validation, hyperparameter tuning, and ROC-AUC curves.',
        'Documented reproducible notebooks and analytical reports on diagnostic predictive performance.'
      ],
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter']
    }
  ],

  education: [
    {
      degree: 'B.E. in Computer Science & Engineering (AI & ML)',
      institution: 'PES College of Engineering (PESCE)',
      location: 'Mandya, Karnataka, India',
      duration: 'Oct 2023 – Oct 2027 (Expected)',
      score: '7.73 / 10 CGPA',
      scoreLabel: 'CGPA through 6th Semester (Zero Active Backlogs)',
      details: [
        'Specialization in Artificial Intelligence & Machine Learning',
        'Key coursework: Data Structures, Machine Learning, Database Management Systems, Operating Systems, Computer Networks, Software Engineering',
        'Active member of technical forums (ISTE), hackathon organizing committees, and NSS/YRCW community service'
      ]
    },
    {
      degree: 'Pre-University Course (12th / PUC - Science)',
      institution: 'Christ The King PU College',
      location: 'K R Pete, Karnataka',
      duration: '2020 – 2022',
      score: '90.0%',
      scoreLabel: 'Distinction',
      details: ['Physics, Chemistry, Mathematics, and Computer Science (PCMC)']
    },
    {
      degree: 'Secondary School (10th / SSLC)',
      institution: 'SSKC English Medium High School',
      location: 'K R Pete, Karnataka',
      duration: 'Passing Year: 2020',
      score: '81.0%',
      scoreLabel: 'First Class',
      details: ['General Science, Mathematics, English, Social Sciences']
    }
  ] as Education[],

  certifications: [
    {
      id: 'ibm-ml',
      name: 'Machine Learning with Python',
      issuer: 'IBM',
      skills: ['Supervised Learning', 'Model Evaluation', 'Scikit-learn', 'Python']
    },
    {
      id: 'ibm-devops',
      name: 'Introduction to DevOps',
      issuer: 'IBM',
      skills: ['CI/CD Pipelines', 'Agile Principles', 'Automation', 'Cloud Infrastructure']
    },
    {
      id: 'gcp-ai',
      name: 'Introduction to AI and Machine Learning on Google Cloud',
      issuer: 'Google Cloud',
      skills: ['Vertex AI', 'Cloud AutoML', 'GCP Services', 'Model Deployment']
    },
    {
      id: 'cu-nlp',
      name: 'Fundamentals of Natural Language Processing',
      issuer: 'University of Colorado Boulder',
      skills: ['Tokenization', 'TF-IDF', 'Sentiment Analysis', 'Language Models']
    },
    {
      id: 'vanderbilt-prompt',
      name: 'Prompt Engineering for ChatGPT',
      issuer: 'Vanderbilt University',
      skills: ['Few-shot Prompting', 'Chain-of-thought', 'Template Formulation']
    },
    {
      id: 'hkust-se',
      name: 'Software Engineering: Software Design and Project Management',
      issuer: 'The Hong Kong University of Science and Technology (HKUST)',
      skills: ['System Design', 'Architectural Patterns', 'Agile Management']
    },
    {
      id: 'forage-deloitte-tech',
      name: 'Deloitte Australia Technology Job Simulation',
      issuer: 'Deloitte / Forage',
      skills: ['Technology Strategy', 'Code Review', 'System Modernization']
    },
    {
      id: 'forage-deloitte-data',
      name: 'Deloitte Australia Data Analytics Job Simulation',
      issuer: 'Deloitte / Forage',
      skills: ['Exploratory Data Analysis', 'Client Reporting', 'Business Insights']
    },
    {
      id: 'techsaksham',
      name: 'Industry 4.0 Technologies Foundation Certification',
      issuer: 'Microsoft & SAP CSR Initiative (TechSaksham / Edunet / AICTE)',
      skills: ['Industry 4.0', 'Power BI', 'Python for Analytics', 'MySQL']
    },
    {
      id: 'xpro-aiml',
      name: 'XPro Program – AI & ML (Cancer Cell Prediction)',
      issuer: 'Employability.life & Federation University Australia',
      skills: ['Biomedical ML', 'Classification', 'Validation']
    },
    {
      id: 'ios-cert',
      name: 'iOS Application Development Program',
      issuer: 'iOS App Development Initiative',
      skills: ['Swift', 'Xcode', 'Mobile Architecture']
    }
  ] as Certification[],

  achievements: [
    {
      id: 'sih-2025',
      title: 'Smart India Hackathon (SIH) 2025 – National Level Qualifier',
      organization: 'Ministry of Education / AICTE',
      description: 'Selected through rigorous internal collegiate evaluation by demonstrating innovative problem-solving, rapid prototyping, and collaborative team leadership.',
      type: 'hackathon'
    },
    {
      id: 'hacksprint',
      title: 'Co-Organizer – HackSprint 5.0 National Hackathon',
      organization: 'PES College of Engineering, Mandya',
      description: 'Coordinated logistics, schedule, mentorship, and evaluation pipelines for teams participating from across India at PESCE.',
      type: 'leadership'
    },
    {
      id: 'typing-arena-org',
      title: 'Event Organizer – Typing Arena Competition',
      organization: 'Indian Society for Technical Education (ISTE)',
      description: 'Built custom competition platform, scheduled rounds, managed live leaderboards, and supervised evaluation for student participants.',
      type: 'leadership'
    },
    {
      id: 'minute-win',
      title: 'Runner-Up – Minute to Win Competition',
      organization: 'ISTE Student Chapter',
      description: 'Secured 2nd place out of 50+ participants across a rapid sequence of 6-7 analytical and reaction mini-challenges.',
      type: 'award'
    },
    {
      id: 'community-service',
      title: 'Active Member & Volunteer – ISTE, YRCW & NSS',
      organization: 'Youth Red Cross Wing & National Service Scheme',
      description: 'Active contributor to technical workshops, campus blood donation drives, and rural community welfare programs in Mandya district.',
      type: 'community'
    }
  ] as Achievement[]
};
