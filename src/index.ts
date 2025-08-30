// =============================================================================
// PYTHON PORTAL EXERCISES - MAIN EXPORT
// Complete TypeScript package for all 17 exercises
// =============================================================================

// Import all exercises from different difficulty levels
import { exercises as beginnerExercises } from './exercises/beginner';
import { exercises as intermediateExercises } from './exercises/intermediate';
import { exercises as intermediate2Exercises } from './exercises/intermediate2';
import { exercises as advancedExercises } from './exercises/advanced';

// Import types from shared package
import { 
  Exercise, 
  ExerciseMetadata, 
  ExerciseDifficulty, 
  PythonConcept 
} from '@python-portal/types';

// =============================================================================
// ALL EXERCISES COMBINED
// =============================================================================

export const ALL_EXERCISES: Exercise[] = [
  ...beginnerExercises,
  ...intermediateExercises,
  ...intermediate2Exercises,
  ...advancedExercises
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get all exercises
 */
export function getAllExercises(): Exercise[] {
  return ALL_EXERCISES;
}

/**
 * Get exercise by ID
 */
export function getExercise(id: string): Exercise | undefined {
  return ALL_EXERCISES.find(exercise => exercise.id === id);
}

/**
 * Get exercises by difficulty level
 */
export function getExercisesByDifficulty(difficulty: ExerciseDifficulty): Exercise[] {
  return ALL_EXERCISES.filter(exercise => exercise.metadata.difficulty === difficulty);
}

/**
 * Get exercises by topic
 */
export function getExercisesByTopic(topic: string): Exercise[] {
  return ALL_EXERCISES.filter(exercise => 
    exercise.metadata.topics.includes(topic)
  );
}

/**
 * Get exercises by Python concept
 */
export function getExercisesByConcept(concept: PythonConcept): Exercise[] {
  return ALL_EXERCISES.filter(exercise => 
    exercise.metadata.concepts.includes(concept)
  );
}

/**
 * Search exercises by title, instructions, or topics
 */
export function searchExercises(query: string): Exercise[] {
  const lowercaseQuery = query.toLowerCase();
  
  return ALL_EXERCISES.filter(exercise => {
    return (
      exercise.title.toLowerCase().includes(lowercaseQuery) ||
      exercise.instructions.toLowerCase().includes(lowercaseQuery) ||
      exercise.metadata.topics.some(topic => 
        topic.toLowerCase().includes(lowercaseQuery)
      )
    );
  });
}

/**
 * Get exercise metadata only (for performance)
 */
export function getExerciseMetadata(): ExerciseMetadata[] {
  return ALL_EXERCISES.map(exercise => ({
    id: exercise.id,
    title: exercise.title,
    difficulty: exercise.metadata.difficulty,
    topics: exercise.metadata.topics,
    estimatedTime: exercise.metadata.estimatedTime,
    concepts: exercise.metadata.concepts
  }));
}

/**
 * Get exercises sorted by estimated completion time
 */
export function getExercisesByTime(): Exercise[] {
  return [...ALL_EXERCISES].sort((a, b) => 
    a.metadata.estimatedTime - b.metadata.estimatedTime
  );
}

/**
 * Get recommended next exercise based on completed exercises
 */
export function getRecommendedNext(completedIds: string[]): Exercise | undefined {
  const completed = new Set(completedIds);
  const incomplete = ALL_EXERCISES.filter(ex => !completed.has(ex.id));
  
  // Sort by difficulty and then by estimated time
  const difficultyOrder = {
    [ExerciseDifficulty.BEGINNER]: 1,
    [ExerciseDifficulty.INTERMEDIATE]: 2,
    [ExerciseDifficulty.ADVANCED]: 3
  };
  
  return incomplete.sort((a, b) => {
    const diffA = difficultyOrder[a.metadata.difficulty];
    const diffB = difficultyOrder[b.metadata.difficulty];
    
    if (diffA !== diffB) {
      return diffA - diffB;
    }
    
    return a.metadata.estimatedTime - b.metadata.estimatedTime;
  })[0];
}

/**
 * Validate exercise structure
 */
export function validateExercise(exercise: Exercise): boolean {
  return (
    typeof exercise.id === 'string' &&
    typeof exercise.title === 'string' &&
    typeof exercise.instructions === 'string' &&
    typeof exercise.starterCode === 'string' &&
    typeof exercise.testCode === 'string' &&
    typeof exercise.solutionCode === 'string' &&
    typeof exercise.metadata === 'object' &&
    Object.values(ExerciseDifficulty).includes(exercise.metadata.difficulty) &&
    Array.isArray(exercise.metadata.topics) &&
    typeof exercise.metadata.estimatedTime === 'number' &&
    Array.isArray(exercise.metadata.concepts)
  );
}

/**
 * Get exercise statistics
 */
export function getExerciseStats() {
  const stats = {
    total: ALL_EXERCISES.length,
    byDifficulty: {
      [ExerciseDifficulty.BEGINNER]: 0,
      [ExerciseDifficulty.INTERMEDIATE]: 0,
      [ExerciseDifficulty.ADVANCED]: 0
    },
    averageTime: 0,
    totalTime: 0,
    conceptCoverage: {} as Record<PythonConcept, number>
  };
  
  let totalTime = 0;
  
  ALL_EXERCISES.forEach(exercise => {
    // Count by difficulty
    stats.byDifficulty[exercise.metadata.difficulty]++;
    
    // Calculate time
    totalTime += exercise.metadata.estimatedTime;
    
    // Count concept coverage
    exercise.metadata.concepts.forEach(concept => {
      stats.conceptCoverage[concept] = (stats.conceptCoverage[concept] || 0) + 1;
    });
  });
  
  stats.totalTime = totalTime;
  stats.averageTime = Math.round(totalTime / ALL_EXERCISES.length);
  
  return stats;
}

// =============================================================================
// RE-EXPORTS
// =============================================================================

// Re-export types for convenience
export {
  Exercise,
  ExerciseMetadata,
  ExerciseDifficulty,
  PythonConcept
} from '@python-portal/types';

// Re-export exercise collections by difficulty
export {
  beginnerExercises,
  intermediateExercises,
  intermediate2Exercises,
  advancedExercises
};

// Individual exercise exports
export * from './exercises/beginner';
export * from './exercises/intermediate';
export * from './exercises/intermediate2';
export * from './exercises/advanced';

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export default {
  exercises: ALL_EXERCISES,
  getAllExercises,
  getExercise,
  getExercisesByDifficulty,
  getExercisesByTopic,
  getExercisesByConcept,
  searchExercises,
  getExerciseMetadata,
  getRecommendedNext,
  validateExercise,
  getExerciseStats
};