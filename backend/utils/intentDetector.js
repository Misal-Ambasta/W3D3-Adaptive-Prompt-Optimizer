/**
 * Intent detection module for analyzing prompt intent
 * 
 * This module uses keyword analysis and pattern matching to determine
 * the most likely intent of a prompt (code generation, debugging, explanation, or refactoring).
 */

/**
 * Detects the intent of a prompt
 * @param {string} prompt - The user's prompt text
 * @returns {string} - The detected intent category
 */
const detectIntent = (prompt) => {
  const normalizedPrompt = prompt.toLowerCase();
  
  // Define keyword patterns for each intent category
  const intentPatterns = {
    'code generation': [
      'create', 'generate', 'write', 'implement', 'build', 'develop', 
      'make a', 'code for', 'function', 'class', 'script', 'program',
      'new', 'from scratch'
    ],
    'debugging': [
      'debug', 'fix', 'error', 'issue', 'problem', 'not working', 'bug',
      'exception', 'crash', 'fails', 'incorrect', 'wrong output',
      'troubleshoot', 'resolve'
    ],
    'explanation': [
      'explain', 'how does', 'what is', 'describe', 'clarify', 'understand',
      'tell me about', 'help me understand', 'documentation', 'comment',
      'why does', 'how to use'
    ],
    'refactoring': [
      'refactor', 'improve', 'optimize', 'clean', 'better', 'restructure',
      'rewrite', 'enhance', 'simplify', 'modernize', 'update', 'performance',
      'maintainable', 'readable'
    ]
  };
  
  // Calculate match scores for each intent
  const scores = Object.entries(intentPatterns).reduce((result, [intent, keywords]) => {
    const score = keywords.reduce((count, keyword) => {
      return normalizedPrompt.includes(keyword) ? count + 1 : count;
    }, 0);
    
    return { ...result, [intent]: score };
  }, {});
  
  // Find the intent with the highest score
  const [detectedIntent] = Object.entries(scores).reduce(
    ([maxIntent, maxScore], [intent, score]) => {
      return score > maxScore ? [intent, score] : [maxIntent, maxScore];
    }, 
    ['code generation', 0] // Default to code generation if no clear match
  );
  
  return detectedIntent;
};

export default detectIntent;