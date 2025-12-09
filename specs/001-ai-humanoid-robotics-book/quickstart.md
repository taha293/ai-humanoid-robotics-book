# Quickstart Guide: Physical AI & Humanoid Robotics Book

**Feature**: 001-ai-humanoid-robotics-book
**Date**: 2025-12-09

## Getting Started

This guide will help you set up, build, and deploy the Physical AI & Humanoid Robotics educational book.

### Prerequisites

- Node.js v18+ installed
- npm or yarn package manager
- Git for version control
- GitHub account for deployment (if using GitHub Pages)
- Access to Context7 MCP server for Docusaurus documentation and best practices

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Local Development

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Open your browser to:**
   ```
   http://localhost:3000
   ```

3. **Edit content:**
   - MDX files are located in the `docs/` directory
   - Site configuration is in `docusaurus.config.js`
   - Navigation structure is in `sidebars.js`

### Building the Site

1. **Build the static site:**
   ```bash
   npm run build
   ```

2. **The built site will be in the `build/` directory**

3. **Test the built site locally:**
   ```bash
   npm run serve
   ```

### Deployment

1. **The site is configured for GitHub Pages deployment**
2. **Push changes to the main branch to trigger GitHub Actions**
3. **The workflow in `.github/workflows/publish.yml` will build and deploy automatically**

### Content Structure

The book content follows this structure:

```
docs/
├── preface/              # Preface and overview content
├── modules/              # Main course modules
│   ├── module-1-ros/     # Module 1: The Robotic Nervous System (ROS 2) - Weeks 3-5
│   ├── module-2-digital-twin/  # Module 2: The Digital Twin (Gazebo & Unity) - Weeks 6-7
│   ├── module-3-ai-brain/      # Module 3: The AI-Robot Brain (NVIDIA Isaac) - Weeks 8-10
│   └── module-4-vla/           # Module 4: Vision-Language-Action (VLA) - Week 13
├── weeks/                # Standalone weekly content
│   ├── week-1-intro/     # Weeks 1-2: Introduction to Physical AI
│   └── week-11-humanoid-dev/  # Weeks 11-12: Humanoid Robot Development
├── appendix/             # Hardware specs and additional resources
├── capstone/             # Capstone project content
└── references/           # References and credits
```

Each module folder contains MDX files for the topics within that module's week range. For example:
- `module-1-ros/` contains topics for Weeks 3-5
- `module-2-digital-twin/` contains topics for Weeks 6-7
- And so on.

### Adding New Content

1. **Create new MDX files in the appropriate directory**
2. **Include proper frontmatter:**
   ```md
   ---
   title: Your Content Title
   description: Brief description of the content
   tags: [tag1, tag2, tag3]
   ---
   ```

3. **Add the new content to `sidebars.js` to make it navigable**

### Running Quality Checks

1. **Validate the build:**
   ```bash
   npm run build
   ```

2. **Run markdown linting:**
   ```bash
   # If using markdownlint
   npx markdownlint-cli docs/
   ```

3. **Check for broken links:**
   ```bash
   # If using a link checker
   npx markdown-link-check "**/*.md" "**/*.mdx"
   ```

### Simulation Environment Setup

For practical exercises requiring simulation environments:

1. **ROS 2 Humble Hawksbill Setup:**
   - Follow the official ROS 2 Humble installation guide
   - Install required packages: `ros-humble-desktop`, `ros-humble-ros-base`

2. **Gazebo Setup:**
   - Install Gazebo Garden or Fortress
   - Verify installation with `gz sim --version`

3. **NVIDIA Isaac Sim Setup:**
   - Download and install Isaac Sim from NVIDIA Developer website
   - Configure with your development environment

4. **Unity Setup:**
   - Install Unity Hub and Unity 2022.3 LTS or newer
   - Import required robotics packages

### Hardware Lab Setup

The book includes hardware lab instructions for different budget tiers:

1. **Budget Tier:**
   - Single-board computers (e.g., Raspberry Pi)
   - Basic sensors and actuators
   - Simple robotic platforms

2. **Mini-Humanoid Tier:**
   - Specialized humanoid robot kits
   - Advanced sensors (cameras, LIDAR)
   - More sophisticated control systems

3. **Premium Tier:**
   - Full humanoid robots (e.g., Unitree, Boston Dynamics research platforms)
   - Professional-grade sensors and computing platforms

### Troubleshooting

- **Build fails**: Check that all MDX files have proper frontmatter and valid syntax
- **Links broken**: Verify all internal links use proper relative paths
- **Images not showing**: Ensure images are in the `static/img/` directory and referenced correctly
- **GitHub Pages not deploying**: Check that the workflow file has correct permissions and configuration