var tsc;
(function (tsc) {
    /* reportDiagnostics and reportDiagnostic are originally from typescript compiler */
    function reportDiagnostic(diagnostic) {
        var output = "";
        if (diagnostic.code === 2318 || diagnostic.code === 2468 || diagnostic.code === 5047) {
            return output;
        }
        if (diagnostic.file) {
            var loc = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
            output += diagnostic.file.fileName + "(" + (loc.line + 1) + "," + (loc.character + 1) + "): ";
        }
        var category = ts.DiagnosticCategory[diagnostic.category].toLowerCase();
        output += category + " TS" + diagnostic.code + ": " + ts.flattenDiagnosticMessageText(diagnostic.messageText, "\r\n") + "\r\n";
        return output;
    }
    function reportDiagnostics(diagnostics) {
        var output = "";
        for (var i = 0; i < diagnostics.length; i++) {
            output += reportDiagnostic(diagnostics[i]);
        }
        return output;
    }
    function compile(program, log, es5) {
        var diagnostics = [];
        var compilerOpts = {
            diagnostics: true,
            noResolve: true,
            noLib: true,
            noImplicitAny: true,
            experimentalAsyncFunctions: !es5,
            target: es5 ? 1 /* ES5 */ : 2 /* ES6 */
        };
        if (program === '') {
            return '';
        }
        log("Preprocessing with TypeScript to ES" + (es5 ? "5" : "6") + ".");
        program = ts.transpile(program, compilerOpts, undefined, diagnostics);
        var rep = reportDiagnostics(diagnostics);
        if (rep !== '') {
            log(rep);
            return undefined;
        }
        return program;
    }
    tsc.compile = compile;
})(tsc || (tsc = {}));
//# sourceMappingURL=tscmini.js.map