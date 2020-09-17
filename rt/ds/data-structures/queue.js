// 单链队列
class Queue {
    constructor() {
        this.queue = []
    }

    enqueue(item) {
        this.queue.push(item)
    }

    dequeue() {
        return this.queue.shift()
    }

    peek() {
        return this.queue[0]
    }

    size() {
        return this.queue.length
    }

    clear() {
        this.queue = []
    }

    isEmpty() {
        return this.getLength() === 0
    }

    toString() {
        return this.queue
    }
}

// 循环队列
class CircleQueue {
    constructor(length) {
        this.queue = new Array(length + 1)
        // 队头
        this.first = 0
        // 队尾
        this.last = 0
        // 当前队列元素个数
        this.size = 0
    }

    enqueue(item) {
        // 判断队尾 + 1 是否为队头
        // 如果是就代表需要扩容数组
        // % this.queue.length 是为了防止数组越界
        if (this.first === (this.last + 1) % this.queue.length) {
            this.resize(this.length() * 2 + 1)
        }

        this.queue[this.last] = item;
        this.size += 1;
        this.last = (this.last + 1) % this.queue.length;

    }

    dequeue() {
        if (this.isEmpty()) {
            throw Error('Queue is empty')
        }

        let r = this.queue[this.first];
        this.queue[this.first] = null;
        this.first = (this.first + 1) % this.queue.length;
        this.size--;
        // 判断当前队列大小是否过小
        // 为了保证不浪费空间，在队列空间等于总长度四分之一时
        // 且不为 2 时缩小总长度为当前的一半
        if (this.size === this.length() / 4 && this.length() / 2 !== 0) {
            this.resize(this.length() / 2)
        }
        return r;
    }

    head() {
        if (this.isEmpty()) {
            throw Error('Queue is empty')
        }
        return this.queue[this.first]
    }

    length() {
        return this.queue.length - 1
    }

    isEmpty() {
        return this.first === this.last
    }

    resize(len) {
        let q = new Array(len);
        for (let i = 0; i < len; i++) {
            q[i] = this.queue[(i + this.first) % this.queue.length];
        }
        this.queue = q;
        this.first = 0;
        this.last = this.size;
    }

    toString(){
        if (this.isEmpty()) {
            return '';
        }
        let str = `${this.head()}`;
        let index = 1;
        while(this.first+index !== this.last){
            str = `${str}, ${this.queue[this.first+index]}`;
            index++;
        }

        return str;
    }
}

// const queue = new CircleQueue(6);
// console.log(queue.isEmpty()); // outputs true
// queue.enqueue('John');
// queue.enqueue('Jack');
// console.log(queue.toString()); // John,Jack
// queue.enqueue('Camila');
// console.log(queue.toString()); // John,Jack,Camila
//
// console.log(queue.isEmpty()); // outputs false
// queue.dequeue(); // remove John
// queue.dequeue(); // remove Jack
// console.log(queue.toString()); // Camila

// 双向队列
class Deque {
    constructor(length) {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }

    addFront(ele) {
        if (this.isEmpty()) {
            this.addBack(ele)
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = ele;
        } else {
            // 后移
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1]
            }

            this.count++;
            this.items[0] = ele;
        }
    }

    addBack(ele) {
        this.items[this.count] = ele;
        this.count++;
    }

    removeFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        const res = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return res;
    }

    removeBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const res = this.items[this.count];
        delete this.items[this.count];
        return res;
    }

    peekFront() {
        if (this.isEmpty()) {
            throw Error('Queue is empty')
        }
        return this.items[this.lowestCount]
    }

    peekBack() {
        if (this.isEmpty()) {
            throw Error('Queue is empty')
        }
        return this.items[this.count - 1]
    }
    // 元素数量
    size() {
        return this.count - this.lowestCount;
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let str = `${this.items[this.lowestCount]}`;

        for (let i = this.lowestCount + 1; i < this.count; i++) {
            str = `${str}, ${this.items[i]}`;
        }

        return str;
    }
}

// const deque = new Deque();
// console.log(deque.isEmpty()); // outputs true
// deque.addBack('John');
// deque.addBack('Jack');
// console.log(deque.toString()); // John,Jack
// deque.addBack('Camila');
// console.log(deque.toString()); // John,Jack,Camila
// console.log(deque.size()); // outputs 3
// console.log(deque.isEmpty()); // outputs false
// deque.removeFront(); // remove John
// console.log(deque.toString()); // Jack,Camila
// deque.removeBack(); // Camila decides to leave
// console.log(deque.toString()); // Jack
// deque.addFront('John'); // John comes back for information
// console.log(deque.toString()); // John,Jack

// 击鼓传花
function hotPotato(elementsList, num){
    const queue = new Queue();
    const elimitatedList = [];
    for(let i=0; i<elementsList.length; i++){
        queue.enqueue(elementsList[i])
    }

    while(queue.size()>1){
        for (let i=0; i<num; i++){
            queue.enqueue(queue.dequeue());
        }
        elimitatedList.push(queue.dequeue())
    }

    return {
        eliminated: elimitatedList,
        winner: queue.dequeue()
    }
}

// const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
// const result = hotPotato(names, 7);
//
// result.eliminated.forEach(name => {
//     console.log(`${name} was eliminated from the Hot Potato game.`);
// });
//
// console.log(`The winner is: ${result.winner}`);

// 回文：指的是从头读到尾与从尾读到头一模一样的字符串。包括句子和词。
function palindromeChecker(str) {
    const deque = new Deque();
    const lstr = str.toLowerCase().split(" ").join("");
    let firstChar;
    let lastChar;
    for (let i=0; i< lstr.length; i++){
        deque.addBack(lstr[i]);
    }

    while (deque.size()>1){
        firstChar = deque.removeFront();
        lastChar = deque.removeBack();
        if(firstChar !== lastChar){
            return false;
        }
    }

    return true;
}

console.log('a', palindromeChecker('a'));
console.log('abbca', palindromeChecker('abbca'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));