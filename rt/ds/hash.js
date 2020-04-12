// 哈希表，处理冲突的方法：分离链接，线性探查，双散列法
import { LinkedList } from "./link-list";

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
        this.table = [];
    }

    // 散列函数，字母 ascii 值相加
    _loseCode(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }

        return hash % 37;
    }

    put(key, value) {
        let position = this._loseCode(key);

        if (this.table[position] === undefined) {
            this.table[position] = new LinkedList();
        }

        this.table[position].append(new ValuePair(key, value));
    }

    // 线性探查
    xput(key, value) {
        let position = this._loseCode(key);

        if (this.table[position] === undefined) {
            this.table[position] = new ValuePair(key, value);
        } else {
            let index = ++position;
            while (this.table[index] !== undefined) {
                index++;
            }
            this.table[index] = new ValuePair(key, value);
        }
    }

    remove(key) {
        let position = this._loseCode(key);
        let current;

        if (this.table[position] !== undefined) {
            current = this.table[position].getHead();
            while (current.next) {
                if (current.element.key === key) {
                    this.table[position].remove(current.element);
                    if (this.table[position].isEmpty()) {
                        this.table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            }

            if (current.element.key === key) {
                this.table[position].remove(current.element);
                if (this.table[position].isEmpty()) {
                    this.table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    }

    // 线性探查
    xremove(key) {
        let position = this._loseCode(key);

        if (this.table[position] !== undefined) {
            if (this.table[position].key === key) {
                this.table[position] = undefined;
                return true;
            } else {
                let index = ++position;
                while (this.table[index] !== undefined) {
                    index++;
                }
                if (this.table[index].key === key) {
                    this.table[index] = undefined;
                    return true;
                }
            }
        }else {
            return false;
        }
    }

    get(key) {
        let position = this._loseCode(key);
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
    xget(key) {
        let position = this._loseCode(key);

        if (this.table[position] !== undefined) {
            if (this.table[position].key === key) {
                return this.table[position].value;
            } else {
                let index = ++position;
                while (this.table[index] !== undefined) {
                    index++;
                }
                if (this.table[index].key === key) {
                    return this.table[index].value;
                }
            }
        }else {
            return undefined;
        }
    }
}

// 线性探查：当想向表中某个位置加入一个新元素的时候，如果索引为 index 的位置已经占据，
// 就尝试 index+1 的位置，以此类推。
