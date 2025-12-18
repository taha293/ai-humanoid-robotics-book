# Data Model: Qdrant Vector Upload for Docusaurus Book

## Entities

### Documentation Chunk
- **Description**: Represents a portion of documentation content with associated metadata
- **Fields**:
  - `id` (string): Unique identifier for the chunk in Qdrant (auto-generated or based on file path + index)
  - `vector` (list[float]): Embedding vector representation of the text content (384 dimensions for BGE-small model)
  - `content` (string): The actual text content of the chunk
  - `file_path` (string): Path to the original documentation file (e.g., "docs/intro.md")
  - `chunk_index` (int): Sequential index of this chunk within the original document
  - `start_index` (int): Character position in the original document where this chunk starts (optional)

### Qdrant Collection
- **Description**: Vector database collection that stores documentation chunks
- **Fields**:
  - `name` (string): Name of the collection (e.g., "docusaurus_docs")
  - `vector_size` (int): Dimension of the embedding vectors (384 for BGE-small model)
  - `distance_metric` (string): Distance metric for similarity search (COSINE)

### Document File
- **Description**: Represents a source documentation file
- **Fields**:
  - `path` (string): Full path to the file in the docs directory
  - `extension` (string): File extension (.md or .mdx)
  - `content` (string): Raw text content of the file before chunking

## Relationships

- One `Document File` can produce many `Documentation Chunk` entities through the text splitting process
- Many `Documentation Chunk` entities are stored in one `Qdrant Collection`

## Validation Rules

- Each `Documentation Chunk` must have a non-empty `content` field
- Each `Documentation Chunk` must have a valid `file_path` that corresponds to an actual source file
- Each `Documentation Chunk` must have a valid `vector` with the correct dimension (384)
- Each `Documentation Chunk` must have a non-negative `chunk_index`

## State Transitions

- `Document File` (raw) → processed by RecursiveCharacterTextSplitter → Multiple `Documentation Chunk` entities
- Multiple `Documentation Chunk` entities → processed by fastembed → with embedding vectors
- Multiple `Documentation Chunk` entities with vectors → uploaded to Qdrant → stored in `Qdrant Collection`