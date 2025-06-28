/**
 * Prompt optimizer module for transforming prompts based on tool, intent, and complexity
 * 
 * This module applies tool-specific optimization strategies to improve prompts
 * based on the detected intent and complexity level.
 */

/**
 * Optimizes a prompt for a specific AI coding tool
 * @param {string} prompt - The original prompt
 * @param {string} toolId - The ID of the selected AI coding tool
 * @param {string} intent - The detected intent category
 * @param {string} complexity - The assessed complexity level
 * @param {Object} toolsData - Data about all supported tools and their optimization strategies
 * @returns {Object} - Object containing optimized prompt and explanation
 */
const optimizePrompt = (prompt, toolId, intent, complexity, toolsData) => {
  // Find the selected tool data
  const tool = toolsData.tools.find(t => t.id === toolId);
  
  if (!tool) {
    return {
      optimizedPrompt: prompt,
      explanation: ['Tool not found in the database']
    };
  }
  
  // Start with the original prompt
  let optimizedPrompt = prompt;
  const explanations = [];
  
  // Apply general optimization strategies based on intent
  switch (intent) {
    case 'code generation':
      optimizedPrompt = applyCodeGenerationOptimizations(optimizedPrompt, tool, complexity);
      explanations.push('Added clear output expectations for code generation');
      explanations.push('Structured the request with specific requirements');
      break;
      
    case 'debugging':
      optimizedPrompt = applyDebuggingOptimizations(optimizedPrompt, tool, complexity);
      explanations.push('Added request for step-by-step debugging approach');
      explanations.push('Emphasized error identification and resolution');
      break;
      
    case 'explanation':
      optimizedPrompt = applyExplanationOptimizations(optimizedPrompt, tool, complexity);
      explanations.push('Requested clear, structured explanations');
      explanations.push('Added specificity about the level of detail needed');
      break;
      
    case 'refactoring':
      optimizedPrompt = applyRefactoringOptimizations(optimizedPrompt, tool, complexity);
      explanations.push('Specified refactoring goals and constraints');
      explanations.push('Added request for improvement justifications');
      break;
  }
  
  // Apply tool-specific optimizations
  const toolSpecificOptimizations = applyToolSpecificOptimizations(optimizedPrompt, tool, intent, complexity);
  optimizedPrompt = toolSpecificOptimizations.optimizedPrompt;
  explanations.push(...toolSpecificOptimizations.explanations);
  
  // Apply complexity-based formatting
  optimizedPrompt = applyComplexityFormatting(optimizedPrompt, complexity);
  explanations.push(`Formatted prompt for ${complexity} complexity level`);
  
  return {
    optimizedPrompt,
    explanation: explanations
  };
};

/**
 * Applies code generation specific optimizations
 */
const applyCodeGenerationOptimizations = (prompt, tool, complexity) => {
  let optimized = prompt;
  
  // Add structure for code generation requests
  if (!prompt.includes('```') && !prompt.toLowerCase().includes('example')) {
    optimized += '\n\nPlease provide the code with proper formatting and comments.';
  }
  
  // Add specificity about the expected output
  if (!prompt.toLowerCase().includes('function') && 
      !prompt.toLowerCase().includes('class') && 
      !prompt.toLowerCase().includes('method')) {
    optimized += '\n\nSpecify the exact function/class structure you want to see in the response.';
  }
  
  return optimized;
};

/**
 * Applies debugging specific optimizations
 */
const applyDebuggingOptimizations = (prompt, tool, complexity) => {
  let optimized = prompt;
  
  // Add request for step-by-step debugging
  if (!prompt.toLowerCase().includes('step by step') && 
      !prompt.toLowerCase().includes('step-by-step')) {
    optimized += '\n\nPlease provide a step-by-step analysis of the issue and how to fix it.';
  }
  
  // Add request for explanation of the root cause
  if (!prompt.toLowerCase().includes('root cause') && 
      !prompt.toLowerCase().includes('why')) {
    optimized += '\n\nExplain the root cause of the issue and why your solution works.';
  }
  
  return optimized;
};

/**
 * Applies explanation specific optimizations
 */
const applyExplanationOptimizations = (prompt, tool, complexity) => {
  let optimized = prompt;
  
  // Add structure for explanations
  if (!prompt.toLowerCase().includes('explain') && 
      !prompt.toLowerCase().includes('description')) {
    optimized += '\n\nPlease provide a clear, structured explanation with examples where appropriate.';
  }
  
  // Add specificity about the level of detail
  if (complexity === 'simple') {
    optimized += '\n\nKeep the explanation concise and beginner-friendly.';
  } else if (complexity === 'complex') {
    optimized += '\n\nInclude technical details and underlying principles in your explanation.';
  }
  
  return optimized;
};

/**
 * Applies refactoring specific optimizations
 */
