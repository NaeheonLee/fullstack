/** Exercise 01 - Fizzbuzz

Problem: 

Given an integer n, return a string array answer (1-indexed) where:

answer[i] === "FizzBuzz" if i is divisible by 3 and 5.
answer[i] === "Fizz" if i is divisible by 3.
answer[i] === "Buzz" if i is divisible by 5.
answer[i] === i (as a string) if none of the above conditions are true.
 

Example 1:

Input: n = 3
Output: ["1","2","Fizz"]

Example 2:

Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]

Example 3:

Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

**/

/**
 * Generates an array of strings representing the FizzBuzz sequence up to a given number.
 *
 * @param {number} n - The upper limit of the sequence to generate.
 * @returns {string[]} An array containing numbers as strings, "Fizz", "Buzz", or "FizzBuzz".
 */

function fizzBuzz(n) {
  let output_array = [];

  // Loop from 1 up to and including n
  for (let i = 1; i <= n; i++) {
    // 1. Check if the value is divisible by both 3 and 5
    if (i % 3 === 0 && i % 5 === 0) {
      output_array.push("FizzBuzz");
    }
    // 2. Check if the value is divisible by 3
    else if (i % 3 === 0) {
      output_array.push("Fizz");
    }
    // 3. Check if the value is divisible by 3
    else if (i % 5 === 0) {
      output_array.push("Buzz");
    }
    // 4. Default case
    else {
      output_array.push(String(i));
    }
  }

  // 5. Return completed array
  return output_array;
}
