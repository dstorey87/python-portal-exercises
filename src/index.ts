// =============================================================================
// PYTHON PORTAL EXERCISES - CONTENT MANAGEMENT SYSTEM
// Production-grade exercise content loader and API service
// =============================================================================

import {
  Exercise,
  ExerciseContent,
  ExerciseMetadata,
  APIResponse,
  ValidationError,
  NotFoundError
} from '@python-portal/types';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Exercise content loader with caching and validation
 * Manages loading and parsing of exercise files from the content directory
 */
export class ExerciseLoader {
  private contentPath: string;
  private cache = new Map<string, Exercise>();
  private cacheValid = false;

  constructor(contentPath: string = './content') {
    this.contentPath = path.resolve(contentPath);
  }

  /**
   * Load all exercises from the content directory
   * @returns Promise resolving to array of Exercise objects
   */
  async loadAll(): Promise<Exercise[]> {
    if (this.cacheValid && this.cache.size > 0) {
      return Array.from(this.cache.values()).sort((a, b) => a.order - b.order);
    }

    await this.refreshCache();
    return Array.from(this.cache.values()).sort((a, b) => a.order - b.order);
  }

  /**
   * Load specific exercise by ID
   * @param id Exercise identifier (e.g., 'E0_greet')
   * @returns Promise resolving to Exercise object
   */
  async loadById(id: string): Promise<Exercise> {
    if (this.cache.has(id) && this.cacheValid) {
      return this.cache.get(id)!;
    }

    const exercise = await this.loadExerciseFromDisk(id);
    this.cache.set(id, exercise);
    return exercise;
  }

  /**
   * Load exercises filtered by difficulty
   * @param difficulty Difficulty level to filter by
   * @returns Promise resolving to filtered Exercise array
   */
  async loadByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<Exercise[]> {
    const allExercises = await this.loadAll();
    return allExercises.filter(ex => ex.difficulty === difficulty);
  }

  /**
   * Load exercises filtered by topic
   * @param topic Topic to filter by
   * @returns Promise resolving to filtered Exercise array
   */
  async loadByTopic(topic: string): Promise<Exercise[]> {
    const allExercises = await this.loadAll();
    return allExercises.filter(ex => ex.topics.includes(topic));
  }

  /**
   * Get all available topics across exercises
   * @returns Promise resolving to array of unique topics
   */
  async getTopics(): Promise<string[]> {
    const allExercises = await this.loadAll();
    const topics = new Set<string>();
    allExercises.forEach(ex => ex.topics.forEach(topic => topics.add(topic)));
    return Array.from(topics).sort();
  }

  /**
   * Invalidate cache and force reload
   */
  invalidateCache(): void {
    this.cache.clear();
    this.cacheValid = false;
  }

  /**
   * Refresh the entire exercise cache
   * @private
   */
  private async refreshCache(): Promise<void> {
    this.cache.clear();
    
    const exercisesPath = path.join(this.contentPath, 'exercises');
    
    try {
      const exerciseDirs = await fs.readdir(exercisesPath, { withFileTypes: true });
      
      for (const dirent of exerciseDirs) {
        if (dirent.isDirectory() && dirent.name.startsWith('E')) {
          try {
            const exercise = await this.loadExerciseFromDisk(dirent.name);
            this.cache.set(exercise.id, exercise);
          } catch (error) {
            console.warn(`Failed to load exercise ${dirent.name}:`, error);
          }
        }
      }
      
      this.cacheValid = true;
    } catch (error) {
      throw new Error(`Failed to read exercises directory: ${error}`);
    }
  }

  /**
   * Load single exercise from disk
   * @param id Exercise ID
   * @returns Promise resolving to Exercise object
   * @private
   */
  private async loadExerciseFromDisk(id: string): Promise<Exercise> {
    const exercisePath = path.join(this.contentPath, 'exercises', id);
    
    try {
      // Check if directory exists
      await fs.access(exercisePath);
    } catch {
      throw new NotFoundError('Exercise', id);
    }

    try {
      // Load metadata
      const metadataPath = path.join(exercisePath, 'metadata.json');
      const metadataContent = await fs.readFile(metadataPath, 'utf-8');
      const metadata: ExerciseMetadata = JSON.parse(metadataContent);

      // Load instruction content
      const instructionsPath = path.join(exercisePath, 'instructions.md');
      const instructions = await fs.readFile(instructionsPath, 'utf-8');

      // Load starter code
      const starterPath = path.join(exercisePath, 'starter.py');
      const starterCode = await fs.readFile(starterPath, 'utf-8');

      // Load test code
      const testPath = path.join(exercisePath, 'test.py');
      const testCode = await fs.readFile(testPath, 'utf-8');

      // Load solution code
      const solutionPath = path.join(exercisePath, 'solution.py');
      const solutionCode = await fs.readFile(solutionPath, 'utf-8');

      // Create exercise object
      const exercise: Exercise = {
        id,
        title: metadata.title || id.replace('_', ' ').replace(/E\d+\s*/, ''),
        description: metadata.description || '',
        instructions: instructions.trim(),
        starterCode: starterCode.trim(),
        testCode: testCode.trim(),
        solutionCode: solutionCode.trim(),
        difficulty: metadata.difficulty,
        topics: metadata.topics,
        order: metadata.order,
        estimatedTime: metadata.estimatedTime,
        filePath: exercisePath,
        category: metadata.category
      };

      // Validate exercise structure
      validateExercise(exercise);

      return exercise;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        throw error;
      }
      throw new Error(`Failed to load exercise ${id}: ${error}`);
    }
  }
}

