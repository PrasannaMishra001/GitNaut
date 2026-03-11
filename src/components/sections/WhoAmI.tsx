import React from 'react';
import { Code, Coffee, Music, TowerControl as GameController2, Book, Zap } from 'lucide-react';
import { asciiArt } from '../../data/gitnautData';

export const WhoAmI: React.FC = () => {
  return (
    <div className="whoami-section">
      <div className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <pre className="text-terminal-accent text-xs mb-4 overflow-x-auto">
              {asciiArt.whois}
            </pre>
            <h2 className="text-terminal-accent text-xl font-bold mb-2">👨‍💻 About Me</h2>
          </div>
          <div className="flex justify-start md:justify-end">
            <img
              src="/prasanna.jpeg"
              alt="Prasanna Mishra profile"
              className="h-24 w-24 rounded-full border-2 border-terminal-accent object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-terminal-hover p-6 rounded-lg border border-terminal-border">
            <h3 className="text-terminal-accent font-bold text-lg mb-3">$ whoami</h3>
            <div className="space-y-4 text-terminal-text">
              <p>
                Hi there! I'm Prasanna Mishra (<span className="text-terminal-accent">PrasannaMishra001</span>), 
                a B.Tech CSE student at <span className="text-terminal-accent">ABV-IIITM Gwalior</span> (CGPA 8.87).
              </p>
              <p>
                Open-source contributor to <span className="text-terminal-accent">omegaUp</span> with 
                <span className="text-terminal-success"> 21 merged PRs</span> spanning Vue.js, PHP, MySQL, TypeScript, Docker & CI/CD.
              </p>
              <p>
                Research Intern under <span className="text-terminal-accent">Dr. Roshni Chakraborty</span> — building ML pipelines 
                for event extraction from StockTwits posts using NLP and time-series analysis.
              </p>
              <p>
                📫 Reach me at <span className="text-terminal-success">prasanna.iiitm@gmail.com</span> | 
                📞 <span className="text-terminal-success">+91-7991305498</span>
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
              <h4 className="text-terminal-accent font-bold mb-2 flex items-center">
                <Zap size={16} className="mr-2" />
                Currently Working On
              </h4>
              <ul className="text-terminal-text text-sm space-y-1">
                <li>• omegaUp open-source contributions (Vue, PHP, MySQL)</li>
                <li>• StockTwits ML event extraction research</li>
                <li>• Competitive programming (LeetCode Knight 1858)</li>
              </ul>
            </div>

            <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
              <h4 className="text-terminal-accent font-bold mb-2 flex items-center">
                <Zap size={16} className="mr-2" />
                Focus Areas
              </h4>
              <ul className="text-terminal-text text-sm space-y-1">
                <li>• Problem solving & algorithmic thinking</li>
                <li>• Backend systems & API development</li>
                <li>• Applied ML & NLP pipelines</li>
                <li>• Open-source collaboration</li>
              </ul>
            </div>
            
            <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
              <h4 className="text-terminal-accent font-bold mb-2 flex items-center">
                <Code size={16} className="mr-2" />
                Tech Stack
              </h4>
              <ul className="text-terminal-text text-sm space-y-1">
                <li>• Frontend: Vue.js, React, TypeScript, Tailwind CSS</li>
                <li>• Backend & DB: PHP, MySQL, Node.js, Express</li>
                <li>• ML / DS: Python, Scikit-learn, Pandas, NumPy</li>
                <li>• Infra: Docker, Redis, Linux, Git, CI/CD</li>
              </ul>
            </div>

            <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
              <h4 className="text-terminal-accent font-bold mb-2 flex items-center">
                <Zap size={16} className="mr-2" />
                Achievements
              </h4>
              <ul className="text-terminal-text text-sm space-y-1">
                <li>• GATE 2026 Qualified — CS & IT</li>
                <li>• Knight on LeetCode (max rating 1858)</li>
                <li>• National Science Congress Winner</li>
                <li>• JEE Mains Qualified 2022</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Side Info */}
        <div className="space-y-6">
          <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
            <h4 className="text-terminal-accent font-bold mb-3">$ ls ~/links</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Coffee className="text-terminal-accent" size={16} />
                <span className="text-terminal-text text-sm">GitHub: github.com/PrasannaMishra001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Music className="text-terminal-accent" size={16} />
                <span className="text-terminal-text text-sm">LeetCode: leetcode.com/u/Prasanna_Mishra</span>
              </div>
              <div className="flex items-center space-x-2">
                <GameController2 className="text-terminal-accent" size={16} />
                <span className="text-terminal-text text-sm">Codeforces: codeforces.com/profile/prasanna_mishra</span>
              </div>
              <div className="flex items-center space-x-2">
                <Book className="text-terminal-accent" size={16} />
                <span className="text-terminal-text text-sm">Kaggle: kaggle.com/prasannamishra</span>
              </div>
              <div className="flex items-center space-x-2">
                <Book className="text-terminal-accent" size={16} />
                <span className="text-terminal-text text-sm">Portfolio: git-naut.vercel.app</span>
              </div>
              <div className="flex items-center space-x-2">
                <Book className="text-terminal-accent" size={16} />
                <span className="text-terminal-text text-sm">X: x.com/mishra_discover</span>
              </div>
            </div>
          </div>

          <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
            <h4 className="text-terminal-accent font-bold mb-3">$ cat ~/status.txt</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-terminal-muted">Status:</span>
                <span className="text-terminal-success">Available for collaboration</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">College:</span>
                <span className="text-terminal-text">ABV-IIITM Gwalior</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">CGPA:</span>
                <span className="text-terminal-accent">8.87 / 10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Location:</span>
                <span className="text-terminal-text">India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Timezone:</span>
                <span className="text-terminal-text">IST (UTC+5:30)</span>
              </div>
            </div>
          </div>

          <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
            <h4 className="text-terminal-accent font-bold mb-3">$ uptime</h4>
            <div className="text-terminal-text text-sm">
              <div>Contributor: <span className="text-terminal-accent">omegaUp (21 merged PRs)</span></div>
              <div>Research: <span className="text-terminal-accent">StockTwits ML · Dr. Chakraborty</span></div>
              <div>Focus: <span className="text-terminal-accent">Backend + Applied ML</span></div>
              <div>Drive: <span className="text-terminal-accent">High-impact open-source</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-terminal-hover rounded border-l-4 border-terminal-accent">
        <p className="text-terminal-muted text-sm">
          💡 <span className="text-terminal-accent">Fun fact:</span> I built this entire terminal interface 
          because I believe experiences should be as unique as the developers who create them. 
          Every command you see here was crafted with attention to detail and a love for great UX.
        </p>
      </div>
    </div>
  );
};