import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={clsx('text--center', animate ? 'fade-in-up' : '')}>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={clsx(styles.buttons, 'margin-vert--lg')}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/modules/module-1-ros/week-3">
              Start Learning 🤖
            </Link>
            <Link
              className="button button--outline button--lg"
              to="/docs/preface/introduction">
              Read Preface 📖
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function FeatureSection() {
  const features = [
    {
      title: 'Physical AI Fundamentals',
      description: 'Learn the foundational concepts of Physical AI and embodied intelligence, understanding how intelligence emerges from the interaction between an agent and its physical environment.',
      icon: '🧠',
      delay: 0.1
    },
    {
      title: 'Humanoid Robotics',
      description: 'Explore the design, control, and implementation of humanoid robotic systems, including kinematics, dynamics, locomotion, and manipulation.',
      icon: '🤖',
      delay: 0.2
    },
    {
      title: 'Practical Applications',
      description: 'Apply concepts through hands-on exercises with ROS2, Gazebo, Isaac Sim, and Unity, bridging the gap between simulation and real-world deployment.',
      icon: '🛠️',
      delay: 0.3
    }
  ];

  return (
    <section className={styles.features}>
      <div className="container padding-vert--xl">
        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col col--4">
              <div
                className={clsx('text--center padding-horiz--md interactive-card', 'fade-in-up')}
                style={{animationDelay: `${feature.delay}s`}}
              >
                <div className="margin-bottom--lg" style={{fontSize: '2.5rem'}}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleOverview() {
  const modules = [
    {
      title: 'Module 1: Robotic Nervous System',
      description: 'ROS2 architecture, nodes, topics, services, and robot description',
      weeks: 'Weeks 3-5',
      color: '#33925d',
      delay: 0.1
    },
    {
      title: 'Module 2: Digital Twin',
      description: 'Physics simulation, Gazebo, Unity, sensors, and environment modeling',
      weeks: 'Weeks 6-7',
      color: '#29784c',
      delay: 0.2
    },
    {
      title: 'Module 3: AI-Robot Brain',
      description: 'Perception, learning, control, and sim-to-real transfer techniques',
      weeks: 'Weeks 8-10',
      color: '#277148',
      delay: 0.3
    },
    {
      title: 'Module 4: Vision-Language-Action',
      description: 'Voice-to-action, LLM cognitive planning, and multimodal interaction',
      weeks: 'Week 13',
      color: '#205d3b',
      delay: 0.4
    }
  ];

  return (
    <section className={styles.modules}>
      <div className="container padding-vert--lg">
        <h2 className="text--center padding-bottom--lg">Course Modules</h2>
        <div className="row">
          {modules.map((module, index) => (
            <div key={index} className="col col--3">
              <div
                className={clsx('text--center padding-horiz--md interactive-card', 'fade-in-up')}
                style={{
                  animationDelay: `${module.delay}s`,
                  borderLeft: `4px solid ${module.color}`
                }}
              >
                <div style={{color: module.color, fontWeight: 'bold'}}>{module.weeks}</div>
                <h4 style={{color: module.color}}>{module.title}</h4>
                <p>{module.description}</p>
                <Link
                  className="button button--sm"
                  style={{backgroundColor: module.color, marginTop: '1rem'}}
                  to={`/docs/modules/module-${index + 1 === 1 ? '1-ros' : index + 1 === 2 ? '2-digital-twin' : index + 1 === 3 ? '3-ai-brain' : '4-vla'}/week-${index + 1 === 1 ? '3' : index + 1 === 2 ? '6' : index + 1 === 3 ? '8' : '13'}`}
                >
                  Explore Module
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeeksOverview() {
  const weeks = [
    { period: 'Weeks 1-2', title: 'Introduction', description: 'Foundations of Physical AI, sensors, and humanoid robotics overview' },
    { period: 'Weeks 3-5', title: 'ROS2 Fundamentals', description: 'Architecture, nodes, topics, services, Python packages, URDF' },
    { period: 'Weeks 6-7', title: 'Digital Twin', description: 'Physics simulation, URDF/SDF, sensors, Unity visualization' },
    { period: 'Weeks 8-10', title: 'AI-Robot Brain', description: 'Isaac Sim, AI perception, reinforcement learning, sim-to-real' },
    { period: 'Week 13', title: 'Vision-Language-Action', description: 'Voice-to-Action, LLM cognitive planning, multi-modal interaction' },
    { period: 'Weeks 11-12', title: 'Humanoid Dev', description: 'Kinematics, dynamics, locomotion, manipulation, HRI design' }
  ];

  return (
    <section className={clsx(styles.weeks)}>
      <div className="container padding-vert--lg">
        <h2 className="text--center padding-bottom--lg">Weekly Topics</h2>
        <div className="row">
          {weeks.map((week, index) => (
            <div key={index} className="col col--4">
              <div
                className={clsx('padding-horiz--md interactive-card', 'fade-in-up')}
                style={{animationDelay: `${0.1 * (index + 1)}s`}}
              >
                <h4 style={{color: '#2e8555', marginBottom: '0.5rem'}}>{week.period}: {week.title}</h4>
                <p>{week.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: '4', label: 'Modules' },
    { value: '13+', label: 'Weeks' },
    { value: '∞', label: 'Possibilities' },
    { value: '100%', label: 'Open Source' }
  ];

  return (
    <section className={styles.stats}>
      <div className="container">
        <div className="row text--center">
          {stats.map((stat, index) => (
            <div key={index} className="col col--3">
              <div className="padding-horiz--md">
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome - ${siteConfig.title}`}
      description="A comprehensive guide to Physical AI and Humanoid Robotics">
      <HomepageHeader />
      <main>
        <StatsSection />
        <FeatureSection />
        <ModuleOverview />
        <WeeksOverview />
      </main>
    </Layout>
  );
}