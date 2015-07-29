enum Color { Pink, Orange, Purple };
let t : Color = Color.Pink;
log(`${t} ${Color[t]}`); // Outputs: 0 Pink

enum Animal { Dog=1, Cat, Fish };
let v : Animal = Animal.Fish;
log(`${v} ${Animal[v]}`); // Outputs: 3 Fish

enum Ordinal { First=1, Fourth=4, Tenth=10 };
let v : Ordinal = Ordinal.Fourth;
log(`${v} ${Ordinal[v]}`); // Outputs: 4 Fourth
