function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? -1 : 1;
}

function defaultEquals(a, b) {
    return a === b;
}

function lesserEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === -1 || comp === 0;
}

function biggerEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === 1 || comp === 0;
}

function swap(array, a, b) {
    /* const temp = array[a];
    array[a] = array[b];
    array[b] = temp; */
    [array[a], array[b]] = [array[b], array[a]];
}

function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a);
}

function defaultDiff(a, b) {
    return Number(a) - Number(b);
}