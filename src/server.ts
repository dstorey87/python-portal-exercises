// =============================================================================
// EXERCISE CONTENT SERVER - REST API
// Express.js server for serving exercise content with full CRUD operations
// =============================================================================

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { ExerciseLoader, validateExercise, getExerciseStats, searchExercises } from './index.js';
import { APIResponse, ValidationError, NotFoundError } from '@python-portal/types';

const app = express();
const PORT = process.env.PORT || 3001;
const CONTENT_PATH = process.env.CONTENT_PATH || './content';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Exercise loader instance
const loader = new ExerciseLoader(CONTENT_PATH);

// =============================================================================
// MIDDLEWARE CONFIGURATION
// =============================================================================

// Security and performance middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(compression());
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Request correlation ID
app.use((req, res, next) => {
  req.correlationId = req.headers['x-correlation-id'] as string || 
    `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  res.setHeader('x-correlation-id', req.correlationId);
  next();
});

// =============================================================================
// API RESPONSE HELPERS
// =============================================================================

/**
 * Send successful API response
 */
function sendSuccess<T>(
  res: express.Response, 
  data: T, 
  message?: string, 
  statusCode = 200
): void {
  const response: APIResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
    correlationId: res.getHeader('x-correlation-id') as string,
    version: '1.0.0'
  };
  res.status(statusCode).json(response);
}

/**
 * Send error API response
 */
function sendError(
  res: express.Response,
  error: string,
  statusCode = 500,
  details?: any
): void {
  const response: APIResponse = {
    success: false,
    error,
    message: statusCode >= 500 ? 'Internal server error' : error,
    timestamp: new Date().toISOString(),
    correlationId: res.getHeader('x-correlation-id') as string,
    version: '1.0.0'
  };
  
  if (process.env.NODE_ENV === 'development' && details) {
    (response as any).details = details;
  }
  
  res.status(statusCode).json(response);
}

// =============================================================================
// ERROR HANDLING MIDDLEWARE
// =============================================================================

/**
 * Async route handler wrapper
 */
function asyncHandler(
  fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any>
) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

// =============================================================================
// API ROUTES
// =============================================================================

// Health check endpoint
app.get('/health', (req, res) => {
  sendSuccess(res, {
    status: 'healthy',
    service: 'python-portal-exercises',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  }, 'Service is healthy');
});

// Get all exercises with optional filtering
app.get('/api/exercises', asyncHandler(async (req, res) => {
  const { difficulty, topic, category, search, limit, offset } = req.query;
  
  let exercises = await loader.loadAll();
  
  // Apply filters
  if (difficulty && typeof difficulty === 'string') {
    exercises = exercises.filter(ex => ex.difficulty === difficulty);
  }
  
  if (topic && typeof topic === 'string') {
    exercises = exercises.filter(ex => ex.topics.includes(topic));
  }
  
  if (category && typeof category === 'string') {
    exercises = exercises.filter(ex => ex.category === category);
  }
  
  if (search && typeof search === 'string') {
    exercises = searchExercises(exercises, search);
  }
  
  // Apply pagination
  const limitNum = limit ? Math.min(parseInt(limit as string, 10), 100) : exercises.length;
  const offsetNum = offset ? parseInt(offset as string, 10) : 0;
  
  const paginatedExercises = exercises.slice(offsetNum, offsetNum + limitNum);
  
  sendSuccess(res, paginatedExercises, `Retrieved ${paginatedExercises.length} exercises`);
}));

// Get specific exercise by ID
app.get('/api/exercises/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!id || !id.match(/^E\d+_[a-zA-Z_]+$/)) {
    return sendError(res, 'Invalid exercise ID format', 400);
  }
  
  const exercise = await loader.loadById(id);
  sendSuccess(res, exercise, `Retrieved exercise ${id}`);
}));

// Get exercise metadata only
app.get('/api/exercises/:id/metadata', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!id || !id.match(/^E\d+_[a-zA-Z_]+$/)) {
    return sendError(res, 'Invalid exercise ID format', 400);
  }
  
  const exercise = await loader.loadById(id);
  
  const metadata = {
    id: exercise.id,
    title: exercise.title,
    description: exercise.description,
    difficulty: exercise.difficulty,
    topics: exercise.topics,
    order: exercise.order,
    estimatedTime: exercise.estimatedTime,
    category: exercise.category
  };
  
  sendSuccess(res, metadata, `Retrieved metadata for exercise ${id}`);
}));

// Get exercises by difficulty
app.get('/api/exercises/difficulty/:level', asyncHandler(async (req, res) => {
  const { level } = req.params;
  
  if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
    return sendError(res, 'Invalid difficulty level', 400);
  }
  
  const exercises = await loader.loadByDifficulty(level as any);
  sendSuccess(res, exercises, `Retrieved ${exercises.length} ${level} exercises`);
}));

// Get all available topics
app.get('/api/topics', asyncHandler(async (req, res) => {
  const topics = await loader.getTopics();
  sendSuccess(res, topics, `Retrieved ${topics.length} topics`);
}));

// Get exercise statistics
app.get('/api/stats', asyncHandler(async (req, res) => {
  const exercises = await loader.loadAll();
  const stats = getExerciseStats(exercises);
  sendSuccess(res, stats, 'Retrieved exercise statistics');
}));

// Refresh cache endpoint (useful for content updates)
app.post('/api/refresh', asyncHandler(async (req, res) => {
  loader.invalidateCache();
  const exercises = await loader.loadAll(); // Force reload
  sendSuccess(res, { count: exercises.length }, 'Cache refreshed successfully');
}));

// =============================================================================
// ERROR HANDLING
// =============================================================================

// Handle 404s
app.use((req, res) => {
  sendError(res, `Endpoint not found: ${req.method} ${req.path}`, 404);
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', error);
  
  if (error instanceof ValidationError) {
    return sendError(res, error.message, 400, error.validationErrors);
  }
  
  if (error instanceof NotFoundError) {
    return sendError(res, error.message, 404);
  }
  
  if (error.name === 'SyntaxError' && error.message.includes('JSON')) {
    return sendError(res, 'Invalid JSON in request body', 400);
  }
  
  sendError(res, 'An unexpected error occurred', 500, 
    process.env.NODE_ENV === 'development' ? error.stack : undefined
  );
});

// =============================================================================
// SERVER STARTUP
// =============================================================================

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Python Portal Exercises API running on port ${PORT}`);
    console.log(`📁 Content path: ${CONTENT_PATH}`);
    console.log(`🌐 CORS origin: ${CORS_ORIGIN}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Preload exercises on startup
    loader.loadAll().then(exercises => {
      console.log(`📚 Loaded ${exercises.length} exercises successfully`);
    }).catch(error => {
      console.error('❌ Failed to load exercises on startup:', error);
    });
  });
}

export { app, loader };

// Type augmentation for Express request
declare global {
  namespace Express {
    interface Request {
      correlationId: string;
    }
  }
}