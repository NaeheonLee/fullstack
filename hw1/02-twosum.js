/** Exercise 02 - Two Sum

Problem:

You are given an array of integers 'nums' and an integer 'target', write a function that returns indices of the two 
numbers such that they add up to target.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**/

/**
 * Returns the indices of two numbers in an array that add up to the target.
 * Uses a hash map to achieve O(n) time complexity.
 *
 * @param {number[]} nums - Array of integers to search.
 * @param {number} target - Target sum.
 * @returns {number[]} Array containing the two indices.
 */

function twoSum(nums, target) {
  // Map to store { number: index } for O(1) lookups
  const seenNumbers = {};

  for (let i = 0; i < nums.length; i++) {
    const currentNumber = nums[i];

    // Calculate the value needed to reach the target sum
    const neededComplement = target - currentNumber;

    // If the needed value is already in our map, we found the pair
    if (neededComplement in seenNumbers) {
      return [seenNumbers[neededComplement], i];
    }

    // Otherwise, store the current number and its index to check against future iterations
    seenNumbers[currentNumber] = i;
  }

  // Return empty array if no pair is found
  return [];
}