const applyRefactoringOptimizations = (prompt, tool, complexity) => {
  let optimized = prompt;
  
  // Add refactoring goals
  if (!prompt.toLowerCase().includes('improve') && 
      !prompt.toLowerCase().includes('better') && 
      !prompt.toLowerCase().includes('optimize')) {
    optimized += '\n\nFocus on improving readability, maintainability, and performance in your refactoring.';
  }
  
  // Add request for explanation of improvements
  if (!prompt.toLowerCase().includes('explain') && 
      !prompt.toLowerCase().includes('why')) {
    optimized += '\n\nExplain the benefits of each refactoring change you suggest.';
  }
  
  return optimized;
};

/**
 * Applies tool-specific optimizations based on the tool's strengths
 */
const applyToolSpecificOptimizations = (prompt, tool, intent, complexity) => {
  let optimized = prompt;
  const explanations = [];
  
  // Apply optimizations based on the tool's documented strategies
  if (tool.promptOptimizationStrategies && tool.promptOptimizationStrategies.length > 0) {
    // Select appropriate strategies based on intent and complexity
    const strategies = selectStrategies(tool.promptOptimizationStrategies, intent, complexity);
    
    // Apply each selected strategy
    strategies.forEach(strategy => {
      const { updatedPrompt, explanation } = applyStrategy(optimized, strategy, intent);
      optimized = updatedPrompt;
      explanations.push(explanation);
    });
  }
  
  // Tool-specific customizations
  switch (tool.id) {
    case 'github-copilot':
      if (intent === 'code generation' && !prompt.includes('//')) {
        optimized = '// The following code should be implemented:\n' + optimized;
        explanations.push('Added comment prefix for better Copilot context');
      }
      break;
      
    case 'cursor':
      if (!prompt.toLowerCase().includes('language') && !prompt.toLowerCase().includes('framework')) {
        optimized += '\n\nPlease use [specific language/framework] for this task.';
        explanations.push('Added language/framework specification for Cursor');
      }
      break;
      
    case 'replit-ai':
      if (!prompt.includes('file') && !prompt.includes('function')) {
        optimized += '\n\nReference the specific files or functions this relates to.';
        explanations.push('Added file/function reference for Replit AI context');
      }
      break;
      
    case 'code-whisperer':
      if (!prompt.toLowerCase().includes('aws') && !prompt.toLowerCase().includes('security')) {
        optimized += '\n\nEnsure AWS best practices and security considerations are followed.';
        explanations.push('Added AWS and security focus for CodeWhisperer');
      }
      break;
      
    case 'tabnine':
      // Tabnine works best with concise prompts
      if (prompt.split(' ').length > 20) {
        const words = prompt.split(' ');
        optimized = words.slice(0, 20).join(' ') + '... [rest of context]';
        explanations.push('Shortened prompt for Tabnine\'s concise preference');
      }
      break;
      
    case 'codeium':
      if (!prompt.toLowerCase().includes('language') && !prompt.toLowerCase().includes('framework')) {
        optimized += '\n\nUse [specific language] with [specific framework].';
        explanations.push('Added language and framework specification for Codeium');
      }
      break;
      
    case 'claude':
      if (!prompt.toLowerCase().includes('reason') && !prompt.toLowerCase().includes('explain')) {
        optimized += '\n\nPlease explain your reasoning and provide multiple approaches if applicable.';
        explanations.push('Added reasoning request for Claude\'s analytical strength');
      }
      break;
      
    case 'chatgpt':
      if (!prompt.toLowerCase().includes('format') && !prompt.toLowerCase().includes('structure')) {
        optimized += '\n\nPlease structure your response in the following format: [specific format]';
        explanations.push('Added output format specification for ChatGPT/GPT-4');
      }
      break;
  }
  
  return {
    optimizedPrompt: optimized,
    explanations
  };
};

/**
 * Selects appropriate strategies based on intent and complexity
 */
const selectStrategies = (strategies, intent, complexity) => {
  // For simplicity, we'll use all strategies but in a real implementation
  // we would be more selective based on intent and complexity
  return strategies.slice(0, Math.min(2, strategies.length)); // Use up to 2 strategies
};

/**
 * Applies a specific optimization strategy to the prompt
 */
