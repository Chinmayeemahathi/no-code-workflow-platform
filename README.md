🧠 No-Code / Low-Code GenAI Workflow Platform

This project is a No-Code / Low-Code Workflow Builder where users can visually create workflows using drag-and-drop components and execute them without writing any code.

Users can:

Add nodes (User Query, LLM, Output)
Connect them visually
Configure each node
Run the workflow
Get a response

This project demonstrates full-stack engineering, system design, and graph-based execution logic.

Tech Stack

Frontend

React
React Flow
JavaScript
CSS

Backend

Python
FastAPI
Tools

Git
GitHub
REST APIs



How the System Works

User builds a workflow visually in the frontend
Nodes are connected (User Query → LLM → Output)
User clicks Run Workflow
Frontend sends workflow graph (nodes + edges) to backend
Backend parses the graph
Backend executes each step
Backend generates a response
Result is sent back
UI displays the output

Backend Setup

Step 1: Go to backend folder
cd backend
Step 2: Create virtual environment (optional but recommended)
python -m venv venv

Activate:
Windows:
venv\Scripts\activate
Mac/Linux:
source venv/bin/activate

Step 3: Install dependencies
pip install -r requirements.txt

Step 4: Run the backend
uvicorn app.main:app --reload


Backend will start at:
http://127.0.0.1:8000


You can test it by opening:
http://127.0.0.1:8000

Frontend Setup

Step 1: Go to frontend folder
cd frontend

Step 2: Install dependencies
npm install

Step 3: Start frontend
npm start


Frontend will run at:
http://localhost:3000

How to Use the App

Open frontend in browser
Add nodes from left panel:
User Query
LLM
Output

Connect them in this order:

User Query → LLM → Output
Click each node to configure:
User Query → Enter text
LLM → Choose model
Click Run Workflow

Output will appear in Output node
Why Mock AI Instead of Real APIs?
Real AI APIs (OpenAI, Gemini) require:
API keys
Billing
Internet reliability

To keep this project:

Free
Stable
Testable

I implemented a Mock AI Engine that simulates AI responses.
This architecture allows replacing mock logic with real APIs later.
What This Project Demonstrates
Graph-based execution
No-code UI design
Backend orchestration
API design
Component-based frontend
Clean architecture
Real-world problem solving

One-Line Explanation

I built a no-code workflow system where users visually create logic using nodes, and the backend dynamically executes the workflow to return a response.

Future Enhancements
Real AI integration
File upload / knowledge base
User authentication
Workflow saving
Cloud deployment
Kubernetes support

Author
Full Stack Developer (Aspiring)
Adurthi Mahathi Chinmayee, Built as part of a full-stack engineering assignment to demonstrate system design and real-world development skills.
