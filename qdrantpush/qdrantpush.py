import os
import glob
import uuid
from pathlib import Path
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.http import models
from langchain_text_splitters import RecursiveCharacterTextSplitter
from fastembed import TextEmbedding
import time

# Load environment variables
load_dotenv()

# Initialize the embedding model once globally to avoid reloading
embedding_model = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")

def load_environment_variables():
    """Load and validate environment variables for Qdrant connection."""
    qdrant_url = os.getenv("QDRANT_URL")
    qdrant_api_key = os.getenv("QDRANT_API_KEY")

    if not qdrant_url or not qdrant_api_key:
        raise ValueError("QDRANT_URL and QDRANT_API_KEY must be set in .env file")

    return qdrant_url, qdrant_api_key

def initialize_qdrant_client():
    """Initialize Qdrant client with error handling."""
    try:
        qdrant_url, qdrant_api_key = load_environment_variables()
        client = QdrantClient(
            url=qdrant_url,
            api_key=qdrant_api_key,
            timeout=30
        )
        return client
    except Exception as e:
        print(f"Error initializing Qdrant client: {e}")
        raise

def test_qdrant_connection(client):
    """Test Qdrant connection by listing collections."""
    try:
        collections = client.get_collections()
        print("Successfully connected to Qdrant")
        return True
    except Exception as e:
        print(f"Failed to connect to Qdrant: {e}")
        return False

def collection_exists(client, collection_name="documentation_chunks"):
    """Check if Qdrant collection exists."""
    try:
        collections = client.get_collections()
        collection_names = [col.name for col in collections.collections]
        return collection_name in collection_names
    except Exception as e:
        print(f"Error checking collection existence: {e}")
        return False

def create_collection(client, collection_name="documentation_chunks", vector_size=384):
    """Create Qdrant collection with specified vector size."""
    try:
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(
                size=vector_size,
                distance=models.Distance.COSINE
            )
        )
        print(f"Created collection: {collection_name}")
    except Exception as e:
        print(f"Error creating collection: {e}")
        raise

def scan_docs_directory(docs_path="docs"):
    """Recursively scan docs directory for .md and .mdx files."""
    md_files = glob.glob(os.path.join(docs_path, "**/*.md"), recursive=True)
    mdx_files = glob.glob(os.path.join(docs_path, "**/*.mdx"), recursive=True)
    all_files = md_files + mdx_files
    return all_files

def read_file_content(file_path):
    """Read content from a documentation file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        return content
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return None

def split_content(content, chunk_size=1000, chunk_overlap=200):
    """Split documentation content using RecursiveCharacterTextSplitter."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        is_separator_regex=False,
    )
    chunks = text_splitter.split_text(content)
    return chunks

def generate_embeddings(chunks):
    """Generate embeddings using the globally initialized fastembed TextEmbedding model."""
    embeddings = list(embedding_model.embed(chunks))
    return embeddings

def format_chunks_with_metadata(chunks, file_path):
    """Format chunks with metadata (file_path, chunk_index)."""
    formatted_chunks = []
    for idx, chunk in enumerate(chunks):
        formatted_chunk = {
            "text": chunk,
            "file_path": file_path,
            "chunk_index": idx
        }
        formatted_chunks.append(formatted_chunk)
    return formatted_chunks

def upload_to_qdrant(client, formatted_chunks, embeddings, collection_name="documentation_chunks"):
    """Upload embeddings and metadata to Qdrant."""
    points = []
    for idx, (chunk_data, embedding) in enumerate(zip(formatted_chunks, embeddings)):
        # Use a unique UUID for each point to prevent ID overwriting
        point_id = str(uuid.uuid4())
        point = models.PointStruct(
            id=point_id,
            vector=embedding.tolist(),
            payload={
                "text": chunk_data["text"],
                "file_path": chunk_data["file_path"],
                "chunk_index": chunk_data["chunk_index"]
            }
        )
        points.append(point)

    # Upload in batches to handle memory constraints
    batch_size = 100
    for i in range(0, len(points), batch_size):
        batch = points[i:i + batch_size]
        try:
            client.upsert(
                collection_name=collection_name,
                points=batch
            )
            print(f"Uploaded batch {i//batch_size + 1}/{(len(points)-1)//batch_size + 1}")
        except Exception as e:
            print(f"Error uploading batch {i//batch_size + 1}: {e}")
            raise

def process_documentation_files(client, docs_path="docs", collection_name="documentation_chunks"):
    """Process all documentation files and upload to Qdrant."""
    print("Scanning documentation directory...")
    doc_files = scan_docs_directory(docs_path)
    print(f"Found {len(doc_files)} documentation files")

    total_chunks = 0
    processed_files = 0

    for file_path in doc_files:
        print(f"Processing: {file_path}")

        # Read file content
        content = read_file_content(file_path)
        if content is None:
            continue

        # Skip empty files
        if not content.strip():
            print(f"Skipping empty file: {file_path}")
            continue

        # Split content into chunks
        chunks = split_content(content)

        # Format chunks with metadata
        formatted_chunks = format_chunks_with_metadata(chunks, file_path)

        # Generate embeddings
        try:
            embeddings = generate_embeddings(chunks)
        except Exception as e:
            print(f"Error generating embeddings for {file_path}: {e}")
            continue

        # Upload to Qdrant
        try:
            upload_to_qdrant(client, formatted_chunks, embeddings, collection_name)
            total_chunks += len(chunks)
            processed_files += 1
            print(f"Successfully processed {file_path}: {len(chunks)} chunks")
        except Exception as e:
            print(f"Error uploading {file_path} to Qdrant: {e}")
            continue

    print(f"\nProcessing complete!")
    print(f"Processed {processed_files} files")
    print(f"Uploaded {total_chunks} chunks to Qdrant")

def verify_upload_completion(client, collection_name="documentation_chunks"):
    """Verify that all documentation chunks have been stored in Qdrant."""
    try:
        # Get the count of points in the collection
        collection_info = client.get_collection(collection_name)
        point_count = collection_info.points_count
        print(f"Verification: Collection '{collection_name}' contains {point_count} vectors")

        if point_count > 0:
            print(f"✓ Upload verification successful: {point_count} chunks stored in Qdrant")
            return True
        else:
            print("✗ Upload verification failed: No chunks found in Qdrant")
            return False
    except Exception as e:
        print(f"✗ Upload verification failed: {e}")
        return False

def main():
    """Main execution flow to process all documentation files."""
    print("Starting Qdrant documentation upload process...")

    # Initialize Qdrant client
    print("Initializing Qdrant client...")
    client = initialize_qdrant_client()

    # Test connection
    if not test_qdrant_connection(client):
        print("Cannot proceed without Qdrant connection")
        return

    # Check if collection exists, create if it doesn't
    collection_name = "documentation_chunks"
    if not collection_exists(client, collection_name):
        print(f"Creating collection: {collection_name}")
        create_collection(client, collection_name)
    else:
        print(f"Collection {collection_name} already exists")

    # Process documentation files
    process_documentation_files(client)

    # Verify upload completion
    print("\nVerifying upload completion...")
    if verify_upload_completion(client, collection_name):
        print("Upload process completed successfully!")
    else:
        print("Upload process completed but verification failed!")

if __name__ == "__main__":
    main()