from fastapi import APIRouter, HTTPException
from app.models.workflow_models import RunWorkflowRequest
from app.services.workflow_executor import WorkflowExecutor

router = APIRouter()

@router.post("/workflow/run")
def run_workflow(request: RunWorkflowRequest):
    try:
        executor = WorkflowExecutor(request.workflow)
        result = executor.execute(request.query)
        return {"response": result}
    except Exception as e:
        print("ERROR:", e)  # This prints to terminal
        raise HTTPException(status_code=500, detail=str(e))



