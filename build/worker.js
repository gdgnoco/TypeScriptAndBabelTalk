function log(s) {
  postMessage({type:'log', msg:s});
}

var logfunc =
		"importScripts('runtime.js');\r\n" +
		"importScripts('promise.min.js');\r\n" +
		"function log(s) {\r\n" +
		"  postMessage({type:'log', msg:s});\r\n" +
		"}\r\n";

onmessage = function(e) {
	var prog = e.data;
	log("Execution started.");
	var start = Date.now().valueOf();
	/* jshint evil:true */
	try {
		eval(logfunc+prog);
	} catch(err) {
		log("Error in eval: "+err.toString());
	}
	var finish = Date.now().valueOf();
	log("Execution completed in "+((finish-start)/1000)+" seconds.");
	postMessage({type:"finish"});
	setTimeout(function() {
		close(); // Keeps async from completing, so we delay 10 seconds
	}, 10000);
};
