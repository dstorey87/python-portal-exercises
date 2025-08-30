# E0_greet: Greet by Name

## 🎯 Objective

Implement a function called `greet(name: str) -> str` that returns a personalized greeting with proper capitalization.

## 📝 Requirements

Your function should:
1. **Accept a name parameter** as a string
2. **Return a greeting** in the format: `"Hello, {Name}!"`
3. **Capitalize the name** so the first letter is uppercase and the rest are lowercase
4. **Use f-string formatting** for the output

## 📚 Key Concepts

- **Functions**: Reusable blocks of code that accept parameters and return values
- **f-strings**: Modern Python string formatting using `f"text {variable}"`  
- **String methods**: Built-in methods like `.capitalize()` for text manipulation
- **Type hints**: Specify parameter and return types for better code documentation

## ✨ Examples

```python
greet("ada")      # Returns: "Hello, Ada!"
greet("ALAN")     # Returns: "Hello, Alan!"
greet("tOm")      # Returns: "Hello, Tom!"
greet("mary-jane") # Returns: "Hello, Mary-jane!"
```

## 🔍 Tips

- The `.capitalize()` method makes the first character uppercase and the rest lowercase
- f-strings use curly braces `{}` to embed expressions inside strings
- Remember to include the exclamation mark in your greeting
- Test your function with different capitalization patterns

## 🏁 Getting Started

The starter code provides the function signature and a simple test. Complete the function body to make all tests pass!