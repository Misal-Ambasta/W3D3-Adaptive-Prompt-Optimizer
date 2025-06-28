/**
 * Service for prompt optimization
 */

import { optimizePrompt } from '../optimizers/index.js';

/**
 * Optimizes a prompt for a specific AI coding tool
 * @param {string} prompt - The original prompt
 * @param {string} tool - The ID of the selected AI coding tool
 * @returns {Object} - Object containing optimization results
 */
export const optimizePromptService = (prompt, tool) => {
  // Call the optimizer function
  return optimizePrompt(prompt, tool);
};