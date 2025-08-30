import { Exercise, ExerciseDifficulty, PythonConcept } from '@python-portal/types';

// =============================================================================
// ADVANCED EXERCISES (E7-E9)
// =============================================================================

export const exercises: Exercise[] = [
  {
    id: 'E7_sum_numbers',
    title: 'Sum numbers from file',
    instructions: `# E7_sum_numbers: Sum numbers from file (files, exceptions)

Implement \`sum_file(path: str) -> int\` that reads integers (one per line) from a file. Ignore bad lines and treat empty files as 0.

## Requirements
- Read file line by line
- Convert each line to integer
- Ignore lines that can't be converted
- Handle file not found gracefully
- Return 0 for empty files

## Example File Content
\`\`\`
10
20
bad_line
30
\`\`\`
Result: 60 (ignores "bad_line")

## Example
\`\`\`python
sum_file("numbers.txt") # Returns sum of valid integers
sum_file("missing.txt") # Returns 0 (file not found)
\`\`\``,
    starterCode: `def sum_file(path: str) -> int:
    """Sum integers from file, ignoring bad lines."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    filename = input("File path: ")
    result = sum_file(filename)
    print(f"Sum: {result}")`,
    testCode: `import starter
import tempfile
import os

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

# Create test file
with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.txt') as f:
    f.write("10\\n20\\nbad_line\\n30\\n")
    test_file = f.name

try:
    result = starter.sum_file(test_file)
    check(result == 60, f"Expected 60, got {result}")
    
    # Test non-existent file
    result2 = starter.sum_file("non_existent.txt")
    check(result2 == 0, f"Expected 0 for missing file, got {result2}")
    
    print("OK")
finally:
    os.unlink(test_file)`,
    solutionCode: `def sum_file(path: str) -> int:
    """Sum integers from file, ignoring bad lines."""
    total = 0
    try:
        with open(path, 'r') as file:
            for line in file:
                try:
                    number = int(line.strip())
                    total += number
                except ValueError:
                    # Ignore lines that can't be converted to int
                    continue
    except FileNotFoundError:
        # Return 0 if file doesn't exist
        return 0
    
    return total

if __name__ == "__main__":
    filename = input("File path: ")
    result = sum_file(filename)
    print(f"Sum: {result}")`,
    metadata: {
      difficulty: ExerciseDifficulty.ADVANCED,
      topics: ['file-io', 'exception-handling', 'parsing', 'error-recovery'],
      estimatedTime: 35,
      concepts: [PythonConcept.FILE_IO, PythonConcept.EXCEPTION_HANDLING, PythonConcept.FUNCTIONS]
    }
  },
  {
    id: 'E8_ops_module',
    title: 'Operations module',
    instructions: `# E8_ops_module: Operations module (modules)

Implement mathematical operations in a module structure with \`add\`, \`subtract\`, \`multiply\`, \`divide\` functions.

## Requirements
- Implement basic arithmetic operations
- Handle division by zero gracefully
- Create reusable module functions
- Include proper documentation

## Functions to implement:
- \`add(a, b)\`: Addition
- \`subtract(a, b)\`: Subtraction  
- \`multiply(a, b)\`: Multiplication
- \`divide(a, b)\`: Division (handle zero)

## Example
\`\`\`python
add(5, 3) # Returns 8
divide(10, 2) # Returns 5.0
divide(10, 0) # Returns None or raises exception
\`\`\``,
    starterCode: `def add(a, b):
    """Add two numbers."""
    # TODO: Implement this function
    raise NotImplementedError

def subtract(a, b):
    """Subtract b from a."""
    # TODO: Implement this function
    raise NotImplementedError

def multiply(a, b):
    """Multiply two numbers."""
    # TODO: Implement this function
    raise NotImplementedError

def divide(a, b):
    """Divide a by b. Handle division by zero."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    x, y = 10, 5
    print(f"Add: {add(x, y)}")
    print(f"Subtract: {subtract(x, y)}")
    print(f"Multiply: {multiply(x, y)}")
    print(f"Divide: {divide(x, y)}")`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

# Test basic operations
check(starter.add(5, 3) == 8, "Add test failed")
check(starter.subtract(10, 4) == 6, "Subtract test failed")
check(starter.multiply(6, 7) == 42, "Multiply test failed")
check(starter.divide(15, 3) == 5.0, "Divide test failed")

# Test division by zero
try:
    result = starter.divide(10, 0)
    check(result is None, "Division by zero should return None")
except ZeroDivisionError:
    # Also acceptable to raise exception
    pass

print("OK")`,
    solutionCode: `def add(a, b):
    """Add two numbers."""
    return a + b

def subtract(a, b):
    """Subtract b from a."""
    return a - b

def multiply(a, b):
    """Multiply two numbers."""
    return a * b

def divide(a, b):
    """Divide a by b. Handle division by zero."""
    if b == 0:
        return None  # or raise ZeroDivisionError("Cannot divide by zero")
    return a / b

if __name__ == "__main__":
    x, y = 10, 5
    print(f"Add: {add(x, y)}")
    print(f"Subtract: {subtract(x, y)}")
    print(f"Multiply: {multiply(x, y)}")
    print(f"Divide: {divide(x, y)}")
    print(f"Divide by zero: {divide(x, 0)}")`,
    metadata: {
      difficulty: ExerciseDifficulty.ADVANCED,
      topics: ['modules', 'multiple-functions', 'error-handling', 'code-organization'],
      estimatedTime: 25,
      concepts: [PythonConcept.FUNCTIONS, PythonConcept.MODULES, PythonConcept.EXCEPTION_HANDLING]
    }
  },
  {
    id: 'E9_bug_hunt',
    title: 'Bug hunt - String list sum',
    instructions: `# E9_bug_hunt: Bug hunt (debugging)

Implement \`sum_list_str(nums: list[str]) -> int\` that converts string numbers to integers and returns their sum.

## Requirements
- Take a list of string numbers
- Convert each string to integer
- Return the sum of all integers
- Handle invalid strings gracefully

## Example
\`\`\`python
sum_list_str(["1", "2", "3"]) # Returns 6
sum_list_str(["10", "invalid", "20"]) # Returns 30 (ignores "invalid")
sum_list_str([]) # Returns 0
\`\`\`

## Debugging Tips
- Check for empty lists
- Handle conversion errors
- Verify string-to-int conversion
- Test edge cases`,
    starterCode: `def sum_list_str(nums: list[str]) -> int:
    """Sum a list of string numbers, ignoring invalid entries."""
    # TODO: Implement this function
    # Be careful with string-to-int conversion!
    raise NotImplementedError

if __name__ == "__main__":
    test_list = input("Enter numbers separated by commas: ").split(',')
    result = sum_list_str(test_list)
    print(f"Sum: {result}")`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

# Test basic case
result1 = starter.sum_list_str(["1", "2", "3"])
check(result1 == 6, f"Expected 6, got {result1}")

# Test with invalid strings
result2 = starter.sum_list_str(["10", "invalid", "20"])
check(result2 == 30, f"Expected 30, got {result2}")

# Test empty list
result3 = starter.sum_list_str([])
check(result3 == 0, f"Expected 0, got {result3}")

# Test all invalid
result4 = starter.sum_list_str(["abc", "xyz"])
check(result4 == 0, f"Expected 0 for all invalid, got {result4}")

print("OK")`,
    solutionCode: `def sum_list_str(nums: list[str]) -> int:
    """Sum a list of string numbers, ignoring invalid entries."""
    total = 0
    for num_str in nums:
        try:
            # Strip whitespace and convert to int
            number = int(num_str.strip())
            total += number
        except (ValueError, TypeError):
            # Ignore invalid strings
            continue
    return total

if __name__ == "__main__":
    test_list = input("Enter numbers separated by commas: ").split(',')
    result = sum_list_str(test_list)
    print(f"Sum: {result}")`,
    metadata: {
      difficulty: ExerciseDifficulty.ADVANCED,
      topics: ['debugging', 'string-conversion', 'error-handling', 'list-processing'],
      estimatedTime: 20,
      concepts: [PythonConcept.LISTS, PythonConcept.STRINGS, PythonConcept.EXCEPTION_HANDLING, PythonConcept.FUNCTIONS]
    }
  }
];

// Export individual exercises
export const E7_sum_numbers = exercises.find(e => e.id === 'E7_sum_numbers')!;
export const E8_ops_module = exercises.find(e => e.id === 'E8_ops_module')!;
export const E9_bug_hunt = exercises.find(e => e.id === 'E9_bug_hunt')!;