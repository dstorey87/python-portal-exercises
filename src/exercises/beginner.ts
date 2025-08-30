import { Exercise, ExerciseDifficulty, PythonConcept } from '@python-portal/types';

// =============================================================================
// EXERCISE DEFINITIONS
// All 17 Python Learning Exercises
// =============================================================================

export const exercises: Exercise[] = [
  {
    id: 'E0_greet',
    title: 'Greet by name',
    instructions: `# E0_greet: Greet by name (functions + f-strings)

Implement \`greet(name: str) -> str\` that returns \`Hello, <Name>!\` with the first letter capitalized.

## Requirements
- Function should take a string parameter \`name\`
- Return greeting with name capitalized (first letter upper, rest lower)
- Use f-string formatting

## Example
\`\`\`python
greet("alice") # Returns "Hello, Alice!"
greet("BOB") # Returns "Hello, Bob!"
\`\`\``,
    starterCode: `def greet(name: str) -> str:
    """Return 'Hello, <Name>!' with the name capitalized (first letter upper, rest lower)."""
    return f"Hello, {name.capitalize()}!"

if __name__ == "__main__":
    n = input("Your name: ")
    print(greet(n))`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

cases = {"ada": "Hello, Ada!", "ALAN": "Hello, Alan!", "tOm": "Hello, Tom!"}
for inp, exp in cases.items():
    out = starter.greet(inp)
    check(out == exp, f"Expected {exp!r}, got {out!r}")
print("OK")`,
    solutionCode: `def greet(name: str) -> str:
    """Return 'Hello, <Name>!' with the name capitalized."""
    return f"Hello, {name.capitalize()}!"

if __name__ == "__main__":
    n = input("Your name: ")
    print(greet(n))`,
    metadata: {
      difficulty: ExerciseDifficulty.BEGINNER,
      topics: ['functions', 'strings', 'f-strings'],
      estimatedTime: 10,
      concepts: [PythonConcept.FUNCTIONS, PythonConcept.STRINGS]
    }
  },
  {
    id: 'E1_seconds_to_hms',
    title: 'Convert seconds to hours:minutes:seconds',
    instructions: `# E1_seconds_to_hms: Time conversion

Implement \`seconds_to_hms(seconds: int) -> str\` that converts seconds to HH:MM:SS format.

## Requirements
- Take integer seconds as input
- Return string in "HH:MM:SS" format
- Use zero-padding for single digits

## Example
\`\`\`python
seconds_to_hms(3661) # Returns "01:01:01"
seconds_to_hms(3600) # Returns "01:00:00"
\`\`\``,
    starterCode: `def seconds_to_hms(seconds: int) -> str:
    """Convert seconds to HH:MM:SS format."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    s = int(input("Seconds: "))
    print(seconds_to_hms(s))`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

cases = {3661: "01:01:01", 3600: "01:00:00", 90: "00:01:30", 0: "00:00:00"}
for inp, exp in cases.items():
    out = starter.seconds_to_hms(inp)
    check(out == exp, f"Expected {exp!r}, got {out!r}")
print("OK")`,
    solutionCode: `def seconds_to_hms(seconds: int) -> str:
    """Convert seconds to HH:MM:SS format."""
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60
    return f"{hours:02d}:{minutes:02d}:{secs:02d}"

if __name__ == "__main__":
    s = int(input("Seconds: "))
    print(seconds_to_hms(s))`,
    metadata: {
      difficulty: ExerciseDifficulty.BEGINNER,
      topics: ['arithmetic', 'string-formatting', 'time-conversion'],
      estimatedTime: 15,
      concepts: [PythonConcept.FUNCTIONS, PythonConcept.ARITHMETIC, PythonConcept.STRINGS]
    }
  },
  {
    id: 'E1_tip_calc',
    title: 'Tip calculator',
    instructions: `# E1_tip_calc: Tip calculator

Implement \`calculate_tip(bill: float, tip_percent: float) -> float\` that calculates tip amount.

## Requirements
- Take bill amount and tip percentage
- Return tip amount rounded to 2 decimal places
- Handle edge cases (negative values)

## Example
\`\`\`python
calculate_tip(50.0, 20.0) # Returns 10.0
calculate_tip(100.0, 15.0) # Returns 15.0
\`\`\``,
    starterCode: `def calculate_tip(bill: float, tip_percent: float) -> float:
    """Calculate tip amount based on bill and tip percentage."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    bill = float(input("Bill amount: "))
    tip_pct = float(input("Tip percentage: "))
    print(f"Tip: ${calculate_tip(bill, tip_pct):.2f}")`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

cases = {(50.0, 20.0): 10.0, (100.0, 15.0): 15.0, (25.50, 18.0): 4.59}
for (bill, tip_pct), exp in cases.items():
    out = starter.calculate_tip(bill, tip_pct)
    check(abs(out - exp) < 0.01, f"Expected {exp}, got {out}")
print("OK")`,
    solutionCode: `def calculate_tip(bill: float, tip_percent: float) -> float:
    """Calculate tip amount based on bill and tip percentage."""
    if bill < 0 or tip_percent < 0:
        return 0.0
    return round(bill * tip_percent / 100, 2)

if __name__ == "__main__":
    bill = float(input("Bill amount: "))
    tip_pct = float(input("Tip percentage: "))
    print(f"Tip: ${calculate_tip(bill, tip_pct):.2f}")`,
    metadata: {
      difficulty: ExerciseDifficulty.BEGINNER,
      topics: ['arithmetic', 'rounding', 'input-validation'],
      estimatedTime: 12,
      concepts: [PythonConcept.FUNCTIONS, PythonConcept.ARITHMETIC]
    }
  },
  {
    id: 'E2_initials',
    title: 'Extract initials from name',
    instructions: `# E2_initials: Extract initials

Implement \`get_initials(name: str) -> str\` that returns initials from a full name.

## Requirements
- Extract first letter of each word
- Return uppercase initials separated by dots
- Handle multiple spaces between words

## Example
\`\`\`python
get_initials("John Doe") # Returns "J.D."
get_initials("mary jane watson") # Returns "M.J.W."
\`\`\``,
    starterCode: `def get_initials(name: str) -> str:
    """Extract initials from a full name."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    name = input("Full name: ")
    print(get_initials(name))`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

cases = {"John Doe": "J.D.", "mary jane watson": "M.J.W.", "A": "A."}
for inp, exp in cases.items():
    out = starter.get_initials(inp)
    check(out == exp, f"Expected {exp!r}, got {out!r}")
print("OK")`,
    solutionCode: `def get_initials(name: str) -> str:
    """Extract initials from a full name."""
    words = name.strip().split()
    initials = [word[0].upper() for word in words if word]
    return ".".join(initials) + "."

if __name__ == "__main__":
    name = input("Full name: ")
    print(get_initials(name))`,
    metadata: {
      difficulty: ExerciseDifficulty.BEGINNER,
      topics: ['string-manipulation', 'list-comprehension', 'splitting'],
      estimatedTime: 18,
      concepts: [PythonConcept.STRINGS, PythonConcept.LISTS, PythonConcept.FUNCTIONS]
    }
  },
  {
    id: 'E2_username_slug',
    title: 'Create URL-safe username',
    instructions: `# E2_username_slug: Username slug

Implement \`create_username_slug(name: str) -> str\` that creates a URL-safe username.

## Requirements
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters (keep letters, numbers, hyphens)
- Remove consecutive hyphens

## Example
\`\`\`python
create_username_slug("John Doe") # Returns "john-doe"
create_username_slug("Alice@123!") # Returns "alice123"
\`\`\``,
    starterCode: `def create_username_slug(name: str) -> str:
    """Create a URL-safe username slug."""
    # TODO: Implement this function
    raise NotImplementedError

if __name__ == "__main__":
    name = input("Name: ")
    print(create_username_slug(name))`,
    testCode: `import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

cases = {"John Doe": "john-doe", "Alice@123!": "alice123", "  Bob  Smith  ": "bob-smith"}
for inp, exp in cases.items():
    out = starter.create_username_slug(inp)
    check(out == exp, f"Expected {exp!r}, got {out!r}")
print("OK")`,
    solutionCode: `import re

def create_username_slug(name: str) -> str:
    """Create a URL-safe username slug."""
    # Convert to lowercase and replace spaces with hyphens
    slug = name.lower().replace(' ', '-')
    # Remove non-alphanumeric characters except hyphens
    slug = re.sub(r'[^a-z0-9-]', '', slug)
    # Replace multiple consecutive hyphens with single hyphen
    slug = re.sub(r'-+', '-', slug)
    # Remove leading/trailing hyphens
    return slug.strip('-')

if __name__ == "__main__":
    name = input("Name: ")
    print(create_username_slug(name))`,
    metadata: {
      difficulty: ExerciseDifficulty.BEGINNER,
      topics: ['regex', 'string-manipulation', 'url-slugs'],
      estimatedTime: 25,
      concepts: [PythonConcept.STRINGS, PythonConcept.REGEX, PythonConcept.FUNCTIONS]
    }
  }
];

// Export individual exercises for specific imports
export const E0_greet = exercises.find(e => e.id === 'E0_greet')!;
export const E1_seconds_to_hms = exercises.find(e => e.id === 'E1_seconds_to_hms')!;
export const E1_tip_calc = exercises.find(e => e.id === 'E1_tip_calc')!;
export const E2_initials = exercises.find(e => e.id === 'E2_initials')!;
export const E2_username_slug = exercises.find(e => e.id === 'E2_username_slug')!;