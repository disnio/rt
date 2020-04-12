// 插入排序:每次排一个数组项,以此构建最后的排序数组,插入到已排序的前i 项。

const insertSort = function(arr) {
  let len = arr.length;
  let j, temp;
  for (let i = 1; i < len; i++) {
    // 待插入项
    j = i;
    temp = arr[i];
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }

    arr[j] = temp;
  }
};

let arr = [5, 6, 2, 3, 1];
insertSort(arr);
console.log(arr);

// 选择排序：原址排序算法，找到最小值放第一位，找到第二小放第二位，以此类推
const swap = function(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};

const selectSort = function(arr) {
  let len = arr.length;
  let imin;
  for (let i = 0; i < len - 1; i++) {
    imin = i;
    for (let j = i; j < len; j++) {
      if (arr[imin] > arr[j]) {
        imin = j;
      }
    }

    if (i !== imin) {
      swap(arr, i, imin);
    }
  }
};

// 冒泡排序
const bubbleSort = function(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
};
