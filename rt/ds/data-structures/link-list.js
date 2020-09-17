class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

// 单链表
class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    getHead() {
        return this.head;
    }

    // 列表尾部添加一个新项
    append(element) {
        let node = new Node(element);
        let current;

        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;

            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }

        this.length++;
    }

    getElementAt(position) {
        if (position > -1 && position <= this.length) {
            let current = this.head;
            let index = 0;
            while (index++ < position) {
                current = current.next;
            }
            return current;
        }
        return undefined;
    }

    // 链表特定位置插入一个新项
    insert(position, element) {
        let current = this.head;
        let previous,
            index = 0;
        let node = new Node(element);

        if (position > -1 && position <= this.length) {
            if (position === 0) {
                node.next = current;
                this.head = node;
            } else {
                previous = this.getElementAt(position - 1);
                node.next = previous.next;
                previous.next = node;
            }

            this.length++;
            return true;
        }
        return false;
    }

    // 特定位置移除一项
    removeAt(position) {
        let current = this.head;
        let previous;
        let index = 0;

        if (position > -1 && position < this.length) {
            if (position === 0) {
                this.head = current.next;
            } else {
                previous = this.getElementAt(position - 1);
                current = previous.next;
                previous.next = current.next;
            }

            this.length--;
            return current.element;
        }
        return undefined;
    }

    // 移除一项
    remove(element) {
        let index = this.indexOf(element);
        console.log("remove index:", index);
        return this.removeAt(index);
    }

    // 元素在链表中的索引
    indexOf(element) {
        let current = this.head;
        let index = -1;

        while (current) {
            index += 1;

            if (element === current.element) {
                return index;
            }

            current = current.next;
        }

        return -1;
    }

    // 链表不包含任何元素返回 true，长度大于0 返回 false
    isEmpty() {
        return this.length === 0;
    }

    // 链表包含的元素个数
    size() {
        return this.length;
    }

    // 输出元素值，重写 toString
    toString() {
        if (this.head == null) {
            return ""
        }

        let current = this.head.next;
        let str = `${this.head.element}`;
        for (let i = 1; i < this.size() && current !== null; i++) {
            str = `${str}, ${current.element}`;
            current = current.next;
        }

        return str;
    }

}

class DNode {
    constructor(element) {
        this.element = element;
        this.prev = null;
        this.next = null;
    }
}

// 双向链表
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // 列表尾部添加一个新项
    append(element) {
        let node = new DNode(element);
        let current;

        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }

        this.length++;
    }

    insert(position, element) {
        let current = this.head;
        let previous,
            index = 0;
        let node = new DNode(element);

        if (position > -1 && position <= this.length) {
            if (position === 0) {
                if (this.head === null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    this.head.prev = node;
                    this.head = node;
                }
            } else if (position === this.length) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {

                previous = this.getElementAt(position - 1);
                current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }

            this.length++;
            return true;
        } else {
            return false;
        }
    }

    removeAt(position) {
        let current = this.head;
        let previous, index = 0;

        if (position > -1 && position <= this.length) {
            if (position === 0) {
                this.head = current.next;
                if (this.length === 1) {
                    this.tail = null;
                } else {
                    this.head.prev = null;
                }
            } else if (position === this.length - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            } else {
                current = this.getElementAt(position);
                previous = current.prev;
                previous.next = current.next;
                current.next.prev = previous;
            }

            this.length--;
            return current.element;
        } else {
            return null;
        }
    }

    getElementAt(position) {
        if (position > -1 && position <= this.length) {
            let current = this.head;
            let index = 0;
            while (index++ < position) {
                current = current.next;
            }
            return current;
        }
        return undefined;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    toString() {
        let current = this.head;
        let str = "";
        while (current) {
            str += current.element + ", ";
            current = current.next;
        }

        return str;
    }
}

// let l = new DoublyLinkedList();
// l.append(1);
// l.append(2);
// l.append(3);
// l.append(4);
// l.append(5);
//
// // l.remove(3);
//
// l.insert(0, 0);
// l.insert(6, 6);
// l.removeAt(0);
//
// console.log(l.toString());

function defaultCompareFn(a, b) {
    if (a === b) {
        return 0;
    }

    return a < b ? -1 : 1;
}

class SortedLinkedList extends LinkedList {
    constructor(compareFn = defaultCompareFn) {
        super();
        this.compareFn = compareFn;
    }

    append(element) {
        if (this.isEmpty()) {
            super.append(element)
        } else {
            const index = this.getIndexNextSortedElement(element);
            super.insert(index, element);
        }
    }

    insert(position = 0, element) {
        if (this.isEmpty()) {
            return super.insert(position, element);
        }

        if (position === 0) {
            return super.insert(0, element)
        }

        const pos = this.getIndexNextSortedElement(element);
        return super.insert(pos, element);
    }

    getIndexNextSortedElement(element) {
        let current = this.head;
        let i = 0;
        for (; i < this.size() && current; i++) {
            const comp = this.compareFn(element, current.element);
            if (comp === -1) {
                return i;
            }
            current = current.next;
        }
    }

}

// const list = new SortedLinkedList();
// for (let i = 5; i > 0; i--) {
//     list.append(i);
// }
//
// list.insert(0, 6);
// console.log('list => ', list.toString());
//
// console.log('list.removeAt(1) => ', list.removeAt(1));
//
// console.log('remove element 5 => ', list.remove(5));
//
// console.log('list.toString() => ', list.toString());

class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList();
    }

    push(element) {
        this.items.append(element)
    }

    pop() {
        if (this.isEmpty()) {
            return undefined;
        }

        const result = this.items.removeAt(this.size() - 1);
        return result;
    }

    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        let current = this.items.getElementAt(this.size() - 1)
        return current.element;
    }

    isEmpty() {
        return this.items.isEmpty();
    }

    size() {
        return this.items.size();
    }

    clear() {
        this.items.clear();
    }

    toString() {
        return this.items.toString();
    }

}

// const stack = new StackLinkedList();
//
// console.log('stack.isEmpty() => ', stack.isEmpty()); // outputs true
//
// stack.push(5);
// stack.push(8);
//
// console.log('stack  => ', stack.toString());
//
// console.log('stack.peek() => ', stack.peek()); // outputs 8
//
// stack.push(11);
//
// console.log('stack.size() => ', stack.size()); // outputs 3
// console.log('stack.isEmpty() => ', stack.isEmpty()); // outputs false
//
// stack.push(15);
//
// stack.pop();
// stack.pop();
//
// console.log('stack.size() => ', stack.size()); // outputs 2
// console.log('stack  => ', stack.toString()); // 5, 8