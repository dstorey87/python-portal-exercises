import starter

def check(cond, msg):
    if not cond:
        raise AssertionError(msg)

# Test cases covering different input patterns
test_cases = {
    "ada": "Hello, Ada!",
    "ALAN": "Hello, Alan!", 
    "tOm": "Hello, Tom!",
    "mary-jane": "Hello, Mary-jane!",
    "123test": "Hello, 123test!",
    "x": "Hello, X!"
}

for input_name, expected_output in test_cases.items():
    actual_output = starter.greet(input_name)
    check(actual_output == expected_output, 
          f"greet('{input_name}') expected '{expected_output}', got '{actual_output}'")

print("All tests passed! ✓")