// 集合

class Set {
    constructor() {
        this.items = {};
    }

    add(value) {
        if (!this.has(value)) {
            this.items[value] = value;
            return true;
        }

        return false;
    }

    delete(value) {
        if (this.has(value)) {
            delete this.items[value];
            return true;
        }

        return false;
    }

    has(value) {
        return this.items.hasOwnProperty(value);
    }

    clear() {
        this.items = {};
    }

    size() {
        return Object.keys(this.items).length;
    }

    values() {
        return Object.values(this.items);
    }

    // 并集
    union(otherSet) {
        let unionSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        values = otherSet.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        return unionSet;
    }

    // 交集
    intersection(otherSet) {
        let intersectionSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }

        return intersectionSet;
    }

    // 差集
    difference(otherSet) {
        let differenceSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                differenceSet.add(values[i])
            }
        }
        return differenceSet;
    }

    isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        }

        let isSubset = true;

        this.values().every(value => {
            if(!otherSet.has(value)){
                isSubset = false;
                return false;
            }
            return true;
        });

        return isSubset;
    }

    toString() {
        if (this.isEmpty()) {
            return ""
        }

        const values = this.values();
        let str = `${values[0]}`;
        for (let i = 1; i < values.length; i++) {
            str = `${str}, ${values[i]}`;
        }
        return str;
    }
}


// const set = new Set();
//
// set.add(1);
// console.log(set.values()); // outputs [1]
// console.log(set.has(1)); // outputs true
// console.log(set.size()); // outputs 1
//
// set.add(2);
// console.log(set.values()); // outputs [1, 2]
// console.log(set.has(2)); // true
// console.log(set.size()); // 2
//
// set.delete(1);
// console.log(set.values()); // outputs [2]
//
// set.delete(2);
// console.log(set.values()); // outputs []


let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);

const unionAB = setA.union(setB);
console.log(unionAB.values()); // [1, 2, 3, 4, 5, 6]

// --------- Intersection ----------

setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

const intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values()); // [2, 3]

// --------- Difference ----------

setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

const differenceAB = setA.difference(setB);
console.log(differenceAB.values()); // [1]

// --------- Subset ----------

setA = new Set();
setA.add(1);
setA.add(2);

setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);

const setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);

console.log(setA.isSubsetOf(setB)); // true
console.log(setA.isSubsetOf(setC)); // false

// ------ES 2015 -------
const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

const union = (set1, set2)=>{
    const unionAb = new Set();
    set1.forEach(v=>unionAb.add(v));
    set2.forEach(v=>unionAb.add(v));
    return unionAb;
};

console.log(union(setA, setB))
console.log([...setA, ...setB]);

const intersection = (set1, set2)=>{
    const intersectionSet = new Set();
    set1.forEach(v=>{
        if(set2.has(v)){
            intersectionSet.add(v)
        }
    });

    return intersectionSet;
};

console.log(intersection(setA, setB));
console.log([...setA].filter(v=>setB.has(v)));
// console.log(new Set([x for (x of setA) if (setB.has(x))]));