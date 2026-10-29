/** Exercise 01 - Coins **/

// Add your function here
/**
 * Converts a dollar amount into the minimum number of coins.
 */
const calculateChange = (amount) => {
  // Convert amount to cents to avoid floating point precision issues
  let cents = Math.round(Number(amount) * 100);

  const dollars = Math.floor(cents / 100);
  cents %= 100;

  const quarters = Math.floor(cents / 25);
  cents %= 25;

  const dimes = Math.floor(cents / 10);
  cents %= 10;

  const nickels = Math.floor(cents / 5);
  cents %= 5;

  const pennies = cents;

  // Use template strings instead of concatenation as per style guide
  console.log(
    `$${amount.toFixed(2)} should return ${dollars} dollars, ${quarters} quarters, ${dimes} dimes, ${nickels} nickels, and ${pennies} pennies.`,
  );
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
// --- Test Cases ---
// Provided Example
console.log(calculateChange(4.62));
// Additional Tests & Edge Cases
console.log(calculateChange(0.0)); // Edge case: $0
console.log(calculateChange(100.0)); // Edge case: Maximum allowed limit
console.log(calculateChange(0.99)); // Edge case: Maximum coins without triggering a dollar
console.log(calculateChange(3.14)); // Standard random test
