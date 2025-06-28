/**
 * API routes for the Adaptive Prompt Optimizer
 */

import express from 'express';
import { optimizePromptController, healthCheckController } from '../controllers/promptController.js';
import { validatePromptRequest } from '../middleware/validation.js';

const router = express.Router();

// Health check endpoint
router.get('/health', healthCheckController);

// Prompt optimization endpoint
router.post('/optimize-prompt', validatePromptRequest, optimizePromptController);

export default router;