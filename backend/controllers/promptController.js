/**
 * Controller functions for prompt optimization endpoints
 */

import { optimizePromptService } from '../services/promptService.js';

/**
 * Health check controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const healthCheckController = (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
};

/**
 * Prompt optimization controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const optimizePromptController = (req, res) => {
  try {
    const { prompt, tool } = req.body;
    
    // Call the service to optimize the prompt
    const result = optimizePromptService(prompt, tool);
    
    // Return the optimization result
    res.json(result);
  } catch (error) {
    console.error('Error optimizing prompt:', error);
    res.status(500).json({ 
      error: 'An error occurred while optimizing the prompt.' 
    });
  }
};