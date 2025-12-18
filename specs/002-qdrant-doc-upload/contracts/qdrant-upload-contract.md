# Contract: Docusaurus to Qdrant Upload Process

## Purpose
Defines the interface and behavior of the qdrantpush.py script that uploads Docusaurus documentation to Qdrant vector database.

## Inputs
- **Source Directory**: Path to Docusaurus docs directory (default: `./docs`)
- **Environment Variables**:
  - `QDRANT_URL`: URL of the Qdrant instance
  - `QDRANT_API_KEY`: API key for Qdrant authentication
- **File Types**: `.md` and `.mdx` files only

## Processing Parameters
- **Chunk Size**: 1000 characters
- **Chunk Overlap**: 200 characters
- **Embedding Model**: BAAI/bge-small-en-v1.5 (384 dimensions)
- **Collection Name**: "docusaurus_docs"

## Processing Steps
1. Recursively scan source directory for `.md` and `.mdx` files
2. Read content of each file
3. Split content using RecursiveCharacterTextSplitter with specified parameters
4. Generate embeddings using fastembed
5. Upload chunks to Qdrant with metadata

## Outputs
- **Console Output**: Progress messages and final statistics
- **Qdrant Collection**: "docusaurus_docs" with vector embeddings
- **Metadata**: Each vector includes `file_path` and `chunk_index`

## Success Criteria
- All eligible files are processed without error
- Vectors are successfully stored in Qdrant
- Each vector has proper metadata attached
- Console shows completion message with statistics

## Error Handling
- Invalid file formats are skipped with warning
- Network errors during Qdrant upload cause script termination
- Missing environment variables cause script termination with error message

## Performance Expectations
- Process 100 average-sized documentation files in under 10 minutes
- Memory usage remains reasonable for large documentation sets