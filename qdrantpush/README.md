# Qdrant Documentation Upload Tool

This tool uploads Docusaurus book content to a Qdrant vector database for semantic search capabilities.

## Setup

1. Install required dependencies:
```bash
pip install -r requirements.txt
```

2. Configure your Qdrant credentials in the `.env` file:
```env
QDRANT_URL=your_qdrant_url_here
QDRANT_API_KEY=your_qdrant_api_key_here
```

## Usage

Run the upload script:
```bash
python qdrantpush.py
```

The script will:
- Connect to your Qdrant instance
- Create a collection called "documentation_chunks" if it doesn't exist
- Scan the `docs/` directory for all `.md` and `.mdx` files
- Split the content into chunks with overlap
- Generate embeddings using fastembed
- Upload the embeddings and metadata to Qdrant
- Provide progress updates during processing

## Requirements

- Python 3.8+
- Qdrant Cloud instance or self-hosted Qdrant server
- Appropriate API credentials for Qdrant access

## Notes

- The script processes all `.md` and `.mdx` files in the `docs/` directory recursively
- Original documentation files are not modified during the upload process
- Each chunk is stored with its file path and chunk index for retrieval
- Embeddings are generated using the BAAI/bge-small-en-v1.5 model