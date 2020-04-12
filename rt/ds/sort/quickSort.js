// 快速排序也使用分治的方法，将原始数组分为较小的数组，没有像归并排序那些分割开。
// 1、数组中选择中间一项做主元。2、创建两个指针，左边一个指向数组第一项，右边一个指向数组最后一项，
// 移动左指针直到找到一个比主元大的元素，接着移动右指针直到找到一个比主元小的元素，
// 然后交换他们，重复这个过程，直到左指针超过了右指针。这过程使得比主元小的元素都排在主元之前，
// 比主元大的值都排在主元之后，这一步叫划分操作。3、接着，算法对划分后的小数组重复之前的两个步骤，
// 直至数组已完全排序。

const swapQuickSort = function(arr, index1, index2){
	let temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
};

const partition = function(arr, left, right){
	let pivot = arr[Math.floor((right + left)/2)];
	let i = left;
	let j = right;

	while (i <= j){
		while (arr[i] < pivot){
			i++;
		}
		while (arr[j] > pivot){
			j--;
		}
		if(i<=j){
			swapQuickSort(arr, i, j);
			i++;
			j--;
		}
	}
	
	return i;
};

const quick = function quick(arr, left, right) {
    let index;
    if (arr.length > 1) {
        index = partition(arr, left, right);
		
		if (left < index-1) {
			quick(arr, left, index-1);
		}
		
		if(index < right){
			quick(arr, index, right);
		}
    }
};

const quickSort = function(){
	let arr = [5, 6, 2, 3, 1];
    quick(arr, 0, arr.length-1);
	console.log("quick sort: ", arr);
};

quickSort();