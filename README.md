# Adaptive Prompt Optimizer

A tool that optimizes prompts for specific AI coding tools. This application analyzes prompt intent, complexity, and requirements to generate optimized prompts based on tool-specific capabilities.

## Features

- Accept base prompt and target tool selection
- Analyze prompt intent, complexity, and requirements
- Generate optimized prompts based on tool-specific capabilities
- Display before/after comparison with explanations
- Modern glassmorphism UI design for enhanced user experience
- Real-time feedback with loading indicators and error handling

## Supported Tools

- GitHub Copilot
- Cursor
- Replit AI
- Amazon CodeWhisperer
- Tabnine
- Codeium
- Claude
- ChatGPT/GPT-4

## Project Structure

```
/
├── frontend/           # React TypeScript frontend
│   ├── src/            # Frontend source code
│   │   ├── App.tsx     # Main application component
│   │   └── App.css     # Styling with glassmorphism design
│   ├── index.html      # HTML entry point
│   └── package.json    # Frontend dependencies
├── backend/            # Node.js + Express backend
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── optimizers/     # Tool-specific optimization logic
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic layer
│   ├── utils/          # Utility functions
│   ├── server.js       # Express server entry point
│   └── tools_analysis.json # Information about each tool's capabilities
└── package.json        # Root package.json for running both services
```

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/adaptive-prompt-optimizer.git
   cd adaptive-prompt-optimizer
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   npm run install:all
   ```

## Running the Application

### Development Mode

Run both frontend and backend in development mode:

```bash
npm run dev
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:3000

Or run them separately:

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### Production Mode

```bash
npm start
```

## API Endpoints

### Health Check
```
GET /api/health
```
Returns the status of the server.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### Optimize Prompt
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

## How It Works

1. **Intent Detection**: The system analyzes your prompt to determine if it's for code generation, debugging, explanation, or refactoring.

2. **Complexity Assessment**: The prompt is evaluated for complexity based on length, technical terms, requirements, and structural indicators.

3. **Tool-Specific Optimization**: The system applies optimization strategies based on the selected tool's strengths and weaknesses.

4. **Explanation Generation**: The system provides bullet-point explanations of the changes made to optimize the prompt.

## Example Usage

### Original Prompt
```
Write a function to sort an array of numbers
```

### Optimized for GitHub Copilot
```
/**
 * Function to sort an array of numbers in ascending order
 * @param {number[]} arr - The input array of numbers
 * @return {number[]} - The sorted array
 */
function sortNumbers(arr) {
  // Implementation goes here
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC