// Rewrite this using template strings
//

var initial_val = 0;
var result_name = "Total";

var prog = "var a = "+initial_val+";\r\n" +
	"var b = 5;\r\n" +
	"function f(x, y) { return x+y; }\r\n" +
	"log(\""+result_name+": \"+f(a,b));\r\n";

log(prog);
