import { Exercise, ExerciseDifficulty, PythonConcept } from '@python-portal/types';

// =============================================================================
// MORE INTERMEDIATE EXERCISES (E5-E6)
// =============================================================================

export const exercises: Exercise[] = [
  {
    id: 'E5_math_utils',
    title: 'Math utility functions',
    instructions: `# E5_math_utils: Math utils (functions)

Implement \`square(x)\`, \`cube(x)\`, \`is_even(x)\` utility functions.

## Requirements
- \`square(x)\`: Return x squared
- \`cube(x)\`: Return x cubed
- \`is_even(x)\`: Return True if x is even, False otherwise

## Example
\`\`\`python
square(3) # Returns 9
cube(2) # Returns 8
is_even(10) # Returns True
is_even(7) # Returns False
\`\`\``,
    starterCode: `def square(x):  # TODO
    raise NotImplementedError

def cube(x):    # TODO
    raise NotImplementedError

def is_even(x): # TODO
    raise NotImplementedError

if __name__ == "__main__":
    num = int(input("Number: "))
    print(f"Square: {square(num)}")
    print(f"Cube: {cube(num)}")
    print(f"Is even: {is_even(num)}")`,
    testCode: `import starter

assert starter.square(3) == 9
assert starter.cube(2) == 8
assert starter.is_even(10) is True
assert starter.is_even(7) is False
print("OK")`,
    solutionCode: `def square(x):
    """Return x squared."""
    return x * x

def cube(x):
    """Return x cubed."""
    return x * x * x

def is_even(x):
    """Return True if x is even, False otherwise."""
    return x % 2 == 0

if __name__ == "__main__":
    num = int(input("Number: "))
    print(f"Square: {square(num)}")
    print(f"Cube: {cube(num)}")
    print(f"Is even: {is_even(num)}")`,
    metadata: {
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      topics: ['multiple-functions', 'math', 'boolean-return'],
      estimatedTime: 15,
      concepts: [PythonConcept.FUNCTIONS, PythonConcept.ARITHMETIC, PythonConcept.CONDITIONALS]
    }
  },
  {
    id: 'E5_password_strength',
    title: 'Password strength checker',
    instructions: `# E5_password_strength: Password strength

Implement \`check_password_strength(password: str) -> str\` that returns strength level.

## Requirements
- "Strong": ≥ 8 chars, has uppercase, lowercase, digit, special char
- "Medium": ≥ 6 chars, has 3 of above categories
- "Weak": Otherwise

## Example
\`\`\`python
check_password_strength("MyPass123!") # Returns "Strong"
check_password_strength("pass123") # Returns "Medium"
check_password_strength("weak") # Returns "Weak"
\`\`\``,
    starterCode: `def check_password_strength(password: str) -> str:
    """Check password strength and return level."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    pwd = input("Password: ")
    print(f"Strength: {check_password_strength(pwd)}")`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

cases = {
    "MyPass123!": "Strong",
    "pass123": "Medium", 
    "weak": "Weak",
    "PASSWORD123": "Medium",
    "Abc1@": "Weak"  # Less than 6 chars
}
for inp, exp in cases.items():
    out = starter.check_password_strength(inp)
    check(out == exp, f"Expected {exp}, got {out} for '{inp}'")
print("OK")`,
    solutionCode: `def check_password_strength(password: str) -> str:
    """Check password strength and return level."""
    if len(password) < 6:
        return "Weak"
    
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(not c.isalnum() for c in password)
    
    category_count = sum([has_upper, has_lower, has_digit, has_special])
    
    if len(password) >= 8 and category_count == 4:
        return "Strong"
    elif category_count >= 3:
        return "Medium"
    else:
        return "Weak"

if __name__ == "__main__":
    pwd = input("Password: ")
    print(f"Strength: {check_password_strength(pwd)}")`,
    metadata: {
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      topics: ['string-analysis', 'character-checks', 'complex-logic'],
      estimatedTime: 40,
      concepts: [PythonConcept.STRINGS, PythonConcept.CONDITIONALS, PythonConcept.FUNCTIONS]
    }
  },
  {
    id: 'E5_temp_convert',
    title: 'Temperature converter',
    instructions: `# E5_temp_convert: Temperature conversion

Implement \`celsius_to_fahrenheit(c: float) -> float\` and \`fahrenheit_to_celsius(f: float) -> float\`.

## Formulas
- C to F: F = C × 9/5 + 32
- F to C: C = (F - 32) × 5/9

## Example
\`\`\`python
celsius_to_fahrenheit(0) # Returns 32.0
fahrenheit_to_celsius(212) # Returns 100.0
\`\`\``,
    starterCode: `def celsius_to_fahrenheit(c: float) -> float:
    """Convert Celsius to Fahrenheit."""
    # TODO: Implement this function
    raise NotImplementedError

def fahrenheit_to_celsius(f: float) -> float:
    """Convert Fahrenheit to Celsius."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    temp = float(input("Temperature: "))
    unit = input("Unit (C/F): ").upper()
    if unit == 'C':
        print(f"{temp}°C = {celsius_to_fahrenheit(temp)}°F")
    else:
        print(f"{temp}°F = {fahrenheit_to_celsius(temp)}°C")`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

# Test Celsius to Fahrenheit
check(abs(starter.celsius_to_fahrenheit(0) - 32.0) < 0.1, "0C should be 32F")
check(abs(starter.celsius_to_fahrenheit(100) - 212.0) < 0.1, "100C should be 212F")

# Test Fahrenheit to Celsius
check(abs(starter.fahrenheit_to_celsius(32) - 0.0) < 0.1, "32F should be 0C")
check(abs(starter.fahrenheit_to_celsius(212) - 100.0) < 0.1, "212F should be 100C")

print("OK")`,
    solutionCode: `def celsius_to_fahrenheit(c: float) -> float:
    """Convert Celsius to Fahrenheit."""
    return c * 9/5 + 32

def fahrenheit_to_celsius(f: float) -> float:
    """Convert Fahrenheit to Celsius."""
    return (f - 32) * 5/9

if __name__ == "__main__":
    temp = float(input("Temperature: "))
    unit = input("Unit (C/F): ").upper()
    if unit == 'C':
        print(f"{temp}°C = {celsius_to_fahrenheit(temp):.1f}°F")
    else:
        print(f"{temp}°F = {fahrenheit_to_celsius(temp):.1f}°C")`,
    metadata: {
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      topics: ['unit-conversion', 'math-formulas', 'multiple-functions'],
      estimatedTime: 20,
      concepts: [PythonConcept.FUNCTIONS, PythonConcept.ARITHMETIC]
    }
  },
  {
    id: 'E6_set_ops',
    title: 'Set operations',
    instructions: `# E6_set_ops: Set operations (sets)

Implement \`set_ops(a: list[str], b: list[str]) -> dict\` returning dict with keys: 'union', 'inter', 'a_minus_b', 'b_minus_a' containing respective set operations.

## Requirements
- Convert lists to sets
- Return dictionary with set operation results
- Handle duplicates in input lists

## Example
\`\`\`python
set_ops(['a', 'b', 'c'], ['b', 'c', 'd'])
# Returns {
#   'union': {'a', 'b', 'c', 'd'},
#   'inter': {'b', 'c'},
#   'a_minus_b': {'a'},
#   'b_minus_a': {'d'}
# }
\`\`\``,
    starterCode: `def set_ops(a: list[str], b: list[str]) -> dict:
    """Perform set operations on two lists."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    list_a = input("List A (comma-separated): ").split(',')
    list_b = input("List B (comma-separated): ").split(',')
    result = set_ops(list_a, list_b)
    for key, value in result.items():
        print(f"{key}: {value}")`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

result = starter.set_ops(['a', 'b', 'c'], ['b', 'c', 'd'])
expected = {
    'union': {'a', 'b', 'c', 'd'},
    'inter': {'b', 'c'},
    'a_minus_b': {'a'},
    'b_minus_a': {'d'}
}

for key, exp_value in expected.items():
    check(key in result, f"Missing key: {key}")
    check(result[key] == exp_value, f"Expected {key}: {exp_value}, got {result[key]}")

print("OK")`,
    solutionCode: `def set_ops(a: list[str], b: list[str]) -> dict:
    """Perform set operations on two lists."""
    set_a = set(a)
    set_b = set(b)
    
    return {
        'union': set_a | set_b,        # Union
        'inter': set_a & set_b,        # Intersection
        'a_minus_b': set_a - set_b,    # Difference A - B
        'b_minus_a': set_b - set_a     # Difference B - A
    }

if __name__ == "__main__":
    list_a = input("List A (comma-separated): ").strip().split(',')
    list_b = input("List B (comma-separated): ").strip().split(',')
    result = set_ops(list_a, list_b)
    for key, value in result.items():
        print(f"{key}: {sorted(value) if value else 'empty'}")`,
    metadata: {
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      topics: ['sets', 'set-operations', 'data-structures'],
      estimatedTime: 25,
      concepts: [PythonConcept.SETS, PythonConcept.FUNCTIONS, PythonConcept.DICTIONARIES]
    }
  }
];

// Export individual exercises
export const E5_math_utils = exercises.find(e => e.id === 'E5_math_utils')!;
export const E5_password_strength = exercises.find(e => e.id === 'E5_password_strength')!;
export const E5_temp_convert = exercises.find(e => e.id === 'E5_temp_convert')!;
export const E6_set_ops = exercises.find(e => e.id === 'E6_set_ops')!;