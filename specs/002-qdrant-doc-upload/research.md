# Research: Qdrant Vector Upload Implementation

## Qdrant Client Research

### Key Findings:
- Qdrant Python client provides both synchronous and asynchronous APIs
- Collection creation requires specifying vector size and distance metric
- Upsert operation adds or updates points in a collection
- Each point has an ID, vector, and optional payload (metadata)
- Supports batch operations for efficiency

### Recommended Usage:
```python
from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct, VectorParams, Distance

# Initialize client
client = QdrantClient(url=os.getenv("QDRANT_URL"), api_key=os.getenv("QDRANT_API_KEY"))

# Create collection if it doesn't exist
if not client.collection_exists("docusaurus_docs"):
    client.create_collection(
        collection_name="docusaurus_docs",
        vectors_config=VectorParams(size=384, distance=Distance.COSINE),  # 384 = BGE-small embedding size
    )

# Upsert points with metadata
operation_info = client.upsert(
    collection_name="docusaurus_docs",
    points=[
        PointStruct(
            id=1,
            vector=[0.05, 0.61, 0.76, 0.74],
            payload={"file_path": "/docs/intro.md", "chunk_index": 0}
        ),
    ]
)
```

## FastEmbed Research

### Key Findings:
- FastEmbed is lightweight and fast Python library for generating text embeddings
- Default model is "BAAI/bge-small-en-v1.5" with 384-dimensional vectors
- Returns numpy arrays as embeddings
- Supports lazy loading to reduce startup time
- Can process batches of documents efficiently
- Supports both CPU and GPU (with CUDAExecutionProvider)

### Recommended Usage:
```python
from fastembed import TextEmbedding

# Initialize with default model
model = TextEmbedding()

# Embed documents
documents = ["This is a sample document", "Another document for embedding"]
embeddings_list = list(model.embed(documents))

# For batch processing
embeddings = list(model.embed(
    large_corpus,
    batch_size=256,
    parallel=4  # Use 4 worker processes
))
```

## LangChain RecursiveCharacterTextSplitter Research

### Key Findings:
- RecursiveCharacterTextSplitter splits text based on common separators (paragraphs, sentences, words)
- Prioritizes keeping larger units intact and descends to smaller units if chunk exceeds size
- Configurable chunk_size and chunk_overlap parameters
- Supports add_start_index to track position in original document
- Works with Document objects or plain text

### Recommended Usage:
```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    add_start_index=True
)

# Split documents
all_splits = text_splitter.split_documents(docs)
print(f"Split into {len(all_splits)} sub-documents.")
```

## Implementation Approach

### Overall Flow:
1. Recursively scan docs directory for .md and .mdx files
2. Read each file content
3. Split content using RecursiveCharacterTextSplitter
4. Generate embeddings using fastembed
5. Store in Qdrant with metadata (file path, chunk index)

### Dependencies to Install:
- qdrant-client
- fastembed
- langchain-text-splitters

### Vector Configuration:
- Using BGE-small model (384 dimensions) as it's the default in fastembed
- Cosine distance for similarity search
- Metadata will include file_path and chunk_index for retrieval context