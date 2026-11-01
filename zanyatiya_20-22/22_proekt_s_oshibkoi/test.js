// Запуск: node test.js
const { average, maxScore } = require("./stats.js");

const cases = [
  { name: "average обычный список", got: average([5, 4, 3]), want: 4 },
  { name: "average один элемент", got: average([7]), want: 7 },
  { name: "maxScore обычный список", got: maxScore([3, 9, 5]), want: 9 },
];

let failed = 0;
for (const c of cases) {
  const ok = c.got === c.want;
  if (!ok) failed++;
  console.log(`${ok ? "OK  " : "FAIL"} ${c.name}: получено ${c.got}, ожидалось ${c.want}`);
}
console.log(failed === 0 ? "Все тесты пройдены." : `Провалено тестов: ${failed}.`);
