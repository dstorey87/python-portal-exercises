import { Exercise, ExerciseDifficulty, PythonConcept } from '@python-portal/types';

// =============================================================================
// UTILITY FUNCTIONS FOR EXERCISE MANAGEMENT
// =============================================================================

/**
 * Format exercise instructions for display
 */
export function formatInstructions(instructions: string): string {
  // Convert markdown to HTML-safe format
  return instructions
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

/**
 * Estimate difficulty score (1-10)
 */
export function getDifficultyScore(exercise: Exercise): number {
  const baseScores = {
    [ExerciseDifficulty.BEGINNER]: 2,
    [ExerciseDifficulty.INTERMEDIATE]: 5,
    [ExerciseDifficulty.ADVANCED]: 8
  };
  
  let score = baseScores[exercise.metadata.difficulty];
  
  // Adjust based on time estimate
  if (exercise.metadata.estimatedTime > 30) score += 1;
  if (exercise.metadata.estimatedTime > 45) score += 1;
  
  // Adjust based on concept count
  if (exercise.metadata.concepts.length > 3) score += 1;
  
  return Math.min(10, Math.max(1, score));
}

/**
 * Generate exercise summary
 */
export function getExerciseSummary(exercise: Exercise): string {
  const difficulty = exercise.metadata.difficulty;
  const time = exercise.metadata.estimatedTime;
  const topicCount = exercise.metadata.topics.length;
  
  return `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} level exercise (${time} min, ${topicCount} topics)`;
}

/**
 * Check if exercise covers specific concepts
 */
export function exerciseHasConcepts(exercise: Exercise, concepts: PythonConcept[]): boolean {
  return concepts.every(concept => exercise.metadata.concepts.includes(concept));
}

/**
 * Get prerequisite concepts for an exercise
 */
export function getPrerequisites(exercise: Exercise): PythonConcept[] {
  const prerequisites: Record<string, PythonConcept[]> = {
    'E0_greet': [],
    'E1_seconds_to_hms': [PythonConcept.FUNCTIONS],
    'E1_tip_calc': [PythonConcept.FUNCTIONS],
    'E2_initials': [PythonConcept.FUNCTIONS, PythonConcept.STRINGS],
    'E2_username_slug': [PythonConcept.FUNCTIONS, PythonConcept.STRINGS],
    'E3_grade_mapper': [PythonConcept.FUNCTIONS, PythonConcept.CONDITIONALS],
    'E3_leap_year': [PythonConcept.FUNCTIONS, PythonConcept.CONDITIONALS],
    'E4_fizzbuzz': [PythonConcept.FUNCTIONS, PythonConcept.CONDITIONALS, PythonConcept.LOOPS],
    'E4_prime_checker': [PythonConcept.FUNCTIONS, PythonConcept.LOOPS, PythonConcept.CONDITIONALS],
    'E5_math_utils': [PythonConcept.FUNCTIONS],
    'E5_password_strength': [PythonConcept.FUNCTIONS, PythonConcept.STRINGS, PythonConcept.CONDITIONALS],
    'E5_temp_convert': [PythonConcept.FUNCTIONS, PythonConcept.ARITHMETIC],
    'E6_set_ops': [PythonConcept.FUNCTIONS, PythonConcept.SETS],
    'E7_sum_numbers': [PythonConcept.FUNCTIONS, PythonConcept.FILE_IO, PythonConcept.EXCEPTION_HANDLING],
    'E8_ops_module': [PythonConcept.FUNCTIONS, PythonConcept.MODULES],
    'E9_bug_hunt': [PythonConcept.FUNCTIONS, PythonConcept.LISTS, PythonConcept.EXCEPTION_HANDLING]
  };
  
  return prerequisites[exercise.id] || [];
}

/**
 * Generate learning path based on concepts
 */
export function generateLearningPath(exercises: Exercise[]): Exercise[] {
  const conceptOrder: PythonConcept[] = [
    PythonConcept.FUNCTIONS,
    PythonConcept.STRINGS, 
    PythonConcept.ARITHMETIC,
    PythonConcept.CONDITIONALS,
    PythonConcept.LOOPS,
    PythonConcept.LISTS,
    PythonConcept.DICTIONARIES,
    PythonConcept.SETS,
    PythonConcept.EXCEPTION_HANDLING,
    PythonConcept.FILE_IO,
    PythonConcept.MODULES,
    PythonConcept.REGEX
  ];
  
  const difficultyOrder = {
    [ExerciseDifficulty.BEGINNER]: 1,
    [ExerciseDifficulty.INTERMEDIATE]: 2,
    [ExerciseDifficulty.ADVANCED]: 3
  };
  
  return exercises.sort((a, b) => {
    // First sort by difficulty
    const diffA = difficultyOrder[a.metadata.difficulty];
    const diffB = difficultyOrder[b.metadata.difficulty];
    
    if (diffA !== diffB) {
      return diffA - diffB;
    }
    
    // Then by concept complexity (lowest concept index first)
    const getConceptScore = (ex: Exercise) => {
      const scores = ex.metadata.concepts.map(concept => 
        conceptOrder.indexOf(concept)
      ).filter(score => score !== -1);
      
      return scores.length ? Math.min(...scores) : 999;
    };
    
    const scoreA = getConceptScore(a);
    const scoreB = getConceptScore(b);
    
    if (scoreA !== scoreB) {
      return scoreA - scoreB;
    }
    
    // Finally by estimated time
    return a.metadata.estimatedTime - b.metadata.estimatedTime;
  });
}

/**
 * Validate exercise code syntax (basic check)
 */
export function validatePythonCode(code: string): { valid: boolean; error?: string } {
  try {
    // Basic syntax validation - check for common issues
    const lines = code.split('\n');
    
    // Check for proper indentation
    let inFunction = false;
    let expectedIndent = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      if (trimmed === '') continue;
      
      // Check for function definition
      if (trimmed.startsWith('def ')) {
        inFunction = true;
        expectedIndent = 4;
        continue;
      }
      
      // Basic indentation check
      if (inFunction && trimmed !== '' && !trimmed.startsWith('#')) {
        const actualIndent = line.length - line.trimStart().length;
        if (actualIndent === 0 && !trimmed.startsWith('def ') && !trimmed.startsWith('if __name__')) {
          expectedIndent = 0;
          inFunction = false;
        }
      }
    }
    
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Unknown syntax error' 
    };
  }
}