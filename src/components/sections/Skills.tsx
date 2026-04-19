'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, CreditCard, Cpu, Globe } from 'lucide-react';

const skillGroups = [
  {
    title: 'Frontend Engineering',
    icon: <Layout size={24} />,
    skills: [
      'React & Next.js',
      'TypeScript',
      'Responsive UI Systems',
      'Framer Motion',
      'Accessibility (ARIA)'
    ],
    level: 'Core Depth'
  },
  {
    title: 'Backend Systems',
    icon: <Server size={24} />,
    skills: [
      'Node.js / Express',
      'REST & GraphQL APIs',
      'PostgreSQL / MongoDB',
      'Redis Caching',
      'Scalable Monitoring'
    ],
    level: 'Core Depth'
  },
  {
    title: 'Payment Solutions',
    icon: <CreditCard size={24} />,
    skills: [
      'Paystack Integration',
      'Verification Webhooks',
      'Automated Payouts',
      'Transaction Security',
      'Currency Handling'
    ],
    level: 'Specialization'
  },
  {
    title: 'System Architecture',
    icon: <Cpu size={24} />,
    skills: [
      'Real-time (WebSockets)',
      'Auth (JWT, OAuth)',
      'Admin Dashboards',
      'Microservices',
      'Cloud Infrastructure'
    ],
    level: 'Specialization'
  },
  {
    title: 'Geophysics & Data',
    icon: <Globe size={24} />,
    skills: [
      'Seismic Data Processing',
      'GIS & Spatial Mapping',
      'Python Data Analysis',
      'Scientific Computing',
      'Numerical Modeling'
    ],
    level: 'Niche Expertise'
  }
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="section-spacing glass" style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <h2 style={{ marginBottom: '1.5rem' }}>
            Stack <span className="text-gradient">&amp; expertise</span>
          </h2>
          <p style={{ margin: '0 auto', color: 'var(--fg-secondary)' }}>
            Tools and domains we lean on when shipping—from product UI to payments and data.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              className="skill-group"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group-header">
                <div className="icon-box">{group.icon}</div>
                <div>
                  <h3>{group.title}</h3>
                  <span className="level-badge">{group.level}</span>
                </div>
              </div>
              
              <ul className="skill-list">
                {group.skills.map(skill => (
                  <li key={skill}>
                    <div className="bullet" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }

        .skill-group {
          padding: 1.5rem;
          border-radius: 16px;
          transition: background 0.3s ease;
        }

        .skill-group:hover {
          background: hsla(240, 10%, 50%, 0.05);
        }

        .group-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .icon-box {
          color: var(--brand-primary);
          padding: 0.75rem;
          border-radius: 12px;
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
        }

        .level-badge {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--brand-secondary);
          margin-top: 0.25rem;
        }

        .skill-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .skill-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--fg-secondary);
          font-size: 1rem;
          font-weight: 500;
        }

        .bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--brand-primary);
          box-shadow: 0 0 10px var(--brand-primary);
        }

        @media (max-width: 768px) {
          .skills-grid {
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
};
