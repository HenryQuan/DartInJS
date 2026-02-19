import "./interop";

globalThis.functionName();
let input_list = [3, 1, 2, 4, 5, 6, 7, 8, 9, 10];
const output = globalThis.quickSort(input_list, 0, input_list.length - 1);
console.log("Sorted list: ", output);
console.log(output);

// use index
console.log("Get index 0 and 100: ");
console.log(output[0]);
console.log(output[100]);

console.log("Print out using for loop: ");
// print out using for loop
for (let i = 0; i < output.length; i++) {
  console.log(output[i]);
}

console.log("Print out using forEach: ");
// using forEach
output.forEach((element: number) => {
  console.log(element);
});

console.log("Print out using map: ");
// using map
output
  .map((element: number) => element * 2)
  .forEach((element: number) => {
    console.log(element);
  });

// try fetching data
try {
  const result =await globalThis.fetchData();
  console.log("Fetch data: ", result);
} catch (error) {
  console.error("Error fetching data: ", error);
}