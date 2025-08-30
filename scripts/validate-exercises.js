#!/usr/bin/env node
/**
 * Exercise validation script
 * Validates all exercises for proper structure, content, and metadata
 */

const fs = require('fs').promises;
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'exercises');
const REQUIRED_FILES = ['metadata.json', 'instructions.md', 'starter.py', 'test.py', 'solution.py'];
const OPTIONAL_FILES = ['hints.json'];

class ValidationError extends Error {
  constructor(message, exerciseId) {
    super(message);
    this.exerciseId = exerciseId;
    this.name = 'ValidationError';
  }
}

async function validateExerciseStructure(exerciseId, exercisePath) {
  const errors = [];
  
  // Check required files exist
  for (const file of REQUIRED_FILES) {
    const filePath = path.join(exercisePath, file);
    try {
      await fs.access(filePath);
    } catch {
      errors.push(`Missing required file: ${file}`);
    }
  }
  
  return errors;
}

async function validateMetadata(exerciseId, exercisePath) {
  const errors = [];
  const metadataPath = path.join(exercisePath, 'metadata.json');
  
  try {
    const content = await fs.readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(content);
    
    // Required fields
    const requiredFields = ['id', 'title', 'description', 'difficulty', 'topics', 'estimatedTime', 'order', 'category'];
    for (const field of requiredFields) {
      if (!(field in metadata)) {
        errors.push(`Metadata missing required field: ${field}`);
      }
    }
    
    // Validate field types and values
    if (metadata.id !== exerciseId) {
      errors.push(`Metadata id '${metadata.id}' doesn't match directory name '${exerciseId}'`);
    }
    
    if (metadata.difficulty && !['beginner', 'intermediate', 'advanced'].includes(metadata.difficulty)) {
      errors.push(`Invalid difficulty: ${metadata.difficulty}`);
    }
    
    if (metadata.topics && !Array.isArray(metadata.topics)) {
      errors.push('Topics must be an array');
    }
    
    if (metadata.estimatedTime && (typeof metadata.estimatedTime !== 'number' || metadata.estimatedTime <= 0)) {
      errors.push('Estimated time must be a positive number');
    }
    
    if (metadata.order && (typeof metadata.order !== 'number' || metadata.order < 0)) {
      errors.push('Order must be a non-negative number');
    }
    
  } catch (error) {
    if (error.name === 'SyntaxError') {
      errors.push('Metadata JSON is invalid');
    } else {
      errors.push(`Failed to read metadata: ${error.message}`);
    }
  }
  
  return errors;
}

async function validateContent(exerciseId, exercisePath) {
  const errors = [];
  
  // Validate instructions
  try {
    const instructions = await fs.readFile(path.join(exercisePath, 'instructions.md'), 'utf-8');
    if (instructions.trim().length < 50) {
      errors.push('Instructions seem too short (minimum 50 characters)');
    }
    if (!instructions.includes('#')) {
      errors.push('Instructions should include markdown headers');
    }
  } catch (error) {
    errors.push(`Failed to read instructions: ${error.message}`);
  }
  
  // Validate Python files
  const pythonFiles = ['starter.py', 'test.py', 'solution.py'];
  for (const file of pythonFiles) {
    try {
      const content = await fs.readFile(path.join(exercisePath, file), 'utf-8');
      if (content.trim().length < 10) {
        errors.push(`${file} seems too short (minimum 10 characters)`);
      }
      
      // Basic Python syntax check
      if (file === 'starter.py' && !content.includes('def ')) {
        errors.push(`${file} should contain at least one function definition`);
      }
      
      if (file === 'test.py' && !content.includes('test') && !content.includes('check') && !content.includes('assert')) {
        errors.push(`${file} should contain test logic`);
      }
    } catch (error) {
      errors.push(`Failed to read ${file}: ${error.message}`);
    }
  }
  
  return errors;
}

async function validateHints(exerciseId, exercisePath) {
  const errors = [];
  const hintsPath = path.join(exercisePath, 'hints.json');
  
  try {
    await fs.access(hintsPath);
    const content = await fs.readFile(hintsPath, 'utf-8');
    const hints = JSON.parse(content);
    
    if (!Array.isArray(hints)) {
      errors.push('Hints must be an array');
    } else {
      hints.forEach((hint, index) => {
        if (!hint.id || !hint.title || !hint.content) {
          errors.push(`Hint ${index} missing required fields (id, title, content)`);
        }
        if (typeof hint.order !== 'number') {
          errors.push(`Hint ${index} order must be a number`);
        }
        if (typeof hint.revealLevel !== 'number' || hint.revealLevel < 1 || hint.revealLevel > 5) {
          errors.push(`Hint ${index} revealLevel must be a number between 1-5`);
        }
      });
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      errors.push(`Invalid hints.json: ${error.message}`);
    }
    // Hints are optional, so ENOENT is okay
  }
  
  return errors;
}

async function validateSingleExercise(exerciseId) {
  const exercisePath = path.join(CONTENT_DIR, exerciseId);
  const allErrors = [];
  
  console.log(`  Validating ${exerciseId}...`);
  
  // Structure validation
  const structureErrors = await validateExerciseStructure(exerciseId, exercisePath);
  allErrors.push(...structureErrors.map(err => `Structure: ${err}`));
  
  // Metadata validation
  const metadataErrors = await validateMetadata(exerciseId, exercisePath);
  allErrors.push(...metadataErrors.map(err => `Metadata: ${err}`));
  
  // Content validation
  const contentErrors = await validateContent(exerciseId, exercisePath);
  allErrors.push(...contentErrors.map(err => `Content: ${err}`));
  
  // Hints validation
  const hintErrors = await validateHints(exerciseId, exercisePath);
  allErrors.push(...hintErrors.map(err => `Hints: ${err}`));
  
  if (allErrors.length > 0) {
    throw new ValidationError(allErrors.join('\n    '), exerciseId);
  }
}

async function main() {
  console.log('🔍 Validating exercises...');
  
  try {
    const exerciseDirs = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
    const exercises = exerciseDirs
      .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('E'))
      .map(dirent => dirent.name)
      .sort();
    
    console.log(`Found ${exercises.length} exercises to validate:`);
    
    const errors = new Map();
    
    for (const exerciseId of exercises) {
      try {
        await validateSingleExercise(exerciseId);
        console.log(`    ✅ ${exerciseId}`);
      } catch (error) {
        console.log(`    ❌ ${exerciseId}`);
        errors.set(exerciseId, error.message);
      }
    }
    
    if (errors.size > 0) {
      console.log('\n❌ Validation failed for some exercises:');
      for (const [exerciseId, errorMsg] of errors) {
        console.log(`\n  ${exerciseId}:`);
        console.log(`    ${errorMsg.replace(/\n/g, '\n    ')}`);
      }
      process.exit(1);
    } else {
      console.log(`\n✅ All ${exercises.length} exercises validated successfully!`);
    }
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { 
  validateSingleExercise,
  ValidationError
};