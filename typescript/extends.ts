interface Person {
    name: string;
    age: number;
}

interface Parent extends Person{
    children: Array<Person>;
}

interface GoodParent extends Parent {
    buysToys: true;
}

interface BadParent extends Parent {
    buysToys: false;
}

const bob: Person = {
    name: 'bob',
    age: 1
}

const mom: Parent = {
    name: 'Jane',
    age: 22,
    children: [bob]
};

const dad: GoodParent = {
    name: 'Joe',
    age: 23,
    children: [bob],
    buysToys: true
}

type ParentOrGoodParent =  Parent | GoodParent;

function getName<T extends ParentOrGoodParent>(parent: T) {
    return parent.name
}

// function getParent<T extends Parent | GoodParent>(parent: T) {
//     return parent.name
// }

// function getParent(parent: Parent | GoodParent) {
//     return parent.name
// }

const momsName = getName(mom);
const dadsName = getName(dad);



