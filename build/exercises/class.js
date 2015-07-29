class Animal {
	/* private */_kind; /* private, protected and public, available in TypeScript */
	constructor(kind) {
		this._kind = kind;
	}
	static gratuitous_static_method() {
		/* ... */
	}
// The previous 4 lines could be done in TypeScript as:
// constructor public(name) {}
}
class Dog extends Animal {
	_name;
	constructor(name) {
		super("dog");
		this.name = name;
	}
	get name() {
		return _name;
	}
	set name(val) {
		_name = val;
	}
	speak() {
	}
}

