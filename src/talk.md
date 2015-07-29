class: center, middle

# TypeScript (and Babel) - why you should use them now

&nbsp;&nbsp;Brian Sturgill

&nbsp;&nbsp;codersnext@gmail.com

---

##  Overview of our development environment.
  * Running beta of TypeScript: 1.5.3
  * Babel is latest stable version: 5.6.14
  * To manipulate slides, click the slide, then use arrow keys.
  * In all four sections make sure you click first.
	* Alas, TypeScript type checking is not working (does work in command-line version).

---

## Some definitions
* ECMAScript is the "standards" name of JavaScript.
* Version 6 (ES6) was just approved.
* Version 5 (ES5) is the version that implemented in IE 9 and newer browsers.
* Version 3 (ES3) is the version that preceeded ES5.
* (Version 4 "Harmony" was never approved. TypeScript has much of the flavor of "Harmony".)
* Version 6 (ES6) is now officially called ES2015... they didn't think people were confused enough.

A "transpiler" is a program that translates one programming language to another. Babel, TypeScript and CoffeeScript are examples of transpilers to JavaScript.

---

## When can I use these things?

* Almost everything I'm showing in Babel is ready for production use now.
* The exception in Babel is the async/await feature (from ES7) which needs the `--experimental` flag turned on. In my opinion it is ready for production use. The `--experimental` flag here really is just an indication that it is not as far along in the standards process. This feature of ES7 is not controversial, so there should be no problem in adopting it.
* The ES6 features I'm showing are in TypeScript 1.5 which is currently in beta, but should release very soon.
* The async/await feature is scheduled for TypeScript 1.6 (by the end of the year). However, version 1.5.3 which I'm using here today has the feature implemented if you are using ES6 as the target language, so I'm expecting that it will be there for ES6 in the release of 1.5. (Should occur within a month or so.)

---

## What is Babel?
Babel's mission: transpile as many future features of ECMAScript to stable versions of ES as can be usefully implemented.

In their next major versions TypeScript, (possibly) CoffeeScript and many other JS transpilers will begin to target ES6 only. Babel will then be used on the transpiler output, to target earlier versions of ECMAScript.

