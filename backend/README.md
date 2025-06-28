# Adaptive Prompt Optimizer - Backend

This is the backend service for the Adaptive Prompt Optimizer, which analyzes and optimizes prompts for various AI coding tools.

## Directory Structure

```
backend/
├── optimizers/       # Tool-specific optimization logic
├── server.js         # Express server entry point
├── tools_analysis.json # Information about each tool's capabilities
└── package.json      # Project dependencies
```

## API Endpoints

### Health Check
```
GET /api/health
```
Returns the status of the server.

### Optimize Prompt (To be fully implemented in Phase 2)
```
POST /api/optimize-prompt
```

**Request Body:**
```json
{
  "prompt": "string",  // The original prompt to optimize
  "tool": "string"    // The target tool (e.g., "github-copilot", "cursor")
}
```

**Response:**
```json
{
  "original": "string",    // The original prompt
  "optimized": "string",   // The optimized prompt
  "intent": "string",      // Detected intent (code generation, debugging, etc.)
  "complexity": "string",  // Assessed complexity (simple, medium, complex)
  "explanation": ["string"] // Bullet-point explanations of optimizations
}
```

## Setup and Running

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```