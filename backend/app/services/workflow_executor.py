from typing import List
from app.models.workflow_models import Workflow, Node
from app.core.llm_clients import call_mock_llm




class WorkflowExecutor:
    def __init__(self, workflow: Workflow):
        self.workflow = workflow
        self.nodes = workflow.nodes
        self.edges = workflow.edges

    def get_node_by_type(self, node_type: str) -> Node | None:
        for node in self.nodes:
            if node.type == node_type:
                return node
        return None

    def execute(self, query: str) -> str:
        # Find LLM node in workflow
        llm_node = self.get_node_by_type("llm")

        if not llm_node:
            raise ValueError("LLM node not found in workflow")

        # Extract LLM configuration
        model = llm_node.data.get("model", "gpt-3.5-turbo")
        prompt = llm_node.data.get(
            "prompt",
            "Answer the user's question clearly."
        )

        # Execute LLM
        response = self.call_llm(
            model=model,
            prompt=prompt,
            query=query
        )

        return response

    def call_llm(self, model: str, prompt: str, query: str) -> str:
        return call_mock_llm(prompt=prompt, query=query)