When to use Babel:
* Experimental features. (e.g. ES7 features)
* ES6 features that have larger overhead. [Babel Caveats](http://babeljs.io/docs/advanced/caveats/)
* Babel provides great granularity w.r.t. to what features are transformed.

According to Babel's author "Babel" is [pronounced like the word "babble"](https://twitter.com/sebmck/status/609029387028193280).

---

## What is TypeScript?
TypeScript's mission: Provide JavaScript features needed in large projects.

* TypeScript is a strict super-set of ECMAScript 5.
* TypeScript only implements ES6 features that can be directly generated with small overhead. 
* When needed for large projects, TypeScript provides features that are not fully standardized.
* Granularity is at the level of ECMAScript specification. (Currently ES6, ES5 and ES3.)

IMPORTANT: I will be showing you TypeScript as it will stand in TypeScript 1.5 (and one thing in 1.6).

---

## Why use Babel and TypeScript on the same file?
* You want to selectively target what features are transformed.<br>(Use `--whitelist` and `--blacklist` options to select desired subset of transformers).
* This is very helpful for use in Electron (formerly Atom Shell) apps, Firefox Open Web Apps or Chrome apps as each has only one version of one browser engine to target.
* Also for enterprise internal apps and other such situations where a small number of specific versions of browsers can be targeted.

[List of Babel transformers](http://babeljs.io/docs/advanced/transformers/)

---

## Why use JavaScript, Babel and TypeScript together?
* Why not? In the end it is all just JavaScript. Choose the tool best suited for what you need to do. It is OK to use all three in the same project.
* To reiterate: Both Typescript and Babel are just the ES5 JavaScript you are used to with some useful extensions.
 

---

## Some ES6 features in both Babel and TypeScript

* Only a "few" because ECMAScript 6 is much bigger than ES 5.1.

---

## "let" keyword
```javascript
let a = 5;
```
The `let` keyword is a total replacement for `var`. It gives you C/C#/Java style block scoping for your variables (no more hoisting). 

Once you start using ES6 in your code, you should stop using `var` entirely. The `jshint` program has a `varstmt` option that will flag any use of  `var`.

`jslint` is working on ES6 support, but is not as far along.


---

## "const" keyword

`const` is exactly like let except that the name cannot be redfined.

Note that if `const` is used with a non-constant (e.g. object or array) those objects can still be modified.

---
## Arrow Functions

An arrow function is a less verbose syntax for functions. Their use also implies `"use strict"`.
```javascript
var f = function(a, b) { return a+b; }
```
can also be written as:
```javascript
var f = (a,b) => { return a+b };
```
or even:
```javascript
var f = (a,b) => a+b;
```
(The part after the "arrow" (`=>`) can be a block or an expression.)

---

## Solution for arrow functions exercise
```javascript
let f = (a) => a;
log(f(3));
  
setTimeout(() => log("timeout"), 10);
  
let arr = [1,2,3];
log("incremented: "+arr.map((a) => a+1));
```

---

## Template strings
* Like regular strings, but can be multi-line.
* Are delimited with backquotes (also called graves).
* Can contain expressions encased in `${ ... }` which are made into strings and inserted in line.

```javascript
var val = 2.5;
var str = `Value (+1): ${val+1.0}
Value (+1.5): ${val+1.5}
`;
log(str);
```
Produces:
```javascript
Value (+1): 3.5
Value (+1.5): 4
```

---

## Solution for template strings exercise

```javascript
var initial_val = 0;
var result_name = "Total";

var prog = `var a = ${initial_val};
var b = 5;
function f(x, y) { return x+y; }
log("${result_name}: "+f(a,b));
`;

log(prog);
```

---

## Modules

In ES6, modules are a single file of JavaScript.

To import things:
```javascript
import { abs, ceil } from "lib/math";
import abs from "lib/math";
import { abs as absolute_value } from "lib/math"; // Aliasing math.abs
import "lib/math"; // Will give you name math
import * as Math from "lib/math";
```

To export things:
```javascript
export var a;
export function....{...};
export default function () {}; // When you want a single export
export * from "lib/math"; // Essentially a way to make mult-file modules that appear as one.
```

The [syntax is actually more complicated than I'm showing](http://www.2ality.com/2014/09/es6-modules-final.html), though what is given here will get you by 99.99% of the time.

Both Babel and TypeScript can produce "common" (Nodejs) and "amd" (Requirejs) modules from the same ES6 syntax (on both use `-m amd|common` flag).

---

## Classes

* Classes are similar to Java/C# except that all "members" (attributes) are public by default.
* The constructor is also different in that it is always called `constructor`.
* The `public`, `protected`, and `private` keywords are only in TypeScript (planned for ES7).
* TypeScript will of course let you add types to the variables and method arguments.
* TypeScript will also uses (optionally) `implements` when you want to advertise that you implement an interface. ECMAScript has no concept of interfaces at this time.

---

## TypeScript only feature - Types
Types can be given any place typescript declares a name (`var`, `let`, function parameters, class attributes).
To use, after the introduced name, add a `:` and then list a type declaration from the following:

* Basic types: `string`, `number`, `boolean`, `void`, `any`
* Function declaration: `(args) => type`
  * `var f = function(a: number, b: string, cb : (err : Error) => void) {}`
* Arrays:
  * `string[] = ["test"]; // Declared as base type`
  * `Array<string> = ["test"]; // Declared as generic type`
* Types are inferred whenever possible:
  * `var a = ["test"]; // Has same meaning as the previous two`
* Generic Functions and Classes also exist, but are beyond the scope of this talk. The are pretty much identical to what is in Java and C#.
* Type compatibility between classes is done via shape (their attribute/type lists match).

---

## Why use types?

* Types provide better documentation.
* They make maintenance much easier.
  * It is much easier to read the TypeScript compiler code (written in TypeScript) than it is to read Babel (written in JavaScript).
* TypeScript declarations can be automatically added to doc comments. [TypeScript doc comments](http://typedoc.io/guides/doccomments.html)

This [study](http://macbeth.cs.ucdavis.edu/lang_study.pdf) compared code quality among a number of languages used on GitHub.
* The best languages: TypeScript, then Clojure, Scala and Haskell. (ordered best to worst)
* The worst languages: C++, Objective C, C, Perl (ordered worst to best).
* In between: Go, JavaScript, Ruby, Python, CoffeeScript, Java, C#, Php (unordered)

---

## Using types with existing JavaScript projects

* Use a ".d.ts" file that defines the interface of the JS project.<br>(Just include the file on your `tsc` command line.)
* A huge number of open source projects are already defined: [http://definitelytyped.org/](http://definitelytyped.org/)
* You can define your own `.d.ts` files:
  * They can be simple: `declare $ : any;`
  * They can contain TypeScript document comments that provide extra info for IDEs.
  * For a full blown example, take a look at the `jquery.d.ts` exercise.
  * WebStorm is using these `.d.ts` files to provide completion support for normal JavaScript as well as for TypeScript.

---

## TypeScript only feature - Namespaces

```typescript
namespace {
  /* ... */
}
```

* This used to be called a "module", but ES6 uses that term differently, so they changed it.
* You make namespaces in JavaScript all of the time. See the exercise...

---

## TypeScript only feature - Enums

* By default enums generate constants (with comments) in JavaScript as that is more efficient than an object access.
* Enums are much more efficient than the usual JavaScript use of strings.
* Using a `toString()` method on an enum variable will generate the corresponding name string.

```typescript
enum Color { Pink, Orange, Purple };
let t : Color = Color.Pink;
log(`${t} ${Color[t]}`); // Outputs: 0 Pink
```

---

## TypeScript only feature - Interfaces

* Are very similar to Java and C#.
* A class can optionally declare that it `implements` an interface.
* Every class also defines an interface (i.e. its attribute/type list).

```typescript
interface IName {
  // Looks like classes type declarations taking the place of implementation/initialization.
  name : type;
  method(a:type) : type;
  // getters and setters currently not allowed in interfaces.
}
```
---

## Async/Await (partially in TS 1.5, will be fully in TS 1.6, in Babel now)
* Fully explaining async/await is an entire talk, but take a look at the sample.
* This is one of the most important features in ES7.
* If you are using NodeJS, it is already available behind the --harmony flag.
* It is on by default in io.js.

---

## TypeScript has a number of other features

* Support for multi-file modules
* Various syntactic niceties
* A short cut way to declare public/private/protect attributes via their constructor names.
* Ways of defining very complicated JavaScript interfaces.
* And more...
* But, really this talk is too long already.

---

## Resources
[ES6 features](https://github.com/lukehoban/es6features#readme)

[Learn ES2015](http://babeljs.io/docs/learn-es2015/)

[Mozilla "ES6 In Depth" articles](https://hacks.mozilla.org/category/es6-in-depth/)

[Free book about ECMAScript 6](https://leanpub.com/exploring-es6/read)

[What's New in TypeScript](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript)

[ECMAScript 7 Proposed Features](https://github.com/tc39/ecma262)

[Six Steps for Approaching the Next JavaScript](http://developer.telerik.com/featured/six-steps-for-approaching-the-next-javascript/?imm_mid=0d3af7&cmp=em-web-na-na-newsltr_20150617)

[ES6 Syntax extensions](https://github.com/estree/estree/blob/master/es6.md)

[TypeScript Development Roadmap](https://github.com/Microsoft/TypeScript/wiki/Roadmap)

[TSLint](https://github.com/palantir/tslint)

---

## Please Fill Out Google GDG Survey

[http://bit.ly/gdgncsurvey](http://bit.ly/gdgncsurvey)

WARNING: not anonymous, if you give your e-mail address.

<br>
&nbsp;
<br>
## My Contact Information:

&nbsp;&nbsp;Brian Sturgill

&nbsp;&nbsp;codersnext@gmail.com
