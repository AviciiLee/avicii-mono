const symid = Symbol("productno");
interface Person {
  name: string;
  [symid]: number | string;
}

// type S = Person[typeof symid];
type PKeys = keyof Person;
let pkeys: PKeys = "name";

let a: number;
let obj = { username: "avicii", age: 28 };
const username = "username";
obj[username] = "avicii";
