/**
 * Complexity analyzer module for assessing prompt complexity
 * 
 * This module evaluates the complexity of a prompt based on factors like
 * length, number of requirements, technical terms, and structural complexity.
 */

/**
 * Assesses the complexity of a prompt
 * @param {string} prompt - The user's prompt text
 * @returns {string} - The complexity level (simple, medium, complex)
 */
const assessComplexity = (prompt) => {
  // Initialize score factors
  let complexityScore = 0;
  
  // Factor 1: Length of the prompt
  const wordCount = prompt.split(/\s+/).length;
  if (wordCount < 30) {
    complexityScore += 1;
  } else if (wordCount < 100) {
    complexityScore += 2;
  } else {
    complexityScore += 3;
  }
  
  // Factor 2: Number of technical terms
  const technicalTerms = [
    'algorithm', 'api', 'architecture', 'async', 'authentication', 'authorization',
    'backend', 'cache', 'class', 'component', 'database', 'dependency', 'deployment',
    'docker', 'endpoint', 'framework', 'frontend', 'function', 'inheritance', 'interface',
    'kubernetes', 'library', 'middleware', 'module', 'object-oriented', 'optimization',
    'pattern', 'performance', 'protocol', 'recursion', 'rest', 'scalability', 'schema',
    'security', 'server', 'service', 'state management', 'testing', 'transaction',
    'typescript', 'validation', 'webhook'
  ];
  
  const normalizedPrompt = prompt.toLowerCase();
  const technicalTermCount = technicalTerms.reduce((count, term) => {
    return normalizedPrompt.includes(term) ? count + 1 : count;
  }, 0);
  
  if (technicalTermCount < 3) {
    complexityScore += 1;
  } else if (technicalTermCount < 8) {
    complexityScore += 2;
  } else {
    complexityScore += 3;
  }
  
  // Factor 3: Number of requirements or steps
  const requirementIndicators = [
    'need to', 'should', 'must', 'requirement', 'step', 'first', 'second', 'third',
    'finally', 'then', 'after that', 'additionally', 'also', 'feature', 'functionality'
  ];
  
  const requirementCount = requirementIndicators.reduce((count, indicator) => {
    const regex = new RegExp(`\\b${indicator}\\b`, 'gi');
    const matches = normalizedPrompt.match(regex) || [];
    return count + matches.length;
  }, 0);
  
  if (requirementCount < 3) {
    complexityScore += 1;
  } else if (requirementCount < 7) {
    complexityScore += 2;
  } else {
    complexityScore += 3;
  }
  
  // Factor 4: Structural complexity indicators
  const complexityIndicators = [
    'complex', 'complicated', 'advanced', 'sophisticated', 'intricate',
    'multiple', 'integrate', 'interaction', 'relationship', 'dependency',
    'system', 'architecture', 'scalable', 'enterprise', 'distributed'
  ];
  
  const complexityIndicatorCount = complexityIndicators.reduce((count, indicator) => {
    return normalizedPrompt.includes(indicator) ? count + 1 : count;
  }, 0);
  
  if (complexityIndicatorCount < 2) {
    complexityScore += 0;
  } else if (complexityIndicatorCount < 5) {
    complexityScore += 1;
  } else {
    complexityScore += 2;
  }
  
  // Determine complexity level based on total score
  // Maximum possible score: 11 (3 + 3 + 3 + 2)
  if (complexityScore <= 4) {
    return 'simple';
  } else if (complexityScore <= 8) {
    return 'medium';
  } else {
    return 'complex';
  }
};

export default assessComplexity;