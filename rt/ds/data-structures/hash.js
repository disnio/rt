// 哈希表，处理冲突的方法：分离链接，线性探查，双散列法
// import {LinkedList} from "./link-list";

class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    toString() {
        return "[" + this.key + " - " + this.value + "]";
    }
}

// 分离链接法
class HashTable {
    constructor() {
        this.table = {};
        this.count = 0;
    }

    // 散列函数，字母 ascii 值相加
    hashCode(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }

        return hash % 37;
    }

    put(key, value) {
        let position = this.hashCode(key);

        if (this.table[position] === undefined) {
            this.table[position] = new LinkedList();
        }

        this.table[position].append(new ValuePair(key, value));
        this.count++;
    }

    // 线性探查
    linePut(key, value) {
        if(key != null && value !=null){
            let position = this.hashCode(key);

            if (this.table[position] === undefined) {
                this.table[position] = new ValuePair(key, value);
            } else {
                let index = position+1;
                while (this.table[index] !== undefined) {
                    index++;
                }
                this.table[index] = new ValuePair(key, value);
            }
            this.count++;
            return true;
        }
        return false;
    }

    remove(key) {
        let position = this.hashCode(key);
        let current;

        if (this.table[position] !== undefined) {
            current = this.table[position].getHead();
            while (current.next) {
                if (current.element.key === key) {
                    this.table[position].remove(current.element);
                    if (this.table[position].isEmpty()) {
                        this.table[position] = undefined;
                    }
                    this.count--;
                    return true;
                }
                current = current.next;
            }

            if (current.element.key === key) {
                this.table[position].remove(current.element);
                if (this.table[position].isEmpty()) {
                    this.table[position] = undefined;
                }
                this.count--;
                return true;
            }
        }

        return false;
    }

    // 线性探查
    lineRemove(key) {
        let position = this.hashCode(key);

        if (this.table[position] !== undefined) {
            if (this.table[position].key === key) {
                this.table[position] = undefined;
                this.count--;
                return true;
            } else {
                let index = ++position;
                while (this.table[index] !== undefined) {
                    index++;
                }
                if (this.table[index].key === key) {
                    this.table[index] = undefined;
                    delete this.table[index];
                    this.count--;
                    return true;
                }
            }
        }
        return false;
    }

    get(key) {
        let position = this.hashCode(key);
        let current;

        if (this.table[position] !== undefined) {
            current = this.table[position].getHead();

            while (current.next) {
                if (current.element.key === key) {
                    return current.element.value;
                }

                current = current.next;
            }

            if (current.element.key === key) {
                return current.element.value;
            }
        }

        return undefined;
    }

    // 线性探查
    lineGet(key) {
        let position = this.hashCode(key);

        if (this.table[position] !== undefined) {
            if (this.table[position].key === key) {
                return this.table[position].value;
            } else {
                let index = position+1;
                while (this.table[index] !== undefined) {
                    index++;
                }
                if (this.table[index] && this.table[index].key === key) {
                    return this.table[index].value;
                }
            }
        }
        return undefined;

    }

    size() {
        return this.count;
    }

    isEmpty() {
        return this.count === 0;
    }

    clear() {
        this.table = {};
        this.count = 0;
    }

    toString() {
        if (this.isEmpty()) {
            return ""
        }

        let keys = Object.keys(this.table).filter(v => this.table[v] !== undefined);

        let str = `${this.table[keys[0]].toString()}`;
        for (let i = 1; i < keys.length; i++) {
            str = `${str}, ${this.table[keys[i]].toString()}`;
        }
        return str;
    }

}

// 线性探查：当想向表中某个位置加入一个新元素的时候，如果索引为 index 的位置已经占据，
// 就尝试 index+1 的位置，以此类推。


const hash = new HashTable();

console.log(hash.hashCode('Gandalf') + ' - Gandalf');
console.log(hash.hashCode('John') + ' - John');
console.log(hash.hashCode('Tyrion') + ' - Tyrion');

console.log(hash.hashCode('Ygritte') + ' - Ygritte');
console.log(hash.hashCode('Jonathan') + ' - Jonathan');
console.log(hash.hashCode('Jamie') + ' - Jamie');
console.log(hash.hashCode('Jack') + ' - Jack');
console.log(hash.hashCode('Jasmine') + ' - Jasmine');
console.log(hash.hashCode('Jake') + ' - Jake');
console.log(hash.hashCode('Nathan') + ' - Nathan');
console.log(hash.hashCode('Athelstan') + ' - Athelstan');
console.log(hash.hashCode('Sue') + ' - Sue');
console.log(hash.hashCode('Aethelwulf') + ' - Aethelwulf');
console.log(hash.hashCode('Sargeras') + ' - Sargeras');

hash.linePut('Ygritte', 'ygritte@email.com');
hash.linePut('Jonathan', 'jonathan@email.com');
hash.linePut('Jamie', 'jamie@email.com');
hash.linePut('Jack', 'jack@email.com');
hash.linePut('Jasmine', 'jasmine@email.com');
hash.linePut('Jake', 'jake@email.com');
hash.linePut('Nathan', 'nathan@email.com');
hash.linePut('Athelstan', 'athelstan@email.com');
hash.linePut('Sue', 'sue@email.com');
hash.linePut('Aethelwulf', 'aethelwulf@email.com');
hash.linePut('Sargeras', 'sargeras@email.com');

console.log('**** Printing Hash **** ');

console.log(hash.toString());

console.log('**** Get **** ');

console.log(hash.lineGet('Ygritte')); // ygritte@email.com
console.log(hash.lineGet('Loiane')); // jasmine@email.com

console.log('**** Remove **** ');

hash.lineRemove('Ygritte');
console.log(hash.lineGet('Ygritte')); // undefined

console.log(hash.toString());