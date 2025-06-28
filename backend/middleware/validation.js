/**
 * Validation middleware for API requests
 */

import { supportedTools } from '../config/tools.js';

/**
 * Validates the prompt optimization request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const validatePromptRequest = (req, res, next) => {
  const { prompt, tool } = req.body;
  
  // Validate prompt
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ 
      error: 'Invalid prompt. Please provide a non-empty string.' 
    });
  }
  
  // Validate tool
  if (!tool || typeof tool !== 'string') {
    return res.status(400).json({ 
      error: 'Invalid tool. Please provide a valid tool ID.' 
    });
  }
  
  // Check against the list of supported tools from config
  
  // Check if the tool is supported
  if (!supportedTools.includes(tool)) {
    return res.status(400).json({ 
      error: `Unsupported tool: ${tool}. Please choose from the available tools.` 
    });
  }
  
  // If validation passes, proceed to the next middleware
  next();
};