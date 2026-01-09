from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import wikipedia

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any]

class Edge(BaseModel):
    source: str
    target: str

class Workflow(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get("/")
def root():
    return {"status": "Backend running"}

# ---------- Helper Functions ----------

def clean_query(q: str):
    q = q.lower()
    q = q.replace("who is", "")
    q = q.replace("what is", "")
    q = q.replace("tell me about", "")
    q = q.replace("?", "")
    return q.strip()

def get_wikipedia_summary(query: str):
    try:
        cleaned = clean_query(query)
        summary = wikipedia.summary(cleaned, sentences=2)
        return summary
    except wikipedia.exceptions.DisambiguationError as e:
        return f"Multiple results found. Try being more specific: {e.options[:5]}"
    except wikipedia.exceptions.PageError:
        return f"No information found for '{query}'"
    except Exception as e:
        return "Error fetching information"

# ---------- Execution Engine ----------

@app.post("/execute")
def execute_workflow(workflow: Workflow):
    nodes = workflow.nodes
    edges = workflow.edges

    user_node = next((n for n in nodes if n.type == "userQuery"), None)
    llm_node = next((n for n in nodes if n.type == "llm"), None)
    output_node = next((n for n in nodes if n.type == "output"), None)

    if not user_node or not llm_node or not output_node:
        return {"result": "❌ Invalid workflow structure"}

    user_text = user_node.data.get("text", "").strip()

    if not user_text:
        return {"result": "Please enter a question"}

    answer = get_wikipedia_summary(user_text)

    return {"result": answer}






