// 集合

class Set {
    constructor(){
        this.items = {};
    }

    add(value){
        if(!this.has(value)){
            this.items[value] = value;
            return true;
        }

        return false;
    }

    remove(value){
        if(this.has(value)){
            delete this.items[value];
            return true;
        }

        return false;
    }

    has(value){
        return this.items.hasOwnProperty(value);
    }

    clear(){
        this.items = {};
    }

    size(){
        // return Object.keys(this.items).length;
        let count = 0;

        for(let prop in this.items){
            if(this.has(prop)){
                count++;
            }
        }

        return count;
    }

    values(){
        // return Object.values(this.items);
        let keys = [];

        for(let prop in this.items){
            if(this.has(prop)){
                keys.push(prop)
            }
        }

        return keys;
    }

    // 并集
    union(otherSet){
        let unionSet = new Set();
        let values = this.values();
        for(let i=0; i<values.length; i++){
            unionSet.add(values[i])
        }

        values = otherSet.values();
        for(let i=0; i<values.length; i++){
            unionSet.add(values[i])
        }

        return unionSet;
    }

    // 交集
    intersection(otherSet){
        let intersectionSet = new Set();
        let values = this.values();
        for(let i=0; i<values.length; i++) {
            if(otherSet.has(values[i])){
                intersectionSet.add(values[i]);
            }
        }

        return intersectionSet;
    }

    difference(otherSet) {
        let differenceSet = new Set();
        let values = this.values();
        for(let i=0; i< values.length; i++){
            if(!otherSet.has(values[i])){
                differenceSet.add(values[i])
            }
        }
        return differenceSet;
    }
}



let s = new Set();
s.add(1);
s.add(2);
s.add(3);
s.add(4);

let o = new Set();
o.add(1);
o.add(8);
o.add(9);

console.log(s.difference(o))