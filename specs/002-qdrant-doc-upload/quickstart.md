# Quickstart: Qdrant Vector Upload for Docusaurus Book

## Prerequisites

- Python 3.8+
- Qdrant Cloud account or local Qdrant instance
- Docusaurus documentation in `docs/` directory

## Setup

1. **Create environment file**:
   ```bash
   cd qdrantpush
   cp .env.example .env
   ```

2. **Configure environment variables** in `.env`:
   ```env
   QDRANT_URL=your_qdrant_url
   QDRANT_API_KEY=your_qdrant_api_key
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Run the upload script**:
   ```bash
   python qdrantpush.py
   ```

2. **Monitor the output** for progress and completion status.

## Expected Output

- All `.md` and `.mdx` files in the `docs/` directory are processed
- Content is split into chunks and converted to embeddings
- Embeddings with metadata are stored in Qdrant collection
- Console output shows progress and final statistics

## Verification

1. Check your Qdrant dashboard to confirm:
   - Collection named "docusaurus_docs" exists
   - Vector count matches the number of processed chunks
   - Metadata includes file paths and chunk indices
2. Test semantic search functionality through Qdrant UI