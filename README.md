# @python-portal/exercises

> **Exercise content and metadata management for Python Portal - 17 curated exercises for Python mastery**

[![npm version](https://badge.fury.io/js/%40python-portal%2Fexercises.svg)](https://badge.fury.io/js/%40python-portal%2Fexercises)
[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Overview

This package provides a comprehensive collection of Python programming exercises designed for progressive learning. It includes content management, metadata, and a REST API for serving exercise data to the Python Portal learning platform.

## 🏗️ Architecture

```mermaid
graph TD
    A[Exercise Content] --> B[Content Loader]
    B --> C[Exercise API]
    C --> D[Frontend]
    C --> E[Backend]
    F[@python-portal/types] --> B
    F --> C
```

## 📦 Installation

```bash
npm install @python-portal/exercises
# or
yarn add @python-portal/exercises
```

## 🚀 Usage

### As a Package

```typescript
import { ExerciseLoader, validateExercise } from '@python-portal/exercises';
import { Exercise } from '@python-portal/types';

// Load all exercises
const loader = new ExerciseLoader();
const exercises = await loader.loadAll();

// Load specific exercise
const greetExercise = await loader.loadById('E0_greet');

// Validate exercise structure
const isValid = validateExercise(greetExercise);
```

### As a Service

```bash
# Start the exercise content server
npm run serve
# Server starts on http://localhost:3001
```

### API Endpoints

```bash
# Get all exercises
GET /api/exercises

# Get specific exercise
GET /api/exercises/:id

# Get exercises by difficulty
GET /api/exercises?difficulty=beginner

# Get exercise metadata
GET /api/exercises/:id/metadata

# Health check
GET /health
```

## 📚 Exercise Collection

### Beginner Level (7 exercises)
- **E0_greet** - Functions and f-strings
- **E1_tip_calc** - Basic arithmetic and input/output
- **E1_seconds_to_hms** - Time calculations and formatting
- **E2_initials** - String manipulation
- **E2_username_slug** - String processing and validation
- **E3_grade_mapper** - Conditional statements
- **E3_leap_year** - Boolean logic and conditionals

### Intermediate Level (6 exercises)
- **E4_fizzbuzz** - Loops and conditional logic
- **E4_prime_checker** - Algorithm implementation
- **E5_math_utils** - Module creation and math functions
- **E5_temp_convert** - Unit conversion and functions
- **E5_password_strength** - String validation and security
- **E6_set_ops** - Data structures and set operations

### Advanced Level (4 exercises)
- **E7_sum_numbers** - Advanced string parsing
- **E8_ops_module** - Complex module architecture
- **E9_bug_hunt** - Debugging and problem-solving

## 🔧 Development

### Build and Development

```bash
npm run build      # Full build with content copying
npm run dev        # Watch mode with hot reload
npm run clean      # Clean dist folder
```

### Content Management

```bash
npm run copy-content     # Copy exercise files to dist
npm run validate         # Validate all exercise content
npm run test:content     # Run content validation tests
```

### Quality Assurance

```bash
npm run lint       # ESLint validation
npm run type-check # TypeScript validation
npm test           # Run all validations
```

## 📁 Content Structure

```
content/
├── exercises/
│   ├── E0_greet/
│   │   ├── metadata.json
│   │   ├── instructions.md
│   │   ├── starter.py
│   │   ├── test.py
│   │   ├── solution.py
│   │   └── hints.json
│   ├── E1_tip_calc/
│   │   └── ...
│   └── .../
├── categories.json
└── curriculum.json
```

### Exercise Metadata Format

```json
{
  "id": "E0_greet",
  "title": "Greet by Name",
  "description": "Learn functions and f-string formatting",
  "difficulty": "beginner",
  "topics": ["functions", "strings", "f-strings"],
  "estimatedTime": 15,
  "order": 1,
  "category": "basics",
  "prerequisites": [],
  "objectives": [
    "Define functions with parameters",
    "Use f-string formatting",
    "Handle string capitalization"
  ]
}
```

## 🎯 Features

### Content Validation
- ✅ **Structure Validation**: All required files present
- ✅ **Metadata Validation**: JSON schema compliance
- ✅ **Python Syntax**: Code validity checking
- ✅ **Test Coverage**: Solution validation
- ✅ **Markdown Linting**: Instruction quality

### API Features
- ✅ **REST API**: Full CRUD operations
- ✅ **Content Filtering**: By difficulty, topic, category
- ✅ **Health Monitoring**: System status endpoints
- ✅ **Error Handling**: Standardized error responses
- ✅ **CORS Support**: Cross-origin resource sharing
- ✅ **Security Headers**: Helmet.js integration

### Development Experience
- ✅ **Hot Reload**: Watch mode for content changes
- ✅ **TypeScript**: Full type safety
- ✅ **ESLint**: Zero-tolerance code quality
- ✅ **Content Scripts**: Automated management tools
- ✅ **Validation Pipeline**: Pre-publish checks

## 🔗 Dependencies

### Runtime
- `@python-portal/types` - Shared TypeScript definitions
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `helmet` - Security middleware
- `compression` - Response compression

### Development
- `typescript` - Type-safe JavaScript
- `eslint` - Code linting and formatting
- `nodemon` - Development server
- `concurrently` - Parallel script execution

## 📊 Quality Standards

- ✅ **100% TypeScript coverage**
- ✅ **Zero ESLint errors/warnings**
- ✅ **All exercises tested and validated**
- ✅ **Comprehensive error handling**
- ✅ **Production-ready API**
- ✅ **Automated content validation**

## 🚀 Production Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
COPY content ./content
EXPOSE 3001
CMD ["npm", "run", "serve"]
```

### Environment Variables

```bash
PORT=3001                    # Server port
NODE_ENV=production         # Environment
CORSORIGIN=*               # CORS allowed origins
LOG_LEVEL=info             # Logging level
CONTENT_PATH=./content     # Exercise content path
```

## 📄 License

MIT © [dstorey87](https://github.com/dstorey87)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add/modify exercises following the structure
4. Run validation: `npm test`
5. Submit a pull request

### Adding New Exercises

1. Create exercise directory: `content/exercises/E[N]_name/`
2. Add required files: `metadata.json`, `instructions.md`, `starter.py`, `test.py`, `solution.py`
3. Optional: Add `hints.json` for guided learning
4. Run validation: `npm run validate`
5. Update curriculum order if needed

## 📞 Support

- 🐛 [Issues](https://github.com/dstorey87/python-portal-exercises/issues)
- 💬 [Discussions](https://github.com/dstorey87/python-portal-exercises/discussions)
- 📧 Email: darren@pythonportal.dev

---

**Built with ❤️ for Python learners everywhere**