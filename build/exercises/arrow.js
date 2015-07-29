// Convert the functions below to arrow functions
//  Hint:  f(arg) => { }; or f(arg) => expression; The name of the function is optional.
//
//  Try to get to the minimal amount of typing.


let f = function(a) {
	return a;
};
log(f(3));

setTimeout(function() {
	log("timeout");
}, 10);

let arr = [1,2,3];
log("incremented: "+arr.map(function(a){ return a+1; }));
