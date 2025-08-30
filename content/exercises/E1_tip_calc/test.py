import io
import sys
from unittest.mock import patch
import starter

def test_tip_calculation():
    """Test tip calculation with different inputs"""
    test_cases = [
        ("50.00\n18\n", "Tip amount: $9.00\nTotal amount: $59.00\n"),
        ("25.50\n20\n", "Tip amount: $5.10\nTotal amount: $30.60\n"),
        ("100.00\n15\n", "Tip amount: $15.00\nTotal amount: $115.00\n"),
        ("0.00\n10\n", "Tip amount: $0.00\nTotal amount: $0.00\n")
    ]
    
    for inputs, expected_output in test_cases:
        with patch('sys.stdin', io.StringIO(inputs)):
            with patch('sys.stdout', new_callable=io.StringIO) as mock_stdout:
                # Import and run the starter module
                import importlib
                importlib.reload(starter)
                
                actual_output = mock_stdout.getvalue()
                assert actual_output == expected_output, f"Expected:\n{expected_output}\nGot:\n{actual_output}"

if __name__ == "__main__":
    test_tip_calculation()
    print("All tests passed! ✓")