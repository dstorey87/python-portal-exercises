import { Exercise, ExerciseDifficulty, PythonConcept } from '@python-portal/types';

// =============================================================================
// INTERMEDIATE EXERCISES (E3-E6)
// =============================================================================

export const exercises: Exercise[] = [
  {
    id: 'E3_grade_mapper',
    title: 'Grade mapper',
    instructions: `# E3_grade_mapper: Grade mapping

Implement \`get_letter_grade(score: int) -> str\` that converts numeric scores to letter grades.

## Requirements
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: 0-59
- Handle invalid scores (< 0 or > 100)

## Example
\`\`\`python
get_letter_grade(95) # Returns "A"
get_letter_grade(73) # Returns "C"
get_letter_grade(101) # Returns "Invalid"
\`\`\``,
    starterCode: `def get_letter_grade(score: int) -> str:
    """Convert numeric score to letter grade."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    score = int(input("Score: "))
    print(get_letter_grade(score))`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

cases = {95: "A", 85: "B", 75: "C", 65: "D", 55: "F", 101: "Invalid", -5: "Invalid"}
for inp, exp in cases.items():
    out = starter.get_letter_grade(inp)
    check(out == exp, f"Expected {exp!r}, got {out!r}")
print("OK")`,
    solutionCode: `def get_letter_grade(score: int) -> str:
    """Convert numeric score to letter grade."""
    if score < 0 or score > 100:
        return "Invalid"
    elif score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

if __name__ == "__main__":
    score = int(input("Score: "))
    print(get_letter_grade(score))`,
    metadata: {
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      topics: ['conditionals', 'if-elif-else', 'input-validation'],
      estimatedTime: 20,
      concepts: [PythonConcept.CONDITIONALS, PythonConcept.FUNCTIONS]
    }
  },
  {
    id: 'E3_leap_year',
    title: 'Leap year checker',
    instructions: `# E3_leap_year: Leap year logic

Implement \`is_leap_year(year: int) -> bool\` that determines if a year is a leap year.

## Rules
- Divisible by 4: leap year
- BUT if divisible by 100: not leap year
- EXCEPT if divisible by 400: leap year

## Example
\`\`\`python
is_leap_year(2024) # Returns True
is_leap_year(1900) # Returns False
is_leap_year(2000) # Returns True
\`\`\``,
    starterCode: `def is_leap_year(year: int) -> bool:
    """Determine if a year is a leap year."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    year = int(input("Year: "))
    print(f"{year} is {'a' if is_leap_year(year) else 'not a'} leap year")`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

cases = {2024: True, 1900: False, 2000: True, 2023: False, 2100: False}
for inp, exp in cases.items():
    out = starter.is_leap_year(inp)
    check(out == exp, f"Expected {exp}, got {out}")
print("OK")`,
    solutionCode: `def is_leap_year(year: int) -> bool:
    """Determine if a year is a leap year."""
    if year % 400 == 0:
        return True
    elif year % 100 == 0:
        return False
    elif year % 4 == 0:
        return True
    else:
        return False

if __name__ == "__main__":
    year = int(input("Year: "))
    print(f"{year} is {'a' if is_leap_year(year) else 'not a'} leap year")`,
    metadata: {
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      topics: ['boolean-logic', 'modulo', 'conditionals'],
      estimatedTime: 25,
      concepts: [PythonConcept.CONDITIONALS, PythonConcept.ARITHMETIC, PythonConcept.FUNCTIONS]
    }
  },
  {
    id: 'E4_fizzbuzz',
    title: 'FizzBuzz',
    instructions: `# E4_fizzbuzz: FizzBuzz (loops)

Implement \`fizzbuzz(n: int) -> list[str|int]\` that returns a list for 1..n, replacing multiples of 3→'Fizz', 5→'Buzz', both→'FizzBuzz'.

## Requirements
- Generate numbers from 1 to n (inclusive)
- Replace multiples of 3 with "Fizz"
- Replace multiples of 5 with "Buzz"
- Replace multiples of both with "FizzBuzz"
- Keep other numbers as integers

## Example
\`\`\`python
fizzbuzz(15) # Returns [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']
\`\`\``,
    starterCode: `def fizzbuzz(n: int):
    """Generate FizzBuzz sequence from 1 to n."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    n = int(input("Number: "))
    print(fizzbuzz(n))`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

result = starter.fizzbuzz(15)
expected = [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']
check(result == expected, f"Expected {expected}, got {result}")

# Test smaller case
result2 = starter.fizzbuzz(5)
expected2 = [1, 2, 'Fizz', 4, 'Buzz']
check(result2 == expected2, f"Expected {expected2}, got {result2}")

print("OK")`,
    solutionCode: `def fizzbuzz(n: int):
    """Generate FizzBuzz sequence from 1 to n."""
    result = []
    for i in range(1, n + 1):
        if i % 3 == 0 and i % 5 == 0:
            result.append('FizzBuzz')
        elif i % 3 == 0:
            result.append('Fizz')
        elif i % 5 == 0:
            result.append('Buzz')
        else:
            result.append(i)
    return result

if __name__ == "__main__":
    n = int(input("Number: "))
    print(fizzbuzz(n))`,
    metadata: {
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      topics: ['loops', 'conditionals', 'modulo', 'lists'],
      estimatedTime: 30,
      concepts: [PythonConcept.LOOPS, PythonConcept.CONDITIONALS, PythonConcept.LISTS, PythonConcept.ARITHMETIC]
    }
  },
  {
    id: 'E4_prime_checker',
    title: 'Prime number checker',
    instructions: `# E4_prime_checker: Prime checker

Implement \`is_prime(n: int) -> bool\` that determines if a number is prime.

## Requirements
- Handle edge cases (numbers ≤ 1)
- Efficient algorithm (check up to √n)
- Return boolean result

## Example
\`\`\`python
is_prime(17) # Returns True
is_prime(25) # Returns False
is_prime(2) # Returns True
\`\`\``,
    starterCode: `def is_prime(n: int) -> bool:
    """Check if a number is prime."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    n = int(input("Number: "))
    print(f"{n} is {'prime' if is_prime(n) else 'not prime'}")`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

cases = {2: True, 3: True, 4: False, 17: True, 25: False, 1: False, 0: False, -5: False}
for inp, exp in cases.items():
    out = starter.is_prime(inp)
    check(out == exp, f"Expected {exp}, got {out} for {inp}")
print("OK")`,
    solutionCode: `def is_prime(n: int) -> bool:
    """Check if a number is prime."""
    if n <= 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    # Check odd divisors up to √n
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

if __name__ == "__main__":
    n = int(input("Number: "))
    print(f"{n} is {'prime' if is_prime(n) else 'not prime'}")`,
    metadata: {
      difficulty: ExerciseDifficulty.INTERMEDIATE,
      topics: ['algorithms', 'math', 'optimization', 'loops'],
      estimatedTime: 35,
      concepts: [PythonConcept.LOOPS, PythonConcept.ARITHMETIC, PythonConcept.FUNCTIONS, PythonConcept.CONDITIONALS]
    }
  }
];

// Export individual exercises
export const E3_grade_mapper = exercises.find(e => e.id === 'E3_grade_mapper')!;
export const E3_leap_year = exercises.find(e => e.id === 'E3_leap_year')!;
export const E4_fizzbuzz = exercises.find(e => e.id === 'E4_fizzbuzz')!;
export const E4_prime_checker = exercises.find(e => e.id === 'E4_prime_checker')!;