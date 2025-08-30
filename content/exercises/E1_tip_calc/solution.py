def calculate_tip(bill_amount: float, tip_percentage: float) -> tuple[float, float]:
    """Calculate tip and total amount.
    
    Args:
        bill_amount: The original bill amount
        tip_percentage: The tip percentage (e.g., 18 for 18%)
        
    Returns:
        A tuple of (tip_amount, total_amount)
        
    Examples:
        >>> tip, total = calculate_tip(50.0, 18)
        >>> f"{tip:.2f}", f"{total:.2f}"
        ('9.00', '59.00')
    """
    tip_amount = bill_amount * (tip_percentage / 100)
    total_amount = bill_amount + tip_amount
    return tip_amount, total_amount

def main():
    """Main program logic with input validation"""
    try:
        # Get user input with validation
        while True:
            try:
                bill_amount = float(input("Enter the bill amount: "))
                if bill_amount < 0:
                    print("Bill amount cannot be negative. Please try again.")
                    continue
                break
            except ValueError:
                print("Please enter a valid number for the bill amount.")
        
        while True:
            try:
                tip_percentage = float(input("Enter the tip percentage: "))
                if tip_percentage < 0:
                    print("Tip percentage cannot be negative. Please try again.")
                    continue
                break
            except ValueError:
                print("Please enter a valid number for the tip percentage.")
        
        # Calculate tip and total
        tip_amount, total_amount = calculate_tip(bill_amount, tip_percentage)
        
        # Display results
        print(f"\n--- Bill Summary ---")
        print(f"Bill amount: ${bill_amount:.2f}")
        print(f"Tip ({tip_percentage}%): ${tip_amount:.2f}")
        print(f"Total amount: ${total_amount:.2f}")
        
    except KeyboardInterrupt:
        print("\nProgram cancelled by user.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()