module tsc {
	/* reportDiagnostics and reportDiagnostic are originally from typescript compiler */
	function reportDiagnostic(diagnostic: ts.Diagnostic) {
			var output = "";
			if (diagnostic.code === 2318 || diagnostic.code === 2468 || diagnostic.code === 5047) {
				return output;
			}
			
			if (diagnostic.file) {
					var loc = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);

					output += `${ diagnostic.file.fileName }(${ loc.line + 1 },${ loc.character + 1 }): `;
			}

			var category = ts.DiagnosticCategory[diagnostic.category].toLowerCase();
			output += `${ category } TS${ diagnostic.code }: ${ ts.flattenDiagnosticMessageText(diagnostic.messageText, "\r\n") }${ "\r\n" }`;

			return output;
	}

	function reportDiagnostics(diagnostics: ts.Diagnostic[]) : string {
			var output : string = "";
			for (var i = 0; i < diagnostics.length; i++) {
					output += reportDiagnostic(diagnostics[i]);
			}
			return output;
	}


	export function compile(program: string, log: (s:string) => void, es5?:boolean) : string {
		var diagnostics: ts.Diagnostic[] = [];
		var compilerOpts : ts.CompilerOptions = {
			diagnostics: true,
			noResolve: true,
			noLib: true,
			noImplicitAny: true,
			experimentalAsyncFunctions: !es5,
			target: es5?ts.ScriptTarget.ES5:ts.ScriptTarget.ES6
		};
		if (program === '') {
			return '';
		}
		log("Preprocessing with TypeScript to ES"+(es5?"5":"6")+".");
		program = ts.transpile(program, compilerOpts, undefined, diagnostics);
		var rep = reportDiagnostics(diagnostics);
		if (rep !== '') {
			log(rep);
			return undefined;
		}
		return program;
	}
}
