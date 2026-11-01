// Занятие 22: учебный проект с ошибкой.
// Преподаватель знает ошибку, участники её ищут и исправляют.

function average(nums) {
  let sum = 0;
  for (let i = 0; i <= nums.length; i++) {
    sum += nums[i];
  }
  return sum / nums.length;
}

function maxScore(nums) {
  let max = nums[0];
  for (const n of nums) {
    if (n > max) max = n;
  }
  return max;
}

module.exports = { average, maxScore };
