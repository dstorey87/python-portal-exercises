# Python Learning Portal - Exercises Package

## Overview

This package contains all 17 Python learning exercises for the Python Learning Portal, structured as a standalone npm package with TypeScript interfaces and comprehensive exercise data.

## 🏗️ Structure

```
@python-portal/exercises/
├── src/
│   ├── index.ts              # Main export
│   ├── exercises/            # Exercise definitions
│   └── utils/                # Utility functions
├── exercises/            # Raw exercise files
│   ├── E0_greet/
│   ├── E1_seconds_to_hms/
│   ├── E1_tip_calc/
│   │   └── ...
│   └── E9_bug_hunt/
└── scripts/              # Build & validation
```

## 🚀 Quick Start

```bash
# Install
npm install @python-portal/exercises

# Build
npm run build

# Test
npm test
```

## 📚 Usage

```typescript
import { getAllExercises, getExercise, ExerciseDifficulty } from '@python-portal/exercises';

// Get all exercises
const exercises = getAllExercises();

// Get specific exercise
const greetExercise = getExercise('E0_greet');

// Filter by difficulty
const beginnerExercises = exercises.filter(ex => 
  ex.metadata.difficulty === ExerciseDifficulty.BEGINNER
);
```

## 🎯 Exercise Categories

### Beginner (E0-E2)
- **E0_greet**: Functions + f-strings
- **E1_seconds_to_hms**: Time conversion
- **E1_tip_calc**: Arithmetic operations
- **E2_initials**: String manipulation
- **E2_username_slug**: String processing

### Intermediate (E3-E6)
- **E3_grade_mapper**: Conditional logic
- **E3_leap_year**: Boolean logic
- **E4_fizzbuzz**: Loops + conditionals
- **E4_prime_checker**: Mathematical algorithms
- **E5_math_utils**: Multiple functions
- **E5_password_strength**: String analysis
- **E5_temp_convert**: Unit conversion
- **E6_set_ops**: Set operations

### Advanced (E7-E9)
- **E7_sum_numbers**: File I/O + parsing
- **E8_ops_module**: Module creation
- **E9_bug_hunt**: Debugging skills

## 📁 Exercise Structure

Each exercise contains:

```typescript
interface Exercise {
  id: string;
  title: string;
  instructions: string;  // Markdown content
  starterCode: string;   // Python starter code
  testCode: string;      // Python test code
  solutionCode: string;  // Complete solution
  metadata: {
    difficulty: ExerciseDifficulty;
    topics: string[];
    estimatedTime: number; // minutes
    concepts: PythonConcept[];
  };
}
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Watch mode
npm run dev

# Lint code
npm run lint

# Validate exercises
npm run validate-exercises

# Generate exercise index
npm run generate-index
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Test specific exercise
npm test -- --testNamePattern="E0_greet"

# Validate exercise structure
npm run validate-exercises
```

## 📊 Quality Assurance

- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Jest**: Comprehensive testing
- **Validation**: Exercise structure verification
- **CI/CD**: Automated testing and deployment

## 📚 API Reference

### Functions

```typescript
// Get all exercises
getAllExercises(): Exercise[]

// Get exercise by ID
getExercise(id: string): Exercise | undefined

// Get exercises by difficulty
getExercisesByDifficulty(difficulty: ExerciseDifficulty): Exercise[]

// Get exercises by topic
getExercisesByTopic(topic: string): Exercise[]

// Search exercises
searchExercises(query: string): Exercise[]

// Get exercise metadata
getExerciseMetadata(): ExerciseMetadata[]
```

### Types

```typescript
enum ExerciseDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate', 
  ADVANCED = 'advanced'
}

enum PythonConcept {
  FUNCTIONS = 'functions',
  STRINGS = 'strings',
  CONDITIONALS = 'conditionals',
  LOOPS = 'loops',
  // ... more concepts
}
```

## 📄 License

MIT - see [LICENSE](LICENSE) file

---

**Note**: This package is designed to work with the Python Portal ecosystem and requires `@python-portal/types` for type definitions.