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
    id: 'gitnaut',
    name: 'GitNaut',
    description: 'Terminal-style GitHub intelligence and contributor analytics',
    technologies: ['React', 'TypeScript', 'Node.js', 'GitHub API', 'Vite'],
    github: 'https://github.com/PrasannaMishra001/gitnaut',
    demo: 'https://gitnaut.vercel.app',
    image: 'https://images.pexels.com/photos/11035545/pexels-photo-11035545.jpeg',
    details: `GitNaut is a terminal-first GitHub analytics cockpit that helps you
    explore repositories, contributors, pull requests, issues, and code files.

    • Repository intelligence and quick stats
    • Contributor leaderboards and recent activity
    • PR and issue summaries with recent items
    • Language breakdowns and file size explorer
    • File preview, copy, and download helpers

    Built to support GSoC-style discovery and open-source research.`,
    status: 'in-progress'
  },
  {
    id: 'gitnaut-terminal-ui',
    name: 'GitNaut Terminal UI',
    description: 'Interactive terminal-themed GitNaut experience',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    github: 'https://github.com/PrasannaMishra001/gitnaut',
    demo: 'https://gitnaut.vercel.app',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    details: `A fully interactive terminal-themed GitNaut experience featuring:
    
    • Real-time command processing
    • Multiple theme support (Matrix, Amber, Blue, White)
    • Responsive design with mobile support
    • Accessibility features and screen reader compatibility
    • Sound effects and animations
    • Command history and man pages
    • Virtual keyboard for mobile devices
    
    Built with React, TypeScript, and modern web technologies.`,
    status: 'completed'
  },
  {
    id: 'rusty-rain',
    name: 'Rusty Rain',
    description: 'Fast, cross-platform terminal rain effect built in Rust',
    technologies: ['Rust', 'CLI', 'Terminal UI'],
    github: 'https://github.com/cowboy8625/rusty-rain',
    demo: 'https://crates.io/crates/rusty-rain',
    image: 'https://images.pexels.com/photos/459301/pexels-photo-459301.jpeg',
    details: `Rusty Rain is a Matrix-style terminal rain effect with deep customization.

    • Character groups, colors, speed, and direction controls
    • Works on macOS, Linux, and Windows
    • Install via Cargo, Docker, Winget, or script
    • Metadata: crates.io, last updated, repo size, issues, lines of code, license, Discord chat

    Quick install:
    - cargo install rusty-rain
    - cargo install --git https://github.com/cowboy8625/rusty-rain.git

    Examples:
    - rusty-rain -C 0,139,139 -H 255,255,255 -g jap -s -d left
    - rusty-rain -g emojis -C red -H yellow -S 0,50
    - rusty-rain -g large-letters -C blue -H white -d up`,
    status: 'completed'
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot Platform',
    description: 'Intelligent conversational AI with natural language processing',
    technologies: ['Python', 'FastAPI', 'React', 'OpenAI API', 'PostgreSQL'],
    github: 'https://github.com/PrasannaMishra001/ai-chatbot',
    demo: 'https://chatbot-demo.dev',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    details: `Advanced AI chatbot platform with features:
    
    • Natural language understanding
    • Context-aware conversations
    • Multi-language support
    • Analytics dashboard
    • Custom training capabilities
    • REST API for integration
    
    Handles 10k+ conversations daily with 95% accuracy.`,
    status: 'completed'
  },
  {
    id: 'data-viz-dashboard',
    name: 'Data Visualization Dashboard',
    description: 'Real-time analytics dashboard with interactive charts',
    technologies: ['Vue.js', 'D3.js', 'Node.js', 'WebSocket', 'MongoDB'],
    github: 'https://github.com/PrasannaMishra001/data-dashboard',
    demo: 'https://dashboard-demo.dev',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
    details: `Comprehensive analytics dashboard featuring:
    
    • Real-time data streaming
    • Interactive charts and graphs
    • Custom report generation
    • Data export capabilities
    • Role-based access control
    • Mobile-responsive design
    
    Processes millions of data points with sub-second response times.`,
    status: 'completed'
  },
  {
    id: 'blockchain-wallet',
    name: 'Crypto Wallet App',
    description: 'Secure cryptocurrency wallet with multi-chain support',
    technologies: ['React Native', 'Web3.js', 'Solidity', 'Redux', 'SQLite'],
    github: 'https://github.com/PrasannaMishra001/crypto-wallet',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg',
    details: `Secure cryptocurrency wallet application:
    
    • Multi-chain support (Bitcoin, Ethereum, BSC)
    • Hardware wallet integration
    • DeFi protocol interactions
    • Asset tracking
    • Security audited smart contracts
    • Biometric authentication
    
    Manages $1M+ in digital assets securely.`,
    status: 'in-progress'
  }
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 95, icon: '⚛️' },
      { name: 'TypeScript', level: 90, icon: '📘' },
      { name: 'Vue.js', level: 85, icon: '💚' },
      { name: 'CSS/SCSS', level: 88, icon: '🎨' },
      { name: 'Tailwind CSS', level: 92, icon: '🌊' }
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 88, icon: '🟢' },
      { name: 'Python', level: 85, icon: '🐍' },
      { name: 'PostgreSQL', level: 82, icon: '🐘' },
      { name: 'MongoDB', level: 80, icon: '🍃' },
      { name: 'Redis', level: 75, icon: '🔴' }
    ]
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Docker', level: 85, icon: '🐳' },
      { name: 'Kubernetes', level: 78, icon: '⚙️' },
      { name: 'AWS', level: 82, icon: '☁️' },
      { name: 'GitHub Actions', level: 88, icon: '🔄' },
      { name: 'Terraform', level: 72, icon: '🏗️' }
    ]
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', level: 95, icon: '📝' },
      { name: 'VS Code', level: 98, icon: '💻' },
      { name: 'Figma', level: 75, icon: '🎯' },
      { name: 'Jest', level: 85, icon: '🧪' },
      { name: 'Webpack', level: 80, icon: '📦' }
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
