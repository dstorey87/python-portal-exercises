def greet(name: str) -> str:
    """Return 'Hello, <Name>!' with the name capitalized (first letter upper, rest lower).
    
    Args:
        name: The name to greet (any string)
        
    Returns:
        A greeting string in the format "Hello, {Name}!" where {Name} has
        the first letter capitalized and the rest lowercase.
        
    Examples:
        >>> greet("ada")
        'Hello, Ada!'
        >>> greet("JOHN")
        'Hello, John!'
        >>> greet("mArY")
        'Hello, Mary!'
    """
    return f"Hello, {name.capitalize()}!"

if __name__ == "__main__":
    # Interactive mode for testing
    while True:
        try:
            name = input("Enter a name (or 'quit' to exit): ")
            if name.lower() == 'quit':
                break
            print(greet(name))
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break