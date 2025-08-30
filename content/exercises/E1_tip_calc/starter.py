# Get user input
bill_amount = float(input("Enter the bill amount: "))
tip_percentage = float(input("Enter the tip percentage: "))

# Calculate tip and total
tip_amount = bill_amount * (tip_percentage / 100)
total_amount = bill_amount + tip_amount

# Display results
print(f"Tip amount: ${tip_amount:.2f}")
print(f"Total amount: ${total_amount:.2f}")