const applyStrategy = (prompt, strategy, intent) => {
  let updatedPrompt = prompt;
  let explanation = `Applied strategy: ${strategy}`;
  
  // Convert strategy to actionable prompt modification
  switch (strategy.toLowerCase()) {
    case 'use clear function signatures':
      if (intent === 'code generation' && !prompt.includes('function')) {
        updatedPrompt += '\n\nPlease include clear function signatures with parameter types and return values.';
      }
      break;
      
    case 'provide context with comments':
      if (!prompt.includes('//') && !prompt.includes('/*')) {
        updatedPrompt = '/* Context: This code is part of a larger system */\n' + updatedPrompt;
      }
      break;
      
    case 'break complex tasks into smaller steps':
      if (intent === 'code generation' || intent === 'debugging') {
        updatedPrompt += '\n\nPlease break down this task into smaller, manageable steps before implementation.';
      }
      break;
      
    case 'specify language and framework':
      if (!prompt.toLowerCase().includes('language') && !prompt.toLowerCase().includes('framework')) {
        updatedPrompt += '\n\nImplement this using [specific language and framework].';
      }
      break;
      
    case 'include relevant context':
      if (!prompt.toLowerCase().includes('context')) {
        updatedPrompt = 'Context: [Add relevant project/code context here]\n\n' + updatedPrompt;
      }
      break;
      
    case 'ask for step-by-step explanations':
      if (intent === 'explanation' && !prompt.toLowerCase().includes('step')) {
        updatedPrompt += '\n\nPlease provide a step-by-step explanation.';
      }
      break;
      
    case 'reference specific files or functions':
      if (!prompt.includes('file:') && !prompt.includes('function:')) {
        updatedPrompt += '\n\nThis relates to file: [filename] and function: [functionName].';
      }
      break;
      
    case 'specify desired output format':
      if (!prompt.toLowerCase().includes('format')) {
        updatedPrompt += '\n\nPlease format your response as [specific format].';
      }
      break;
      
    case 'provide examples when possible':
      if (!prompt.toLowerCase().includes('example')) {
        updatedPrompt += '\n\nInclude examples in your response.';
      }
      break;
      
    case 'mention aws services explicitly':
      if (!prompt.toLowerCase().includes('aws')) {
        updatedPrompt += '\n\nUtilize appropriate AWS services for this implementation.';
      }
      break;
      
    case 'ask for security considerations':
      if (!prompt.toLowerCase().includes('security')) {
        updatedPrompt += '\n\nPlease include security considerations in your response.';
      }
      break;
      
    case 'request best practices':
      if (!prompt.toLowerCase().includes('best practice')) {
        updatedPrompt += '\n\nFollow industry best practices in your solution.';
      }
      break;
      
    case 'keep prompts concise':
      // This would involve shortening the prompt, but we'll skip actual implementation
      explanation = 'Recommended keeping the prompt concise for this tool';
      break;
      
    case 'focus on specific completion needs':
      if (!prompt.toLowerCase().includes('specifically')) {
        updatedPrompt += '\n\nSpecifically, I need help with [specific aspect].';
      }
      break;
      
    case 'provide local context':
      if (!prompt.toLowerCase().includes('context')) {
        updatedPrompt = 'Local context: [Add project-specific context here]\n\n' + updatedPrompt;
      }
      break;
      
    case 'be specific about language and framework':
      if (!prompt.toLowerCase().includes('language') && !prompt.toLowerCase().includes('framework')) {
        updatedPrompt += '\n\nI\'m using [specific language] with [specific framework].';
      }
      break;
      
    case 'provide function context':
      if (!prompt.toLowerCase().includes('function')) {
        updatedPrompt += '\n\nThis is within the context of a function that [describe function purpose].';
      }
      break;
      
    case 'ask for specific patterns':
      if (!prompt.toLowerCase().includes('pattern')) {
        updatedPrompt += '\n\nPlease use [specific design pattern] in your solution.';
      }
      break;
      
    case 'provide detailed context':
      if (!prompt.toLowerCase().includes('context')) {
        updatedPrompt = 'Detailed context: [Add comprehensive context here]\n\n' + updatedPrompt;
      }
      break;
      
    case 'ask for reasoning':
      if (!prompt.toLowerCase().includes('reason') && !prompt.toLowerCase().includes('why')) {
        updatedPrompt += '\n\nPlease explain your reasoning for each part of the solution.';
      }
      break;
      
    case 'request multiple approaches':
      if (!prompt.toLowerCase().includes('approach') && !prompt.toLowerCase().includes('alternative')) {
        updatedPrompt += '\n\nProvide multiple approaches to solving this problem, with pros and cons of each.';
      }
      break;
      
    case 'use clear, structured requests':
      if (!prompt.includes('1.') && !prompt.includes('*')) {
        updatedPrompt = 'I need help with the following:\n1. [Main request]\n2. [Additional details]\n3. [Constraints or requirements]\n\n' + updatedPrompt;
      }
      break;
      
    case 'provide context and constraints':
      if (!prompt.toLowerCase().includes('constraint')) {
        updatedPrompt += '\n\nConstraints: [List any technical or business constraints here].';
      }
      break;
  }
  
  return { updatedPrompt, explanation };
};

/**
 * Applies formatting based on complexity level
 */
const applyComplexityFormatting = (prompt, complexity) => {
  let formatted = prompt;
  
  switch (complexity) {
    case 'simple':
      // For simple prompts, keep it concise
      if (!formatted.includes('\n\n')) {
        formatted += '\n\nKeep your response concise and to the point.';
      }
      break;
      
    case 'medium':
      // For medium complexity, add some structure
      if (!formatted.includes('\n1.') && !formatted.includes('\n*')) {
        formatted += '\n\nPlease structure your response with clear sections.';
      }
      break;
      
    case 'complex':
      // For complex prompts, request detailed structure
      if (!formatted.includes('\n1.') && !formatted.includes('\n*')) {
        formatted += '\n\nPlease provide a comprehensive response with the following sections:\n1. Overview\n2. Detailed implementation\n3. Considerations and edge cases\n4. Testing approach';
      }
      break;
  }
  
  return formatted;
};

export default optimizePrompt;