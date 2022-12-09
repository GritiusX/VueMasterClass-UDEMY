// const fruits = ["Apple", "Banana", "Orange"];
// const vegetables = ["Cucumber", "Radish"];

// console.log([fruits, vegetables]);
// console.log([...fruits, vegetables]);
// console.log([...fruits, ...vegetables]);

// ------------------------------------------------------------

// const developer = {
//   salary: 100000,
//   experience: 4.5,
//   techStack: ["Vue", "HTML", "CSS"],
//   lookingForWork: true,
//   doubleSalary() {
//     this.salary = this.salary * 2;
//     this.lookingForWork = false;
//   },
// };
// console.log(developer);
// console.log(developer.techStack);
// console.log(developer.salary);
// console.log(developer.lookingForWork);

// developer.doubleSalary();
// console.log(developer.salary);
// console.log(developer.lookingForWork);

// ------------------------------------------------------------
// export const evenOrOdd = (number) => {
//   if (number % 2 === 0) {
//     return "Even";
//   } else {
//     return "Odd";
//   }
// };

// ------------------------------------------------------------
// export const multiply = (num1, num2) => {
//   // let total = 0;
//   // for (let i = 0; i < num1; i++) {
//   //   total += num2;
//   // }
//   // return total;
//   return num1 * num2;
// };

// ------------------------------------------------------------
// const numbers = [1, 2, 3, 4, 5];

// const squares = numbers.map((num) => num * num);

// console.log(squares);

// ------------------------------------------------------------

// const favoriteFood = "sushi";

// const goodFood = {
//   [favoriteFood]: true,
// };

// console.log(goodFood);

// ------------------------------------------------------------

// setTimeout does it only once, setInterval does it constantly
// but it never stops, clearInterval will make setInterval stop

// setTimeout(() => {
//   console.log("setTimeout");
// }, 2000);

// const interval = setInterval(() => {
//   console.log("SetInterval");
// }, 2000);

// setTimeout(() => {
//   clearInterval(interval);
//   console.log("Interval ended");
// }, 10000);

// console.log(interval);

// ------------------------------------------------------------

// const axios = require("axios");
// const url = "http://localhost:3000/jobs";

// const fetchJobsV1 = () => {
//   axios.get(url).then((response) => {
//     console.log(response.data);
//   });
// };
// fetchJobsV1();

// const fetchJobsV2 = async () => {
//   const response = await axios.get(url);
//   console.log(response.data);
// };

// fetchJobsV2();

// ------------------------------------------------------------

// slice an Array

// slice can have 0, 1 or 2 params =>
// with 0 params it slices the array exactly the same
// with 1 param => it makes a cut in the array, for example sushi.slice(2), it makes a cut from position 2(Yellowtail) until the end
// with 2 params => makes a cut from the position you start INCLUDED until the end position EXCLUDED,

// const sushi = [
//   "Tuna",
//   "Salmon",
//   "Yellowtail",
//   "Eel",
//   "Shrimp",
//   "Octopus",
//   "Uni",
// ];

// console.log(sushi.slice()); // [ 'Tuna', 'Salmon', 'Yellowtail', 'Eel', 'Shrimp', 'Octopus', 'Uni' ]
// console.log(sushi.slice(2)); // [ 'Yellowtail', 'Eel', 'Shrimp', 'Octopus', 'Uni' ]
// console.log(sushi.slice(2, 5)); // [ 'Yellowtail', 'Eel', 'Shrimp' ] => as you can see here position 5 which is Octopus, is not included

// ------------------------------------------------------------
// SETS IN AN ARRAY
// const numbers = new Set(); // this creates an empty set object
// numbers.add(5);
// numbers.add(10);
// numbers.add(15);
// numbers.add(15); //we add another copy of 15

// console.log(numbers); //console log: Set(3) { 5, 10, 15 }

// ------------------------------------------------------------

// const numbers = [1, 2, 3, 5, 7, 9, 11, 6];
// console.log(numbers.filter((number) => number > 6));

// const jobs = [
//   { title: "Angular Developer", organization: "Microsoft" },
//   { title: "Programmer", organization: "Google" },
//   { title: "Developer", organization: "Microsoft" },
// ];

// console.log(jobs.filter((job) => job.organization === "Microsoft"));

// ------------------------------------------------------------
//import { ref } from "vue";
// const { ref, computed, reactive } = require("vue");

// let a = ref(1);
// let b = ref(2);
// // let c = ref(a.value + b.value);
// // console.log(c.value);

// // a.value = 10;
// // console.log(c.value);
// let c = computed(() => a.value + b.value);

// console.log(c.value);
// a.value = 10;

// console.log(c.value);

// b.value = 25;
// console.log(c.value);

// const name = ref("Boris");
// let title = computed(() => name.value + " the Great");
// console.log(title.value);

// name.value = "Guido";
// console.log(title.value);

// ----- REF OBJECTS ----
// const person = ref({
//   name: "Boris",
// });

// const title = computed(() => person.value.name + " the Great");
// console.log(title.value);

// person.value.name = "Guido";

// console.log(title.value);

// ---- REACTIVE OBJECTS ---- THE REAL WAY TO USE IT
// const person = reactive({
//   name: "Boris",
// });

// const title = computed(() => person.name + " the Great");
// console.log(title.value);

// person.name = "Guido";

// console.log(title.value);

//const { computed, reactive } = require("vue");

// const person = reactive({
//   firstName: "Boris",
//   lastName: "Paskhaver",
// });

// const title = computed(
//   () => `${person.firstName} ${person.lastName} the Great`
// );
// const titleLength = computed(() => title.value.length);
// console.log(title.value);
// console.log(titleLength.value);

// person.firstName = "Guido";
// person.lastName = "Pawluk";
// console.log(title.value);
// console.log(titleLength.value);

// ------- ToRef so you can destructure a reactive object -------
// const { computed, reactive, toRef } = require("vue");

// const person = reactive({
//   firstName: "Boris",
//   lastName: "Paskhaver",
// });

// const firstName = toRef(person, "firstName");
// const lastName = toRef(person, "lastName");

// const title = computed(() => `${firstName.value} ${lastName.value} the Great`);
// const titleLength = computed(() => title.value.length);
// console.log(title.value);
// console.log(titleLength.value);

// person.firstName = "Guido";
// person.lastName = "Pawluk";
// console.log(title.value);
// console.log(titleLength.value);

// ------- ToRefs so you can destructure a reactive object (another example) -------
// toRefs NEEDS a reactive object
// const { computed, reactive, toRefs } = require("vue");

// const person = reactive({
//   firstName: "Boris",
//   lastName: "Paskhaver",
// });

// const { firstName, lastName } = toRefs(person);

// const title = computed(() => `${firstName.value} ${lastName.value} the Great`);
// const titleLength = computed(() => title.value.length);
// console.log(title.value);
// console.log(titleLength.value);

// person.firstName = "Guido";
// person.lastName = "Pawluk";
// console.log(title.value);
// console.log(titleLength.value);

// // ------------------------------------------------------------
// import { GlobalState } from "@/store/types";

// //PARTIAL <GLOBALSTATE> MAKES EVERY PROPERTY AS OPTIONAL dont use
// const state: Partial<GlobalState> = {
//   isLoggedIn: true,
// };
// // it will still check that all the properties on the object are correct, but they're all optional
// // also you cant create new properties in this state, you have to do it in the interface