// This file exports all the tool-specific optimizers

/**
 * A collection of prompt optimizers for different AI coding tools
 * 
 * Each optimizer will take a prompt and return an optimized version
 * along with explanations of the changes made.
 */

// Import utility modules
import detectIntent from '../utils/intentDetector.js';
import assessComplexity from '../utils/complexityAnalyzer.js';
import optimizePromptForTool from '../utils/promptOptimizer.js';

// Import tools data
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read tools data from JSON file
const toolsDataPath = path.join(__dirname, '..', 'tools_analysis.json');
const toolsData = JSON.parse(fs.readFileSync(toolsDataPath, 'utf8'));

// Define optimizers for each supported tool
const optimizers = {
  githubCopilot: (prompt) => optimizePrompt(prompt, 'github-copilot'),
  cursor: (prompt) => optimizePrompt(prompt, 'cursor'),
  replitAI: (prompt) => optimizePrompt(prompt, 'replit-ai'),
  codeWhisperer: (prompt) => optimizePrompt(prompt, 'code-whisperer'),
  tabnine: (prompt) => optimizePrompt(prompt, 'tabnine'),
  codeium: (prompt) => optimizePrompt(prompt, 'codeium'),
  claude: (prompt) => optimizePrompt(prompt, 'claude'),
  chatGPT: (prompt) => optimizePrompt(prompt, 'chatgpt')
};

/**
 * Optimizes a prompt for a specific AI coding tool
 * 
 * @param {string} prompt - The original user prompt
 * @param {string} toolId - The ID of the selected AI coding tool
 * @returns {Object} - Object containing original and optimized prompts, intent, complexity, and explanation
 */
const optimizePrompt = (prompt, toolId) => {
  // Detect the intent of the prompt
  const intent = detectIntent(prompt);
  
  // Assess the complexity of the prompt
  const complexity = assessComplexity(prompt);
  
  // Optimize the prompt for the specific tool
  const { optimizedPrompt, explanation } = optimizePromptForTool(prompt, toolId, intent, complexity, toolsData);
  
  // Return the complete optimization result
  return {
    original: prompt,
    optimized: optimizedPrompt,
    intent: intent,
    complexity: complexity,
    explanation: explanation
  };
};

export default optimizers;

// Export the main optimization function for direct use
export { optimizePrompt };