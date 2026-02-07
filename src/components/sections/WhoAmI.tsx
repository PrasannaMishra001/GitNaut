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
              src="/profile-pic.jpg"
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
                a developer focused on <span className="text-terminal-accent">problem solving</span>, 
                <span className="text-terminal-accent">backend-heavy systems</span>, and 
                <span className="text-terminal-accent">applied ML</span>.
              </p>
              <p>
                I'm a contributor to <span className="text-terminal-accent">omegaup</span> and actively learning 
                <span className="text-terminal-accent">Machine Learning & Deep Learning</span> with practical applications.
              </p>
              <p>
                📫 Reach me at <span className="text-terminal-success">prasanna.iiitm@gmail.com</span>.
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
                <li>• Text analysis & event extraction pipelines</li>
                <li>• ML-driven insights from stock-social data</li>
              </ul>
            </div>

            <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
              <h4 className="text-terminal-accent font-bold mb-2 flex items-center">
                <Zap size={16} className="mr-2" />
                Focus Areas
              </h4>
              <ul className="text-terminal-text text-sm space-y-1">
                <li>• Problem solving & algorithmic thinking</li>
                <li>• Backend-first systems & APIs</li>
                <li>• Applied ML & data pipelines</li>
                <li>• Open-source collaboration</li>
              </ul>
            </div>
            
            <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
              <h4 className="text-terminal-accent font-bold mb-2 flex items-center">
                <Code size={16} className="mr-2" />
                Tech Stack
              </h4>
              <ul className="text-terminal-text text-sm space-y-1">
                <li>• Frontend: Vue, TypeScript, HTML, CSS/SCSS</li>
                <li>• Backend & DB: PHP, MySQL</li>
                <li>• Problem Solving / ML: C++, Python, Java</li>
                <li>• Infra: Docker, Redis, Linux, Git</li>
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
                <span className="text-terminal-text text-sm">Medium: medium.com/@mishra.prasanna838</span>
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
                <span className="text-terminal-muted">Location:</span>
                <span className="text-terminal-text">India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Timezone:</span>
                <span className="text-terminal-text">IST (UTC+5:30)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Coffee Level:</span>
                <span className="text-terminal-accent">███████░░░ 70%</span>
              </div>
            </div>
          </div>

          <div className="bg-terminal-hover p-4 rounded-lg border border-terminal-border">
            <h4 className="text-terminal-accent font-bold mb-3">$ uptime</h4>
            <div className="text-terminal-text text-sm">
              <div>Contributor: <span className="text-terminal-accent">omegaup</span></div>
              <div>Focus: <span className="text-terminal-accent">Backend + Applied ML</span></div>
              <div>Now: <span className="text-terminal-accent">Learning Deep Learning</span></div>
              <div>Drive: <span className="text-terminal-accent">High-impact systems</span></div>
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