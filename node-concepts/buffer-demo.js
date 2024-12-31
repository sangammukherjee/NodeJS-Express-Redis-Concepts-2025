//objects -> handle binary data
//file system operations, cryptography, image processing

const buffOne = Buffer.alloc(10); //allocate a buffer of 10 bytes -> zeros
console.log(buffOne);

const buffFromString = Buffer.from("Hello");
console.log(buffFromString);

const buffFromArrayOfintegers = Buffer.from([1, 2, 3, 4, 5, 0]);
console.log(buffFromArrayOfintegers);

buffOne.write("Sangam");
console.log("After writing Node js to buffOne", buffOne.toString());

console.log(buffFromString[0]);

console.log(buffFromString.slice(0, 3));

const concatBuffs = Buffer.concat([buffOne, buffFromString]);
console.log(concatBuffs);

console.log(concatBuffs.toJSON());
