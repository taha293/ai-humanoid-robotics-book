---
id: 17
title: qdrant-field-name-issue
stage: analyze
date: 2025-12-19
surface: agent
model: claude-sonnet-4-5-20250929
feature: rag-ai-backend
branch: 003-rag-ai-backend
user: claude
command: sp.analyze
labels: [analysis, ai, rag, backend, qdrant, payload]
links:
  spec: specs/003-rag-ai-backend/spec.md
  plan: specs/003-rag-ai-backend/plan.md
  tasks: specs/003-rag-ai-backend/tasks.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/fastapiAi.py
tests:
  - Qdrant payload field validation
  - Content retrieval debugging
---

## Prompt

i tried and test it qdrant returning empty string, i got why becuase the function
 formatted_results = []
        for hit in search_results:
            content = hit.payload.get("content", "") if hit.payload else ""
            if content.strip():  # Only add non-empty content
                formatted_results.append({
                    "id": hit.id,
                    "content": content,
                    "metadata": {
                        "section": hit.payload.get("section", "") if hit.payload else "",
                        "page_number": hit.payload.get("page_number") if hit.payload else None,
                        "title": hit.payload.get("title", "") if hit.payload else ""
                    } if hit.payload else {},
                    "score": hit.score
                })

if i remove this from the dunction and just prinitng search_results its returning answer

## Response snapshot

Identified critical issue with Qdrant payload field name mismatch. The code assumes the content field in Qdrant payload is named "content", but the actual field name is different. When search_results is printed directly, it shows the data exists, but when accessing hit.payload.get("content", ""), it returns empty string because the field has a different name.

## Outcome

- ✅ Impact: Identified payload field name mismatch issue
- 🧪 Tests: Qdrant payload structure validation needed
- 📁 Files: backend/fastapiAi.py content field access
- 🔁 Next prompts: Need to fix payload field name to match actual schema
- 🧠 Reflection: Field names must match actual Qdrant collection schema

## Evaluation notes (flywheel)

- Failure modes observed: Payload field name mismatch
- Graders run and results (PASS/FAIL): Content retrieval failing due to field name
- Prompt variant (if applicable): Payload structure analysis
- Next experiment (smallest change to try): Print payload structure to identify actual field names