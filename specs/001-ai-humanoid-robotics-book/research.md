# Research: Physical AI & Humanoid Robotics — Embodied Intelligence Book

**Feature**: 001-ai-humanoid-robotics-book
**Date**: 2025-12-09

## Decisions Resolved

### Deployment Strategy: gh-pages branch vs /docs folder

**Decision**: Use gh-pages branch for deployment

**Rationale**: The gh-pages branch approach is the recommended method for Docusaurus projects and GitHub Pages. It keeps the built site separate from source content, allowing for cleaner repository management. The /docs folder approach is typically used when the built site needs to be part of the main branch, but for this project, the gh-pages branch provides better separation of concerns.

**Alternatives considered**:
- /docs folder in main branch: Simpler but mixes built content with source
- Custom domain deployment: More complex than needed for initial implementation

### Sidebar and Page Hierarchy Design

**Decision**: Implement nested sidebar structure following Module → Week → Topic hierarchy

**Rationale**: This structure directly matches the specification requirements and provides clear navigation for students. The nested structure will allow users to easily find content by module and week, following the pedagogical organization of the course.

**Alternatives considered**:
- Flat structure: Would not match the required Module → Week → Topic organization
- Topic-based grouping: Would not align with the course structure

### Simulation Engine Choice: Gazebo / Isaac / Unity

**Decision**: Support all three simulation engines with separate sections for each

**Rationale**: The specification requires content for all three simulation environments (Gazebo, NVIDIA Isaac, Unity). Rather than choosing one, the book will provide parallel content showing how to implement concepts in each environment. This maximizes the educational value and accommodates different user preferences and available resources.

**Alternatives considered**:
- Single simulation choice: Would limit the audience and educational scope
- Gazebo only: Most common but would exclude Isaac and Unity users
- Isaac only: More advanced but would exclude Gazebo and Unity users

### Hardware Lab Tier: Budget / Mini-Humanoid / Premium

**Decision**: Document all three hardware tiers with clear recommendations for each

**Rationale**: Different users have different budget constraints and learning objectives. By documenting all three tiers, the book can serve a broader audience while providing clear guidance for each budget level. This aligns with the specification's requirement to include hardware lab instructions.

**Alternatives considered**:
- Single tier: Would exclude users with different budgets
- Premium only: Would exclude budget-conscious students and educators

### ROS Distribution: Humble / Iron

**Decision**: Use ROS 2 Humble Hawksbill (LTS version)

**Rationale**: ROS 2 Humble Hawksbill is the Long-Term Support (LTS) version, providing stability and long-term support. This is most appropriate for educational content that needs to remain stable over time. It's also widely supported across simulation environments and hardware platforms.

**Alternatives considered**:
- ROS 2 Iron Irwini: Newer but shorter support cycle
- Rolling release: Cutting edge but unstable for educational content

## Technology Research

### Docusaurus Framework

- **Version**: Docusaurus v3+ is the current stable version with excellent MDX support
- **Features**: Built-in MDX support, plugin ecosystem, GitHub Pages integration, search functionality
- **Best practices**: Use modular content organization, leverage built-in components for diagrams and callouts
- **Documentation source**: Docusaurus documentation will be retrieved from Context7 MCP for reference and best practices

### MDX Content Structure

- **Frontmatter**: Required fields include title, description, and tags as specified in success criteria
- **Components**: Can include React components for diagrams, tables, and interactive elements
- **Syntax**: Standard Markdown with JSX components for advanced formatting

### GitHub Actions Deployment

- **Workflow**: Use the standard Docusaurus GitHub Actions workflow for building and deploying to gh-pages
- **Build process**: npm run build command with validation steps
- **Deployment**: Automatic deployment on main branch updates or releases

### Educational Content Best Practices

- **Structure**: Clear learning objectives, hands-on exercises, practical examples
- **Navigation**: Logical flow from basic to advanced concepts, cross-references between related topics
- **Assessment**: Practical exercises that reinforce theoretical concepts

## Implementation Considerations

### Content Organization

The content will be organized following the specification's Module → Week → Topic structure:
- Modules 1-4 as main sections
- Weekly topics within each module
- Practical exercises and lab instructions integrated throughout
- Hardware appendix with specific recommendations

### Quality Assurance Process

- Build validation: npm run build must pass without errors
- Link checking: All internal and external links must be valid
- Markdown linting: Consistent formatting and style
- Visual QA: Diagrams and tables render correctly across devices

### Accessibility Requirements

- Responsive design for different screen sizes
- Semantic HTML structure for screen readers
- Clear navigation hierarchy
- Proper alt text for diagrams and images