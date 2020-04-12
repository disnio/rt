
class Dictionary {
    constructor(){
        this.items = {}
    }

    set(key, value){
        this.items[key] = value;
    }

    get(key){
        return this.has(key) ? this.items[key] : undefined;
    }

    has(key){
        return key in this.items;
    }

    remove(key){
        if(this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    }

    keys(){
        let keys = [];
        for(let k in this.items){
            if(this.has(k)){
                keys.push(k)
            }
        }
        return keys;
    }

    values(){
        let values = [];
        for( let k in this.items) {
            if(this.has(k)){
                values.push(this.items[k])
            }
        }
        return values;
    }

    clear(){
        this.items = {};
    }

    size(){
        return this.values.length;
    }

    getItems(){
        return this.items;
    }
}

let d = new Dictionary();

d.set("a", "allen");
d.set("b", "basic")
d.set("c", "china");
d.set("d", "dell")

console.log(d.keys())