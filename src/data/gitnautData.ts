export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image: string;
  details: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Skill {
  category: string;
  items: Array<{
    name: string;
    level: number;
    icon: string;
  }>;
}

export const projects: Project[] = [
  {
    id: 'astra-ide',
    name: 'ASTRA-IDE',
    description: 'Self-scheduling cloud IDE with a deep-RL Kubernetes scheduler',
    technologies: ['Next.js 14', 'FastAPI', 'Docker', 'gVisor', 'Kubernetes', 'PyTorch', 'eBPF', 'Yjs'],
    github: 'https://github.com/PrasannaMishra001/astra-ide',
    demo: 'https://astraide.tech',
    image: '/prasanna.jpeg',
    details: `ASTRA-IDE is a production-grade self-scheduling cloud IDE.

    • Real per-workspace containers with adaptive runc/gVisor sandboxing
    • Deep-RL (PPO) Kubernetes scheduler for placement decisions
    • eBPF telemetry and LSTM-based container pre-warming
    • Karmada multi-cluster federation
    • Yjs CRDT live collaboration (multi-user editing)
    • CI/CD via GitHub Actions and GHCR

    Live at astraide.tech. Stack: Next.js 14 + FastAPI + Docker + Kubernetes + PyTorch.`,
    status: 'in-progress'
  },
  {
    id: 'gitnaut',
    name: 'GitNaut',
    description: 'Terminal-style GitHub intelligence and contributor analytics',
    technologies: ['React', 'TypeScript', 'Node.js', 'GitHub API', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/PrasannaMishra001/GitNaut',
    demo: 'https://git-naut.vercel.app',
    image: '/prasanna.jpeg',
    details: `GitNaut is a terminal-first GitHub analytics cockpit built by Prasanna Mishra.

    • Repository intelligence and quick stats
    • Contributor leaderboards and activity snapshots
    • PR analysis with visual charts and SVG export
    • Language breakdowns, file tree, and file preview
    • Multiple themes (Matrix, Amber, Blue, White)
    • Mobile support, sound effects, command history

    Built with React + TypeScript + Vite + Tailwind CSS.
    Backend: Node.js + Express proxying GitHub REST API.`,
    status: 'completed'
  },
  {
    id: 'churnaware',
    name: 'ChurnAware',
    description: 'ML-driven customer churn prediction with interpretable insights',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    github: 'https://github.com/PrasannaMishra001/ChurnAware',
    image: '/prasanna.jpeg',
    details: `ChurnAware predicts customer churn using machine learning.

    • Trains Random Forest, XGBoost, Logistic Regression ensembles
    • Feature importance via SHAP and permutation importance
    • Precision/Recall/F1 evaluation with confusion matrices
    • Exploratory data analysis with Matplotlib & Seaborn
    • Full Jupyter notebook pipeline from raw data to predictions

    Dataset: Telco customer churn (7,043 records, 21 features).`,
    status: 'completed'
  },
  {
    id: 'einstein-contact-manager',
    name: 'Einstein Contact Manager',
    description: 'Salesforce Lightning contact management with Einstein AI predictions',
    technologies: ['Salesforce', 'Apex', 'Lightning Web Components', 'Einstein AI', 'SOQL'],
    github: 'https://github.com/PrasannaMishra001/Einstein-Contact-Manager',
    demo: 'https://github.com/PrasannaMishra001/Einstein-Contact-Manager',
    image: '/prasanna.jpeg',
    details: `Enterprise contact manager on the Salesforce platform.

    • Lightning Web Components UI for contact CRUD
    • Apex controllers with SOQL for data layer
    • Einstein AI integration for lead scoring predictions
    • Real-time search, filtering, and sorting
    • Role-based access and sharing rules

    Built during Salesforce developer training.`,
    status: 'completed'
  },
  {
    id: 'bodh',
    name: 'Bodh',
    description: 'AI-powered quiz & learning platform using Google Gemini',
    technologies: ['React', 'Node.js', 'Google Gemini API', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/PrasannaMishra001/Bodh',
    image: '/prasanna.jpeg',
    details: `Bodh is an AI-driven quiz platform that generates adaptive questions.

    • Google Gemini API generates topic-specific questions
    • Adaptive difficulty based on user performance
    • Real-time scoring and leaderboard
    • Topic selection across CS fundamentals
    • Clean React UI with Tailwind CSS

    Built for interactive learning and self-assessment.`,
    status: 'completed'
  },
  {
    id: 'cattle-health',
    name: 'Cattle Health Monitoring',
    description: 'Sensor data + ML pipeline for livestock health prediction',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'IoT', 'Flask'],
    github: 'https://github.com/PrasannaMishra001/Cattle-Health-Monitoring',
    image: '/prasanna.jpeg',
    details: `ML-based cattle health monitoring system.

    • Ingests sensor data (temperature, heart rate, activity)
    • Random Forest classifier for health status prediction
    • Alert system for abnormal readings
    • Flask API for real-time predictions
    • Data visualization dashboard

    Built for agricultural tech applications.`,
    status: 'completed'
  },
  {
    id: 'apnasafar',
    name: 'ApnaSafar',
    description: 'Travel itinerary planner with smart recommendations',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Google Maps API'],
    github: 'https://github.com/PrasannaMishra001/ApnaSafar',
    image: '/prasanna.jpeg',
    details: `ApnaSafar helps users plan travel itineraries with smart suggestions.

    • Interactive map integration with Google Maps API
    • Budget-aware trip planning and cost estimation
    • Place recommendations based on preferences
    • Day-wise itinerary builder with drag-and-drop
    • User reviews and shared trip plans

    Full MERN stack application.`,
    status: 'completed'
  }
];

export const skills: Skill[] = [
  {
    category: 'Languages',
    items: [
      { name: 'C++', level: 90, icon: '⚡' },
      { name: 'Python', level: 88, icon: '🐍' },
      { name: 'PHP', level: 85, icon: '🐘' },
      { name: 'JavaScript/TS', level: 88, icon: '📘' }
    ]
  },
  {
    category: 'Frontend',
    items: [
      { name: 'Vue.js', level: 90, icon: '💚' },
      { name: 'React', level: 85, icon: '⚛️' },
      { name: 'Tailwind CSS', level: 88, icon: '🌊' },
      { name: 'HTML/CSS/SCSS', level: 90, icon: '🎨' },
      { name: 'TypeScript', level: 85, icon: '📘' }
    ]
  },
  {
    category: 'Backend & DB',
    items: [
      { name: 'MySQL', level: 88, icon: '🗄️' },
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Express', level: 82, icon: '⚙️' },
      { name: 'MongoDB', level: 78, icon: '🍃' },
      { name: 'Redis', level: 72, icon: '🔴' }
    ]
  },
  {
    category: 'ML & Tools',
    items: [
      { name: 'Scikit-learn', level: 85, icon: '🤖' },
      { name: 'Pandas/NumPy', level: 88, icon: '📊' },
      { name: 'Docker', level: 80, icon: '🐳' },
      { name: 'Git/GitHub', level: 95, icon: '📝' },
      { name: 'Linux', level: 85, icon: '🐧' }
    ]
  }
];

export const asciiArt = {
  welcome: `
 ██████╗ ██╗████████╗███╗   ██╗ █████╗ ██╗   ██╗████████╗
██╔════╝ ██║╚══██╔══╝████╗  ██║██╔══██╗██║   ██║╚══██╔══╝
██║  ███╗██║   ██║   ██╔██╗ ██║███████║██║   ██║   ██║   
██║   ██║██║   ██║   ██║╚██╗██║██╔══██║██║   ██║   ██║   
╚██████╔╝██║   ██║   ██║ ╚████║██║  ██║╚██████╔╝   ██║   
 ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝    ╚═╝   
`,
  
  error404: ` 
███████╗██████╗ ██████╗  ██████╗ ██████╗ ██╗  ██╗ ██████╗ ██╗  ██╗
██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║  ██║██╔═████╗██║  ██║
█████╗  ██████╔╝██████╔╝██║   ██║██████╔╝███████║██║██╔██║███████║
██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗╚════██║████╔╝██║╚════██║
███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║     ██║╚██████╔╝     ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝     ╚═╝ ╚═════╝      ╚═╝
                                                                  

`,

  whois: `
██╗    ██╗██╗  ██╗ ██████╗  █████╗ ███╗   ███╗██╗
██║    ██║██║  ██║██╔═══██╗██╔══██╗████╗ ████║██║
██║ █╗ ██║███████║██║   ██║███████║██╔████╔██║██║
██║███╗██║██╔══██║██║   ██║██╔══██║██║╚██╔╝██║██║
╚███╔███╔╝██║  ██║╚██████╔╝██║  ██║██║ ╚═╝ ██║██║
 ╚══╝╚══╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝
`
};
