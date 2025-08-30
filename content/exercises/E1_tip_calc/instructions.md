# E1_tip_calc: Tip Calculator

## 🎯 Objective

Create a program that calculates the tip and total amount for a restaurant bill.

## 📝 Requirements

Your program should:
1. **Ask the user** for the bill amount
2. **Ask the user** for the tip percentage
3. **Calculate the tip** amount
4. **Calculate the total** (bill + tip)
5. **Display the results** formatted to 2 decimal places

## 📚 Key Concepts

- **User Input**: Using `input()` to get data from the user
- **Type Conversion**: Converting strings to numbers with `float()`
- **Arithmetic Operations**: Addition, multiplication for calculations
- **String Formatting**: Using f-strings with decimal precision
- **Variable Assignment**: Storing calculated values

## ✨ Example Run

```
Enter the bill amount: 50.00
Enter the tip percentage: 18
Tip amount: $9.00
Total amount: $59.00
```

## 🔍 Tips

- Use `float()` to convert string input to decimal numbers
- Tip calculation: `bill_amount * (tip_percentage / 100)`
- Use `:.2f` in f-strings to format to 2 decimal places
- Test with different bill amounts and tip percentages

## 🏁 Getting Started

The starter code has the basic structure. Fill in the missing calculations and formatting!