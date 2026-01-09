No-Code Workflow Platform

This project is a No-Code / Low-Code Workflow Builder where users can visually create a workflow by dragging and connecting components like:

User Query

LLM (AI logic)

Output

Then, they can run the workflow and get a response.

This project was built as part of a full-stack engineering assignment to demonstrate my understanding of frontend, backend, system design, and real-world architecture.

Why I Built This

Instead of hardcoding logic, I wanted to build a system where:

Users can design logic visually

No programming is needed to create workflows

The backend dynamically understands the workflow

The system executes it step by step

The final result is shown like a chat

This is similar to tools like:

Zapier

Make.com

LangFlow

Node-RED

Tech Stack
Frontend

React

React Flow

JavaScript

CSS

Backend

Python

FastAPI

DevOps / Tools

Git

GitHub

Docker (optional)

REST APIs

Features
Frontend

Drag and drop nodes

Connect nodes visually

Strict validation of workflow:

User Query → LLM → Output

Click any node to configure it

Run workflow button

Output appears in UI

Backend

Accepts workflow graph (nodes + edges)

Validates workflow

Executes steps dynamically

Simulates AI logic (free, no API cost)

Returns final output

How the Workflow Works

User adds nodes

User connects them

User enters a question

User selects a model (GPT / Gemini)

Clicks Run Workflow

Backend receives the workflow

Backend executes it

Output is returned

UI displays the result

Folder Structure
no-code-workflow-platform/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── services/
│   │   ├── models/
│   │   └── utils/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docker-compose.yml
└── README.md

How to Run Locally
Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload


Backend will run at:

http://127.0.0.1:8000

Frontend
cd frontend
npm install
npm start


Frontend will run at:

http://localhost:3000

Important Design Decision: No Paid APIs

I originally tried integrating real AI APIs (Gemini, OpenAI), but I faced:

Frequent breaking changes

Version mismatches

404 errors

Billing risks

So I designed a Mock AI Engine that:

Behaves like a real AI

Is free

Is stable

Can be replaced later with real APIs

This shows real-world engineering thinking: build something stable first, then scale.

What This Project Demonstrates

Full-stack development

API design

UI/UX thinking

Graph-based execution

Clean architecture

Real-world problem solving

Debugging skills

Deployment readiness

One-Line Explanation (for Interviews)

I built a no-code workflow engine where users visually design logic using nodes, and the backend dynamically executes the workflow to produce a chat-style response.

Future Improvements

Real LLM integration (OpenAI / Gemini)

File upload & knowledge base

Authentication

Saving workflows

Export/import

Cloud deployment

Kubernetes support

Author

Built by me as part of a full-stack engineering assignment to demonstrate my understanding of real-world application design.

If you want, I can now:

✅ Customize this with your name
✅ Add screenshots
✅ Add architecture diagram
✅ Add demo instructions
✅ Make it interview-perfect
