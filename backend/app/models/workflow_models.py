from pydantic import BaseModel
from typing import List, Dict, Any

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

class RunWorkflowRequest(BaseModel):
    workflow: Workflow
    query: str
