# Physical AI & Humanoid Robotics — Embodied Intelligence Book

[![Deploy to GitHub Pages](https://github.com/your-username/ai-humanoid-robotics-book/actions/workflows/publish.yml/badge.svg)](https://github.com/your-username/ai-humanoid-robotics-book/actions/workflows/publish.yml)

A comprehensive Docusaurus-based educational book teaching Physical AI, Humanoid Robotics, and Embodied Intelligence. This book is designed for graduate students, AI/Robotics enthusiasts, and technical educators.

## Table of Contents

- [Overview](#overview)
- [Modules](#modules)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Simulation Environments](#simulation-environments)
- [Hardware Recommendations](#hardware-recommendations)
- [Contributing](#contributing)
- [License](#license)

## Overview

This educational book provides a comprehensive guide to Physical AI and Humanoid Robotics, organized into four main modules:

1. **The Robotic Nervous System (ROS 2)** - Core communication and control systems
2. **The Digital Twin (Gazebo & Unity)** - Physics simulation and virtual environments
3. **The AI-Robot Brain (NVIDIA Isaac)** - AI perception, learning, and control
4. **Vision-Language-Action (VLA)** - Multimodal interaction and cognitive planning

Each module includes theoretical foundations, practical exercises, and hands-on projects to reinforce learning concepts.

## Modules

### Module 1: The Robotic Nervous System (ROS 2)
- Weeks 3-5: ROS2 architecture, nodes, topics, services, Python packages, URDF
- Learn the fundamentals of Robot Operating System 2
- Understand communication patterns and robot description formats

### Module 2: The Digital Twin (Gazebo & Unity)
- Weeks 6-7: Physics simulation, URDF/SDF, sensors, Unity visualization
- Master simulation environments for robot development
- Learn sensor modeling and environment creation

### Module 3: The AI-Robot Brain (NVIDIA Isaac)
- Weeks 8-10: Isaac Sim, AI perception, reinforcement learning, sim-to-real
- Implement AI techniques for perception and control
- Understand sim-to-real transfer challenges

### Module 4: Vision-Language-Action (VLA)
- Week 13: Voice-to-Action, LLM cognitive planning, multi-modal interaction
- Integrate vision, language, and action for advanced interaction
- Learn multimodal AI systems

### Additional Content
- Weeks 1-2: Introduction to Physical AI, foundations, sensors, humanoid robotics overview
- Weeks 11-12: Humanoid Robot Development, kinematics, dynamics, locomotion, manipulation, HRI design

## Prerequisites

### Software Requirements
- **Node.js**: Version 18 or higher
- **npm** or **yarn**: Package manager
- **Git**: Version control system
- **Python**: For ROS2 and simulation tools (if using real robots)

### Recommended Hardware
The course includes recommendations for different budget tiers:

#### Budget Tier
- Computer with 8GB+ RAM
- Single-board computers (Raspberry Pi, NVIDIA Jetson Nano)
- Basic sensors and actuators

#### Mini-Humanoid Tier
- More powerful computer for simulation
- Specialized humanoid robot kits
- Advanced sensors (RealSense, LIDAR)

#### Premium Tier
- High-performance computing workstation
- Full humanoid robots (Unitree, Boston Dynamics platforms)
- Professional-grade sensors and computing platforms

See [Hardware Specifications](./docs/appendix/hardware-specs.md) for detailed recommendations.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ai-humanoid-robotics-book.git
cd ai-humanoid-robotics-book
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

This will start the development server and open the book in your browser at `http://localhost:3000`.

## Usage

### Local Development
- Edit content in the `docs/` directory
- Site configuration is in `docusaurus.config.js`
- Navigation structure is in `sidebars.js`

### Building the Site
To build the static site for deployment:
```bash
npm run build
```

The built site will be in the `build/` directory and can be served using any static hosting service.

### Running Quality Checks
Validate the build:
```bash
npm run build
```

Run markdown linting:
```bash
npx markdownlint-cli docs/
```

Check for broken links:
```bash
npx markdown-link-check "**/*.md" "**/*.mdx"
```

## Simulation Environments

The course covers multiple simulation environments:

### Gazebo
- Physics simulation with realistic dynamics
- Sensor modeling and environment creation
- ROS2 integration for robot development

### NVIDIA Isaac Sim
- High-fidelity graphics with RTX rendering
- Synthetic data generation for AI training
- PhysX physics engine integration

### Unity Robotics
- Visualization and human-robot interaction
- Cross-platform deployment capabilities
- VR/AR support for immersive experiences

## Hardware Lab Setup

The book includes hardware lab instructions for different budget tiers:

### Budget Tier
- Single-board computers (e.g., Raspberry Pi)
- Basic sensors and actuators
- Simple robotic platforms

### Mini-Humanoid Tier
- Specialized humanoid robot kits
- Advanced sensors (cameras, LIDAR)
- More sophisticated control systems

### Premium Tier
- Full humanoid robots (e.g., Unitree, Boston Dynamics research platforms)
- Professional-grade sensors and computing platforms

## Contributing

We welcome contributions to improve this educational resource!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your contributions align with the course's pedagogical goals and maintain high educational standards.

## License

This educational resource is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) - see the [LICENSE](LICENSE) file for details.

## Support

For questions, issues, or support:
- **Issues**: Use the GitHub Issues section for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and community interaction
- **Email**: [your-email@example.com] for direct inquiries

## Acknowledgments

This course builds upon the work of many researchers, educators, and open-source contributors in the field of robotics and AI. Special thanks to:
- The ROS/ROS2 development community
- Simulation environment developers (Gazebo, Isaac Sim, Unity)
- Hardware platform manufacturers
- The open-source robotics community

## Citation

If you use this educational resource in your work, please cite it as:

```
[Author/Organization Name]. (Year). Physical AI & Humanoid Robotics — Embodied Intelligence Book. Retrieved from https://github.com/your-username/ai-humanoid-robotics-book
```

---

**Note**: This book is continuously updated to reflect the latest developments in Physical AI and Humanoid Robotics. Check back regularly for new content and updates.