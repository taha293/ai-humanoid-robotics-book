# Data Model: Physical AI & Humanoid Robotics — Embodied Intelligence Book

**Feature**: 001-ai-humanoid-robotics-book
**Date**: 2025-12-09

## Entities

### Course Module
- **name**: string (required) - Module name (e.g., "The Robotic Nervous System")
- **description**: string (required) - Brief description of the module
- **weeks**: array of Week entities (required) - List of weeks in the module
- **learningObjectives**: array of strings - Learning objectives for the module
- **prerequisites**: array of strings - Prerequisites needed for this module
- **tags**: array of strings - Tags for categorization and search
- **order**: integer (required) - Order in which the module appears

### Week
- **name**: string (required) - Week name (e.g., "Week 3: ROS2 Architecture")
- **description**: string (required) - Brief description of the week's content
- **topics**: array of Topic entities (required) - List of topics in the week
- **learningObjectives**: array of strings - Learning objectives for the week
- **practicalExercises**: array of Exercise entities - Hands-on exercises for the week
- **duration**: string - Estimated time to complete (e.g., "4-6 hours")
- **order**: integer (required) - Order in which the week appears within the module
- **module**: Module entity (required) - Reference to the parent module

### Topic
- **title**: string (required) - Title of the topic
- **content**: string (required) - MDX content for the topic
- **learningObjectives**: array of strings - Learning objectives for the topic
- **diagrams**: array of Diagram entities - Diagrams associated with the topic
- **codeExamples**: array of CodeExample entities - Code examples in the topic
- **references**: array of strings - References and further reading
- **tags**: array of strings - Tags for categorization and search
- **order**: integer (required) - Order in which the topic appears within the week

### Exercise
- **title**: string (required) - Title of the exercise
- **description**: string (required) - Detailed description of the exercise
- **type**: string (required) - Type of exercise (simulation, hardware, theoretical)
- **difficulty**: string (required) - Difficulty level (beginner, intermediate, advanced)
- **estimatedTime**: string - Estimated time to complete the exercise
- **instructions**: string (required) - Step-by-step instructions in MDX format
- **requirements**: array of strings - Prerequisites for the exercise
- **expectedOutcome**: string - What the user should achieve
- **simulationEnvironment**: string - Required simulation environment (if applicable)

### Diagram
- **id**: string (required) - Unique identifier for the diagram
- **title**: string (required) - Title of the diagram
- **description**: string - Description of what the diagram illustrates
- **type**: string (required) - Type of diagram (Mermaid, image, etc.)
- **content**: string (required) - Diagram content (Mermaid code, image path, etc.)
- **altText**: string (required) - Alternative text for accessibility

### CodeExample
- **id**: string (required) - Unique identifier for the code example
- **title**: string - Title of the code example
- **language**: string (required) - Programming language
- **code**: string (required) - The actual code content
- **description**: string - Explanation of what the code does
- **usage**: string - How to use the code example
- **simulationEnvironment**: string - Required simulation environment (if applicable)

### HardwareSpec
- **id**: string (required) - Unique identifier for the hardware spec
- **name**: string (required) - Name of the hardware component
- **category**: string (required) - Category (processor, sensor, robot, etc.)
- **specifications**: object - Technical specifications
- **priceRange**: string - Price range for budget tiers
- **recommendedFor**: string - Which budget tier this is recommended for
- **compatibility**: array of strings - Compatible platforms and frameworks
- **purchaseLinks**: array of objects - Links to purchase the hardware

## Relationships

- Course Module contains multiple Weeks
- Week contains multiple Topics
- Week contains multiple Exercises
- Topic contains multiple Diagrams
- Topic contains multiple CodeExamples
- Exercise may reference multiple CodeExamples
- Exercise may require multiple HardwareSpecs

## Validation Rules

1. **Module Requirements**:
   - All modules must have a unique name
   - All modules must have at least one week
   - Module order must be sequential without gaps

2. **Week Requirements**:
   - All weeks must have a unique name within their module
   - All weeks must have at least one topic
   - Week order must be sequential within each module

3. **Topic Requirements**:
   - All topics must have a unique title within their week
   - Topic content must be in valid MDX format
   - Topic order must be sequential within each week

4. **Exercise Requirements**:
   - All exercises must have a valid difficulty level
   - Exercise types must be one of: simulation, hardware, theoretical
   - All exercises must have clear instructions

5. **Content Requirements**:
   - All MDX content must include proper frontmatter with title, description, and tags
   - All diagrams must have alt text for accessibility
   - All code examples must have a valid language specified

## State Transitions

Since this is a content-focused project, there are no complex state transitions. However, the content development process follows these phases:

1. **Draft**: Content is being created and reviewed internally
2. **Reviewed**: Content has been reviewed by subject matter experts
3. **Published**: Content is live in the deployed book
4. **Deprecated**: Content is outdated but maintained for historical reference