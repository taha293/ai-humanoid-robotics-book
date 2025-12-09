// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Preface',
      items: ['preface/introduction'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Weeks 1-2: Introduction to Physical AI',
      items: ['weeks/week-1-intro/overview'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Modules',
      items: [
        {
          type: 'category',
          label: 'Module 1: The Robotic Nervous System (ROS 2)',
          items: [
            'modules/module-1-ros/week-3',
            'modules/module-1-ros/week-4',
            'modules/module-1-ros/week-5'
          ],
          collapsed: false,
        },
        {
          type: 'category',
          label: 'Module 2: The Digital Twin (Gazebo & Unity)',
          items: [
            'modules/module-2-digital-twin/week-6',
            'modules/module-2-digital-twin/week-7'
          ],
          collapsed: false,
        },
        {
          type: 'category',
          label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
          items: [
            'modules/module-3-ai-brain/week-8',
            'modules/module-3-ai-brain/week-9',
            'modules/module-3-ai-brain/week-10'
          ],
          collapsed: false,
        },
        {
          type: 'category',
          label: 'Module 4: Vision-Language-Action (VLA)',
          items: ['modules/module-4-vla/week-13'],
          collapsed: false,
        },
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Weeks 11-12: Humanoid Robot Development',
      items: ['weeks/week-11-humanoid-dev/overview'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Appendix',
      items: ['appendix/hardware-specs'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Capstone Project',
      items: ['capstone/introduction'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'References',
      items: ['references/glossary', 'references/credits'],
      collapsed: true,
    },
  ],
};

module.exports = sidebars;