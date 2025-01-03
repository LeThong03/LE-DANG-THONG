/**
 * Approach 1: Using for loop
 * Time complexity: O(n)
 * Space complexity: O(1)
 * Pros: 
 * - Simple and straightforward implementation
 * - Good for small to medium values of n
 * - No risk of stack overflow
 * 
 * Cons:
 * - Linear time complexity
 */
function sum_to_n_a(n: number): number {
    // Handle negative numbers
    if (n < 0) return 0;
    
    // Convert floating points to integers
    n = Math.floor(n);
    
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Approach 2: using Gauss's summation
 * Time complexity: O(1)
 * Space complexity: O(1)
 * Pros:
 * - Most efficient implementation
 * - Constant time regardless of input size
 * - Mathematically elegant
 * 
 * Cons:
 * - Might be less intuitive for maintenance
 * - Could have floating-point precision issues for very large numbers
 */
function sum_to_n_b(n: number): number {
    // Handle negative numbers
    if (n < 0) return 0;
    
    // Convert floating points to integers
    n = Math.floor(n);
    
    return (n * (n + 1)) / 2;
}

/**
 * Approach 3: Recursive approach
 * Time Complexity: O(n) 
 * Space Complexity: O(n) 
 * 
 * Pros:
 * - Good for functional programming paradigms
 * - Easy to understand the mathematical relationship
 * 
 * Cons:
 * - Less efficient due to call stack overhead
 * - Risk of stack overflow for large values of n
 * - Uses more memory than iterative approach
 */
function sum_to_n_c(n: number): number {
    // Handle negative numbers
    if (n < 0) return 0;
    
    // Convert floating points to integers
    n = Math.floor(n);
    
    // Helper function for tail-call optimization
    function sumHelper(current: number, acc: number): number {
        if (current <= 1) return acc + current;
        return sumHelper(current - 1, acc + current);
    }
    
    return sumHelper(n, 0);
}

// Define types for test cases and results
interface TestCase {
    input: number | string | boolean;
    expected: number;
    description: string;
}

interface Results {
    [key: string]: number;  // Index signature for results object
}

// Comprehensive test suite
function runTests() {
    const testCases = [
        // Basic cases
        { input: 5, expected: 15, description: "Basic positive integer" },
        { input: 1, expected: 1, description: "Minimum positive case" },
        { input: 0, expected: 0, description: "Zero case" },
        
        // Edge cases
        { input: -1, expected: 0, description: "Negative number" },
        { input: 1000, expected: 500500, description: "Large number" },
        { input: 5.7, expected: 15, description: "Floating point" },
        { input: -5.7, expected: 0, description: "Negative floating point" },
        
        // Type coercion cases
        { input: "5" as any, expected: 15, description: "String number" },
        { input: true as any, expected: 1, description: "Boolean true" },
        { input: false as any, expected: 0, description: "Boolean false" },
        
        // Special cases
        { input: NaN, expected: 0, description: "NaN" },
        { input: Infinity, expected: 0, description: "Infinity" },
        { input: -Infinity, expected: 0, description: "Negative Infinity" }
    ];

    testCases.forEach(({ input, expected, description }) => {
        console.log(`\nTesting: ${description} (input: ${input})`);
        
        // Test all three implementations
        const results: Results = {
            a: sum_to_n_a(input as number),
            b: sum_to_n_b(input as number),
            c: sum_to_n_c(input as number)
        };
        
        // Verify results
        Object.keys(results).forEach((impl) => {
            const result = results[impl];
            const passed = result === expected;
            console.log(
                `Approach ${impl.toUpperCase()}: ${result} ` +
                `${passed ? '✓' : '✗'} ${!passed ? `(Expected: ${expected})` : ''}`
            );
        });
    });
}

// Run the tests
runTests();

// Additional safety checks for very large numbers
console.log("\nTesting large number safety:");
const largeN = Number.MAX_SAFE_INTEGER;
console.log(`MAX_SAFE_INTEGER: ${largeN}`);
console.log(`Approach A: ${sum_to_n_a(largeN)}`);
console.log(`Approach B: ${sum_to_n_b(largeN)}`);
console.log(`Approach C: ${sum_to_n_c(largeN)}`);
