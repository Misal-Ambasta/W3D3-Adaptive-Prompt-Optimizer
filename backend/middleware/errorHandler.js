/**
 * Error handling middleware
 */

/**
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Set appropriate status code
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  // Send error response
  res.status(statusCode).json({
    error: err.message || 'An unexpected error occurred',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

/**
 * Not found middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};