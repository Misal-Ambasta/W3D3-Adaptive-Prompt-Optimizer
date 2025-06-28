import { useState } from 'react'
import './App.css'

// Loading spinner component
const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
  </div>
)

// Define types for our application
type Tool = {
  id: string;
  name: string;
};

type OptimizeResponse = {
  original: string;
  optimized: string;
  intent: string;
  complexity: string;
  explanation: string[];
};

// List of available tools
const tools: Tool[] = [
  { id: 'github-copilot', name: 'GitHub Copilot' },
  { id: 'cursor', name: 'Cursor' },
  { id: 'replit-ai', name: 'Replit AI' },
  { id: 'code-whisperer', name: 'Amazon CodeWhisperer' },
  { id: 'tabnine', name: 'Tabnine' },
  { id: 'codeium', name: 'Codeium' },
  { id: 'claude', name: 'Claude' },
  { id: 'chatgpt', name: 'ChatGPT/GPT-4' },
];

function App() {
  // State for form inputs and results
  const [prompt, setPrompt] = useState('');
  const [selectedTool, setSelectedTool] = useState(tools[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<OptimizeResponse | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt to optimize');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setResult(null); // Clear previous results
    
    try {
      // Call the backend API
      const response = await fetch('http://localhost:3000/api/optimize-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          tool: selectedTool,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Server error (${response.status}). Please try again.`
        );
      }
      
      const data = await response.json();
      setResult(data);
      
      // Scroll to results
      setTimeout(() => {
        document.querySelector('.results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (err) {
      setError(`Failed to optimize prompt: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Adaptive Prompt Optimizer</h1>
        <p>Optimize your prompts for specific AI coding tools</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="prompt">Enter your prompt:</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want the AI to do..."
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tool">Select target tool:</label>
            <select
              id="tool"
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
            >
              {tools.map((tool) => (
                <option key={tool.id} value={tool.id}>
                  {tool.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Optimizing...</span>
              </>
            ) : (
              'Optimize Prompt'
            )}
          </button>
        </form>

        {error && (
          <div className="error">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="results">
            <div className="results-header">
              <h2>Optimization Results</h2>
              <div className="tool-badge">
                {tools.find(t => t.id === selectedTool)?.name}
              </div>
            </div>
            
            <div className="comparison">
              <div className="original">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                  Original Prompt
                </h3>
                <div className="prompt-box">{result.original}</div>
              </div>
              
              <div className="optimized">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  Optimized Prompt
                </h3>
                <div className="prompt-box highlight-box">{result.optimized}</div>
              </div>
            </div>

            <div className="analysis">
              <div className="metadata">
                <div className="metadata-item">
                  <span className="metadata-label">Intent</span>
                  <span className="metadata-value">{result.intent}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Complexity</span>
                  <span className="metadata-value">{result.complexity}</span>
                </div>
              </div>
              
              <div className="explanation">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Optimization Explanation
                </h3>
                <ul className="explanation-list">
                  {result.explanation.map((point, index) => (
                    <li key={index}>
                      <span className="point-number">{index + 1}</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="copy-buttons">
              <button 
                className="copy-button" 
                onClick={() => navigator.clipboard.writeText(result.optimized)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy Optimized Prompt
              </button>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>Adaptive Prompt Optimizer - Optimize your prompts for AI coding tools</p>
      </footer>
    </div>
  )
}

export default App
