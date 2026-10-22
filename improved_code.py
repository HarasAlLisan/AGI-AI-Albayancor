```python
import random

def generate_random_integers(n):
    return [random.randint(0, 100) for _ in range(n)]

def calculate_sum(numbers):
    total = sum(numbers)
    return total

if __name__ == "__main__":
    try:
        n = int(input("Enter the number of integers: "))
        if not isinstance(n, int):
            raise ValueError("Input should be an integer.")
        
        random_numbers = generate_random_integers(n)
        print(f"Random numbers generated between 0 and 100: {random_numbers[15D[K
{random_numbers}")
    except ValueError as e:
        print(f"Error: