/* tslint:disable */
interface ArrayLike<T> {
    readonly length: number;
    readonly [n: number]: T;
}

interface Product {
    price: number;
    id: string;
    // category: string;
    // isInStock: boolean;
    // numInStock: number;
}

interface meta {
    name: string;
}

interface link {
    rel: string;
}

function getTag(metas: Array<meta>): Array<meta>
function getTag(links: Array<link>): Array<link>
function getTag(tags: Array<meta> | Array<link>): Array<meta> | Array<link> {
// function getTag(tags: Array<meta|link>): Array<meta|link> {
    if (tags.length) {
        if ((<meta>tags[0]).name) {
            return tags;
        } else if ((<link>tags[0]).rel) {
            return tags;
        }
    } else {
        return [];
    }
}

function getTagGeneric<T extends meta | link>(tags: Array<T>): Array<T> {
    if (tags.length) {
        if ((<meta>tags[0]).name) {
            return tags;
        } else if ((<link>tags[0]).rel) {
            return tags;
        }
    } else {
        return [];
    }
}
const links: Array<link> = [{rel: 'h'}, {rel: 'b'}];
const metas: Array<meta> = [{name: 'h'}, {name: 'b'}];

const res = getTagGeneric(metas);
const res_ = getTagGeneric(links);
const res2 = getTag([{name: 'd'}]);
const res3 = getTag([{rel: 'd'}]);


/**
 * Make all properties in T optional
 */
type _Partial<T> = {
    [P in keyof T]?: T[P];
};
type _Partial_<Type> = {
    [Property in keyof Type]?: Type[Property];
};

const product: Partial<Product> = {
    id: 'adlfjlkjad88',
    price: 0.01
}
// step 1
type PartialStep1 = {
    [P in keyof Product]?: Product[P]
}

// step 2
type PartialStep2 = {
    // Object.keys(product) // ['price', 'age']
    [P in ['price', 'age']]?: Product[P];
    // [P in 'id']?: Product[P];
}

type PartialStep3 = {
    // Object.keys(product).map(key => {
    //    return [key]?: Product[key]
    // })
    ['id']?: Product['id']
    ['price']?: Product['price'];
}

type PartialStep4 = {
    // Object.keys(product).map(key => {
    //    return [key]?: typeof Product[key]
    // });
    id?: 'string';
    price?: number;
}

/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

/**
 * From T pick a set of properties K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends string, T> = {
    [P in K]: T;
};

interface Response {
    product: Product;
    metadata: any;
    status: number;
}
const response: Response = {
    product: {
        id: 'adlfkj',
        price: 222
    },
    metadata: {},
    status: 200
}

type listOfStrings = "a" | "b" | "c" | "d";

const withoutMetadata: Record<listOfStrings, string> = {
    a: 'string',
    b: '2',
    c: '33',
    d: 'hello'
}

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;

type Diff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T];

interface BlueBox {
    square: 20;
    color: 'blue';
}

interface RedBox {
    square: 20;
    color: 'red';
    empty: boolean;
}

interface Circle {
    round: true;
    radius: number;
}

interface RedCircle {
    round: true;
    radius: number;
    color: 'red';
}

type withoutSquare = Omit<RedBox, 'square'>;
type CB = Exclude<Circle, BlueBox>;
type BC = Exclude<BlueBox, Circle>;
type RC = Exclude<RedCircle, Circle>;
type CR = Exclude<Circle, RedCircle>;

const cb: CB = {
    round: true,
    radius: 10
}

const rc: RC = {};
const cr: CR = {};

type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;  