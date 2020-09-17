// 小根堆
class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = [];
    }

    getLeftIndex(index) {
        return (2 * index) + 1;
    }

    getRightIndex(index) {
        return (2 * index) + 2;
    }

    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2)
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() <= 0;
    }

    clear() {
        this.heap = []
    }

    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0];
    }

    insert(value) {
        if (value !== null) {
            const index = this.heap.length;
            this.heap.push(value);
            this.siftUp(index);
            return true;
        }
        return false;
    }

    // 用于删除根节点，接下来循环判断父节点和两个子节点的大小，
    // 向下沉降到合适位置，如果子节点小，就把最小的子节点和父节点交换。
    siftDown(index) {
        let current = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();

        if (left < size && this.compareFn(this.heap[current], this.heap[left]) === 1) {
            current = left;
        }

        if (right < size && this.compareFn(this.heap[current], this.heap[right]) === 1) {
            current = right;
        }

        if (index !== current) {
            swap(this.heap, index, current);
            this.siftDown(current);
        }
    }

    // 用于添加元素，一路将节点与父节点对比大小，如果比父节点小，就和父节点交换位置。
    // 向上提升到合适位置
    siftUp(index) {
        let parent = this.getParentIndex(index);
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === 1) {
            swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    }

    // 删除根节点，先将根节点和末尾交换位置，然后移除末尾元素。
    extract() {
        if (this.isEmpty()) {
            return undefined;
        }

        if (this.size() === 1) {
            return this.heap.shift()
        }

        const removedValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.siftDown(0);
        return removedValue;
    }

    heapify(array) {
        if (array) {
            this.heap = array;
        }

        const maxIndex = Math.floor(this.size() / 2) - 1;
        for (let i = 0; i <= maxIndex; i++) {
            this.siftDown(i);
        }

        return this.heap;
    }

    getAsArray() {
        return this.heap;
    }
}

// 大根堆
class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        // this.compareFn = compareFn;
        this.compareFn = reverseCompare(compareFn)
    }
}

//
// let heap = new MinHeap();
//
// heap.insert(2);
// heap.insert(3);
// heap.insert(4);
// heap.insert(5);
//
// heap.insert(2);
//
// console.log(heap.getAsArray());
//
// console.log('Heap size: ', heap.size()); // 5
// console.log('Heap is empty: ', heap.isEmpty()); // false
// console.log('Heap min value: ', heap.findMinimum()); // 1
//
// heap = new MinHeap();
// for (let i = 1; i < 10; i++) {
//     heap.insert(i);
// }
//
// console.log(heap.getAsArray());
//
// console.log('Extract minimum: ', heap.extract()); // 1
// console.log(heap.getAsArray());
// [2, 4, 3, 8, 5, 6, 7, 9]

function heapify(array, index, heapSize, compareFn) {
    let largest = index;
    const left = (2 * index) + 1;
    const right = (2 * index) + 2;
    // 从左右孩子节点找出最大值
    if (left < heapSize && compareFn(array[left], array[index]) > 0) {
        largest = left;
    }

    if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
        largest = right;
    }
    // 最大值放入当前节点
    if (largest !== index) {
        swap(array, index, largest);
        heapify(array, largest, heapSize, compareFn);
    }
}

function buildMaxHeap(array, compareFn) {
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
        heapify(array, i, array.length, compareFn);
    }
    return array;
}

function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length;
    buildMaxHeap(array, compareFn);
    console.log("大根堆：", array);
    while (heapSize > 1) {
        swap(array, 0, --heapSize);
        heapify(array, 0, heapSize, compareFn);
        console.log("heap:", heapSize, array);
    }

    return array;
}

console.log('********** Heap Sort **********');
const array = [47, 33, 11, 56, 72, 61, 25, 47];
const maxHeap = new MaxHeap();
array.forEach(v=>{
    maxHeap.insert(v);
});
let arr = maxHeap.getAsArray();
console.log('Before sorting: ', arr);

console.log('After sorting: ', heapSort(arr));