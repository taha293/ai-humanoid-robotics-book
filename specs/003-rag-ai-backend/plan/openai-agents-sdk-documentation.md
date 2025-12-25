# OpenAI Agents SDK Documentation

Based on Context7 research for implementing the RAG-based AI Backend with Gemini LLM.

## Installation

```bash
pip install openai-agents
```

## Basic Usage

### Initialize an Agent with minimal configuration:

```python
from agents import Agent, Runner

agent = Agent(
    name="Assistant",
    instructions="Reply very concisely.",
)
```

### Run the agent with a query:

```python
result = await Runner.run(
    agent,
    "What city is the Golden Gate Bridge in?",
    session=None  # Optional session parameter
)
print(result.final_output)  # "San Francisco"
```

## Agent Configuration for Gemini Integration

### Using custom model with Gemini:

```python
from agents import Agent, Runner

agent = Agent(
    name="BookAssistant",
    instructions="You are an assistant that answers questions based only on the provided book content. Do not hallucinate information.",
    model="gpt-5.2",  # This would be replaced with the appropriate Gemini model identifier
)
```

## Integration with Tools

### Agent with File Search Tool (relevant for RAG):

```python
from agents import Agent, FileSearchTool, Runner

agent = Agent(
    name="Assistant",
    tools=[
        FileSearchTool(
            max_num_results=3,
            vector_store_ids=["VECTOR_STORE_ID"],  # This would connect to your Qdrant collection
        ),
    ],
)
```

## Session Management

### Using Advanced SQLite Session:

```python
from agents import Agent, Runner
from agents.extensions.memory import AdvancedSQLiteSession

# Create agent
agent = Agent(
    name="Assistant",
    instructions="Reply very concisely.",
)

# Create an advanced session
session = AdvancedSQLiteSession(
    session_id="conversation_123",
    db_path="conversations.db",
    create_tables=True
)

# First conversation turn
result = await Runner.run(
    agent,
    "What city is the Golden Gate Bridge in?",
    session=session
)
print(result.final_output)  # "San Francisco"

# IMPORTANT: Store usage data
await session.store_run_usage(result)

# Continue conversation
result = await Runner.run(
    agent,
    "What state is it in?",
    session=session
)
print(result.final_output)  # "California"
await session.store_run_usage(result)
```

## Encrypted Session (for secure handling):

```python
from agents import Agent, Runner
from agents.extensions.memory import EncryptedSession, SQLAlchemySession

agent = Agent("Assistant")

# Create underlying session
underlying_session = SQLAlchemySession.from_url(
    "user-123",
    url="sqlite+aiosqlite:///:memory:",
    create_tables=True
)

# Wrap with encryption
session = EncryptedSession(
    session_id="user-123",
    underlying_session=underlying_session,
    encryption_key="your-secret-key-here",
    ttl=600  # 10 minutes
)

result = await Runner.run(agent, "Hello", session=session)
print(result.final_output)
```

## Interactive Demo Loop:

```python
import asyncio
from agents import Agent, run_demo_loop

async def main() -> None:
    agent = Agent(name="Assistant", instructions="You are a helpful assistant.")
    await run_demo_loop(agent)

if __name__ == "__main__":
    asyncio.run(main())
```

## Key Points for Implementation:

1. **Agent Creation**: Use `Agent` class to create your assistant with specific instructions
2. **Runner**: Use `Runner.run()` to execute agent queries
3. **Tools**: Consider using `FileSearchTool` for connecting to your Qdrant vector store
4. **Sessions**: Use sessions to maintain conversation context
5. **Model Configuration**: Configure the agent to use Gemini via the model parameter
6. **Instructions**: Set clear instructions to ensure responses are grounded in book content only

This documentation will be used during implementation to properly integrate OpenAI Agents SDK with the RAG system.