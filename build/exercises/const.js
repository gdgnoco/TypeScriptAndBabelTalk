// Process this with Babel
// Because of the bug in the in-browser version of the TypeScript, you won't see the
// errors if you preprocess with TypeScript. Command-line TS does report the errors.
//
// Comment out each Error, one at a time and reprocess.
// 
const a = 5;
a = 3; // Error attempt to redefine name "a".
log(a);

const o = { a: "test" };

o = { b: "another" }; // Error

o.b = "another"; // NOT an Error... name "o" is not being redfined
