// 模拟栈

class StackArray {
    constructor() {
        this.count = 0;
        this.items = [];
    }

    push(ele) {
        this.items[this.count] = ele;
        this.count++;
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        let ret = this.items[this.count];
        delete this.items[this.count];
        return ret;
    }

    peek() {
        if (this.isEmpty()) {
            return undefined
        }

        return this.items[this.count - 1]
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    clear() {
        this.items = [];
        this.count = 0;
    }

    toString() {
        if (this.isEmpty()) {
            return ""
        }
        let str = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            str = `${str},${this.items[i]}`
        }
        return str;
    }
}

// 全局添加 window[Symbol('stack')] = []，利用数组方法模拟
let _itemsf = Symbol('stack');

class StackSymbol {
    constructor() {
        this[_items] = [];
    }

    push(ele) {
        this[_items].push(ele);
    }

    pop() {
        return this[_items].pop()
    }

    peek() {
        return this[_items][this[_items].length - 1]
    }

    isEmpty() {
        return this[_items].length === 0;
    }

    size() {
        return this[_items].length;
    }

    clear() {
        this[_items] = []
    }

    print() {
        console.log(this[_items])
    }

    toString() {
        return this[_items].toString()
    }
}

// 利用 WeakMap 模拟
const _items = new WeakMap();
const _count = new WeakMap();

class StackWeak {
    constructor() {
        _count.set(this, 0);
        _items.set(this, {})
    }

    push(ele) {
        const items = _items.get(this);
        const count = _count.get(this);
        items[count] = ele;
        _count.set(this, count + 1);
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }

        const items = _items.get(this);
        let count = _count.get(this);
        count--;
        _count.set(this, count);
        const result = items[count];
        delete items[count];
        return result;
    }

    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        const items = _items.get(this);
        const count = _count.get(this);
        return items[count - 1];
    }

    isEmpty() {
        return _count.get(this) === 0;
    }

    size() {
        return _count.get(this);
    }

    clear() {
        /* while (!this.isEmpty()) {
            this.pop();
          } */
        _count.set(this, 0);
        _items.set(this, {});
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const items = _items.get(this);
        const count = _count.get(this);
        let objString = `${items[0]}`;
        for (let i = 1; i < count; i++) {
            objString = `${objString},${items[i]}`;
        }
        return objString;
    }
}

// const stack = new StackWeak();
// console.log(stack.isEmpty());
// stack.push(1);
// stack.push(2);
// stack.push(3);
//
// console.log(stack.toString());
// stack.pop();
// stack.pop();
//
// console.log(stack.size());
// let sym = Object.getOwnPropertySymbols(stack);
// console.log(sym);
// console.log(sym[0]);
// console.log(stack[sym[0]].push(4))
// console.log(stack.print())

// 括号匹配
function parenthesesChecker1(symbols) {
    const stack = new StackSymbol();
    const opens = '([{';
    const closers = ')]}';
    let index = 0;
    let flag = true;

    while (index < symbols.length && flag) {
        let symbol = symbols[index];
        if (opens.indexOf(symbol) >= 0) {
            stack.push(symbol)
        } else if (stack.isEmpty()) {
            flag = false;
        } else {
            let close = closers.indexOf(symbol);
            if (close >= 0) {
                let top = stack.pop();
                if (close !== opens.indexOf(top)) {
                    flag = false;
                }
            }
        }
        index += 1;
    }

    return flag && stack.isEmpty();

}

function parenthesesChecker2(s) {
    let map = {
        '(': -1,
        ')': 1,
        '[': -2,
        ']': 2,
        '{': -3,
        '}': 3
    }
    let stack = [];
    let index = 0;
    let flag = true;
    while (index < s.length) {
        let ch = s[index];
        let sym = map[ch];
        if (sym < 0) {
            stack.push(ch)
        } else if (stack.length === 0) {
            flag = false;
        } else {
            if (sym > 0) {
                let top = stack.pop();
                if (map[top] + sym !== 0) {
                    flag = false;
                }
            }
        }
        index += 1;
    }

    return stack.length === 0 && flag;
}

// console.log('{([dd])', parenthesesChecker2('{([dd])'));
// console.log('{([dd])}', parenthesesChecker2('{([dd])}'));

// 10 进制到 2 进制
function decimalToBinary(num) {
    let temp = num;
    let mod = 0;
    let stack = new StackArray();
    let res = "";

    while (temp > 0) {
        mod = Math.floor(temp % 2);
        stack.push(mod);
        temp = Math.floor(temp / 2);
    }

    while (!stack.isEmpty()) {
        res += stack.pop().toString()
    }

    return res;
}

// console.log(decimalToBinary(233));
// console.log(decimalToBinary(10));
// console.log(decimalToBinary(1000));
// 基数转换 10 进制到 base 进制
function baseConverter(num, base) {
    let temp = num;
    let mod = 0;
    let stack = new StackArray();
    let res = "";
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (!(base >= 2 && base <= 36)) {
        return '';
    }

    while (temp > 0) {
        mod = Math.floor(temp % base);
        stack.push(mod);
        temp = Math.floor(temp / base);
    }

    while (!stack.isEmpty()) {
        res += digits[stack.pop()]
    }

    return res;
}

// console.log(baseConverter(100345, 2));
// console.log(baseConverter(100345, 8));
// console.log(baseConverter(100345, 16));
// console.log(baseConverter(100345, 35));

// 汉诺塔：每次只能移动一个圆盘
// 移动过程中，大圆盘不允许覆盖在小圆盘上
// 起点，缓冲，终点
function hanoi(plates, source, helper, dest, moves = []) {
    if (plates <= 0) {
        return moves;
    }

    if (plates === 1) {
        moves.push([source, dest])
    } else {
        hanoi(plates - 1, source, dest, helper, moves);
        moves.push([source, dest]);
        hanoi(plates - 1, helper, source, dest, moves)
    }

    return moves;
}

console.log(hanoi(3, 'source', 'helper', 'dest'));


function towerOfHanoi(plates, source, helper, dest, moves = []) {
    if (plates <= 0) {
        return moves;
    }

    if (plates === 1) {
        dest.push(source.pop());
        const move = {};
        move['source'] = source.toString();
        move['helper'] = helper.toString();
        move['dest'] = dest.toString();
        moves.push(move);
    } else {
        towerOfHanoi(plates - 1, source, dest, helper, moves);
        dest.push(source.pop());
        const move = {};
        move['source'] = source.toString();
        move['helper'] = helper.toString();
        move['dest'] = dest.toString();
        moves.push(move);
        towerOfHanoi(plates - 1, helper, source, dest, moves);
    }
    return moves;
}

function hanoiStack(plates) {
    const source = [];
    const dest = [];
    const helper = [];

    for (let i = plates; i > 0; i--) {
        source.push(i);
    }

    return towerOfHanoi(plates, source, helper, dest);
}

console.log(hanoiStack(3));
