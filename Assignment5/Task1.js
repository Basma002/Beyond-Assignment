// Task 1: Array Destructuring
const numbers = [10, 20, 30];
const [first, second, third] = numbers;

console.log("First:", first);
console.log("Second:", second); 
console.log("Rest:", third); 

// Task 2: Spread Operator
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const mergedArray = [...array1, ...array2];

console.log("Merged Array:", mergedArray); 

const object1 = { name: "Basma", age: 22 };
const object2 = { location: "Riyadh", profession: "Engineer" };
const mergedObject = { ...object1, ...object2 };

console.log("Merged Object:", mergedObject);

// Task 3: Arrow Function to Filter Out Even Numbers
const filterOddNumbers = (arr) => arr.filter((num) => num % 2 !== 0);

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const oddNumbers = filterOddNumbers(nums);

console.log("Odd Numbers:", oddNumbers); 
