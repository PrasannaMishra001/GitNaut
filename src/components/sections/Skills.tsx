import React, { useEffect } from 'react';
import { skills } from '../../data/gitnautData';

export const Skills: React.FC = () => {
  useEffect(() => {
    const bars = document.querySelectorAll<HTMLElement>('[data-skill-level]');
    bars.forEach((bar) => {
      const level = Number(bar.dataset.skillLevel || 0);
      const delay = Number(bar.dataset.skillDelay || 0);
      bar.style.setProperty('--final-width', `${level}%`);
      bar.style.setProperty('--skill-delay', `${delay}s`);
    });
  }, []);

  const getSkillBarColor = (level: number) => {
    if (level >= 90) return 'bg-blue-500';
    if (level >= 80) return 'bg-sky-500';
    if (level >= 70) return 'bg-cyan-500';
    return 'bg-blue-700';
  };

  const getSkillLevel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    if (level >= 60) return 'Beginner';
    return 'Learning';
  };

  return (
    <div className="skills-section">
      <div className="mb-6">
        <h2 className="text-terminal-accent text-xl font-bold mb-2">⚡ Skills Matrix</h2>
        <p className="text-terminal-muted">
          My technical proficiency across different domains and technologies.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {skills.map((category, categoryIndex) => (
          <div key={categoryIndex} className="skill-category">
            <h3 className="text-terminal-accent font-bold text-lg mb-4 flex items-center">
              <span className="mr-2">
                {category.category === 'Languages' && '⚡'}
                {category.category === 'Frontend' && '🎨'}
                {category.category === 'Backend & DB' && '⚙️'}
                {category.category === 'ML & Tools' && '🛠️'}
              </span>
              {category.category}
            </h3>
            
            <div className="space-y-4">
              {category.items.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill-item">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="text-terminal-text font-medium">{skill.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-terminal-muted text-sm">{getSkillLevel(skill.level)}</span>
                      <span className="text-terminal-accent text-sm font-mono">{skill.level}%</span>
                    </div>
                  </div>
                  
                  <div className="skill-bar bg-terminal-border rounded-full h-2 overflow-hidden">
                    <div
                      data-skill-level={skill.level}
                      data-skill-delay={skillIndex * 0.1}
                      className={`skill-progress h-full transition-all duration-1000 ease-out ${getSkillBarColor(skill.level)}`}
                    />
                  </div>
                  
                  <div className="mt-1 flex justify-between text-xs text-terminal-muted">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="stat-card bg-terminal-hover p-4 rounded border border-terminal-border">
          <div className="text-2xl font-bold text-terminal-accent">20+</div>
          <div className="text-terminal-muted text-sm">Technologies</div>
        </div>
        <div className="stat-card bg-terminal-hover p-4 rounded border border-terminal-border">
          <div className="text-2xl font-bold text-terminal-accent">21</div>
          <div className="text-terminal-muted text-sm">Merged PRs (omegaUp)</div>
        </div>
        <div className="stat-card bg-terminal-hover p-4 rounded border border-terminal-border">
          <div className="text-2xl font-bold text-terminal-accent">6+</div>
          <div className="text-terminal-muted text-sm">Projects Built</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-terminal-hover rounded border-l-4 border-terminal-accent">
        <p className="text-terminal-muted text-sm">
          📊 <span className="text-terminal-accent">Legend:</span> 
          <span className="text-blue-500 ml-2">■ Expert (90%+)</span>
          <span className="text-sky-500 ml-2">■ Advanced (80%+)</span>
          <span className="text-cyan-500 ml-2">■ Intermediate (70%+)</span>
          <span className="text-blue-700 ml-2">■ Beginner (60%+)</span>
        </p>
      </div>
    </div>
  );
};