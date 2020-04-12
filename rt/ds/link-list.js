class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

// 单链表
export class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    getHead(){
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
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }

                node.next = current;
                previous.next = node;
            }

            this.length++;
            return true;
        } else {
            return false;
        }
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
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }

                previous.next = current.next;
            }

            this.length--;
            return current.element;
        } else {
            return null;
        }
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
        let current = this.head;
        let str = "";
        while (current) {
            str += current.element;
            current = current.next;
        }

        return str;
    }

    print() {}
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
            current = this.head;

            while (current.next) {
                current = current.next;
            }

            current.next = node;
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
                    node.next = current;
                    current.prev = node;
                    this.head = node;
                }
            } else if (position === this.length) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }

                previous.next = node;
                node.prev = previous;
                node.next = current;
                current.prev = node;
            }

            this.length++;
            return true;
        } else {
            return false;
        }
    }

    removeAt(position){
        let current = this.head;
        let previous, index = 0;

        if(position > -1 && position <= this.length){
            if(position === 0){
                this.head = current.next;
                if(this.length === 1){
                    this.tail = null;
                } else {
                    this.head.prev = null;
                }
            } else if(position === this.length-1){
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            } else {
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }

                previous.next = current.next;
                current.next.prev = previous;
            }

            this.length--;
            return current.element;
        } else {
            return null;
        }
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

let l = new DoublyLinkedList();
l.append(1);
l.append(2);
l.append(3);
l.append(4);
l.append(5);

// l.remove(3);

l.insert(0, 0);
l.insert(6, 6);
l.removeAt(0);

console.log(l.toString());