/**
 * Validate exercise structure and content
 * @param exercise Exercise object to validate
 * @throws ValidationError if exercise is invalid
 */
export function validateExercise(exercise: Exercise): void {
  const errors: string[] = [];

  // Required fields validation
  if (!exercise.id || typeof exercise.id !== 'string') {
    errors.push('Exercise ID is required and must be a string');
  }

  if (!exercise.title || typeof exercise.title !== 'string') {
    errors.push('Exercise title is required and must be a string');
  }

  if (!exercise.instructions || typeof exercise.instructions !== 'string') {
    errors.push('Exercise instructions are required and must be a string');
  }

  if (!exercise.starterCode || typeof exercise.starterCode !== 'string') {
    errors.push('Exercise starter code is required and must be a string');
  }

  if (!exercise.testCode || typeof exercise.testCode !== 'string') {
    errors.push('Exercise test code is required and must be a string');
  }

  if (!exercise.solutionCode || typeof exercise.solutionCode !== 'string') {
    errors.push('Exercise solution code is required and must be a string');
  }

  // Difficulty validation
  const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  if (!validDifficulties.includes(exercise.difficulty)) {
    errors.push(`Exercise difficulty must be one of: ${validDifficulties.join(', ')}`);
  }

  // Topics validation
  if (!Array.isArray(exercise.topics) || exercise.topics.length === 0) {
    errors.push('Exercise topics must be a non-empty array');
  }

  // Order validation
  if (typeof exercise.order !== 'number' || exercise.order < 0) {
    errors.push('Exercise order must be a non-negative number');
  }

  // Estimated time validation
  if (typeof exercise.estimatedTime !== 'number' || exercise.estimatedTime <= 0) {
    errors.push('Exercise estimated time must be a positive number');
  }

  // Content validation
  if (exercise.starterCode.length < 10) {
    errors.push('Starter code seems too short (minimum 10 characters)');
  }

  if (exercise.testCode.length < 20) {
    errors.push('Test code seems too short (minimum 20 characters)');
  }

  if (exercise.instructions.length < 20) {
    errors.push('Instructions seem too short (minimum 20 characters)');
  }

  if (errors.length > 0) {
    throw new ValidationError(`Exercise validation failed: ${errors.join(', ')}`);
  }
}

/**
 * Get exercise statistics and metrics
 * @param exercises Array of exercises to analyze
 * @returns Statistics object
 */
export function getExerciseStats(exercises: Exercise[]) {
  const stats = {
    total: exercises.length,
    byDifficulty: {
      beginner: 0,
      intermediate: 0,
      advanced: 0
    },
    averageTime: 0,
    totalTime: 0,
    topics: new Set<string>(),
    categories: new Set<string>()
  };

  exercises.forEach(exercise => {
    // Count by difficulty
    stats.byDifficulty[exercise.difficulty]++;
    
    // Calculate time metrics
    stats.totalTime += exercise.estimatedTime;
    
    // Collect topics and categories
    exercise.topics.forEach(topic => stats.topics.add(topic));
    if (exercise.category) {
      stats.categories.add(exercise.category);
    }
  });

  stats.averageTime = Math.round(stats.totalTime / exercises.length);

  return {
    ...stats,
    topics: Array.from(stats.topics),
    categories: Array.from(stats.categories)
  };
}

/**
 * Search exercises by text content
 * @param exercises Array of exercises to search
 * @param query Search query
 * @returns Filtered exercises matching the query
 */
export function searchExercises(exercises: Exercise[], query: string): Exercise[] {
  if (!query || query.trim().length === 0) {
    return exercises;
  }

  const searchTerm = query.toLowerCase().trim();
  
  return exercises.filter(exercise => 
    exercise.title.toLowerCase().includes(searchTerm) ||
    exercise.description.toLowerCase().includes(searchTerm) ||
    exercise.topics.some(topic => topic.toLowerCase().includes(searchTerm)) ||
    exercise.instructions.toLowerCase().includes(searchTerm) ||
    (exercise.category && exercise.category.toLowerCase().includes(searchTerm))
  );
}

/**
 * Default exercise loader instance
 */
export const defaultLoader = new ExerciseLoader();

// Re-export types for convenience
export type {
  Exercise,
  ExerciseContent,
  ExerciseMetadata
} from '@python-portal/types';