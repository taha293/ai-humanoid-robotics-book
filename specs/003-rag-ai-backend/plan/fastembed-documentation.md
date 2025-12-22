# fastembed Documentation

Based on Context7 research for implementing the RAG-based AI Backend.

## Installation

```bash
pip install fastembed
```

## Basic Text Embedding

### Initialize default model (BAAI/bge-small-en-v1.5):

```python
from fastembed import TextEmbedding

# This will trigger the model download and initialization on first use
embedding_model = TextEmbedding()
print("The model BAAI/bge-small-en-v1.5 is ready to use.")

documents = [
    "This is a sample document",
    "This is another sample document"
]

# Generate embeddings
embeddings_generator = embedding_model.embed(documents)
embeddings_list = list(embeddings_generator)
print(f"Embedding dimension: {len(embeddings_list[0])}")  # Should be 384 for bge-small-en-v1.5
```

## Using Specific Models

### Load a specific model:

```python
from fastembed import TextEmbedding

# Load a specific model
embedding_model = TextEmbedding("BAAI/bge-small-en-v1.5")
```

### Multilingual model example:

```python
multilingual_model = TextEmbedding("intfloat/multilingual-e5-large")

embeddings = list(multilingual_model.embed([
    "Hello, world!",
    "你好世界",
    "¡Hola Mundo!"
]))
```

## Embedding Generation

### For single query:

```python
query = "What is the capital of France?"
embedding_generator = embedding_model.embed([query])
query_embedding = next(embedding_generator)  # Get first (and likely only) embedding
```

### For multiple documents (memory efficient with generator):

```python
documents = [
    "Document 1 content...",
    "Document 2 content...",
    # ... more documents
]

embeddings_generator = embedding_model.embed(documents)

# Process embeddings one by one to save memory
for doc, embedding in zip(documents, embeddings_generator):
    # Process each document embedding
    print(f"Document: {doc[:50]}...")
    print(f"Embedding shape: {embedding.shape}")
```

### Converting to NumPy array (for batch processing):

```python
import numpy as np

# Convert all embeddings to a NumPy array (uses more memory)
embeddings_array = np.array(list(embedding_model.embed(documents)))
print(f"Shape: {embeddings_array.shape}")  # (num_documents, embedding_dimension)
```

## Supported Models

The default model is BAAI/bge-small-en-v1.5 which:
- Produces 384-dimensional embeddings
- Is optimized for English text
- Balances performance and accuracy
- Downloads automatically on first use

## Key Points for Implementation:

1. Use BAAI/bge-small-en-v1.5 as specified in the requirements
2. The model downloads automatically on first use - handle this appropriately during initialization
3. Use the generator pattern to efficiently process embeddings without loading everything into memory
4. Query embeddings will be used to search the Qdrant vector database
5. Document embeddings were likely generated with the same model to ensure compatibility
6. The embedding process is fast and lightweight compared to transformer-based alternatives