// 将原始数组分成较小的数组,直到每个小数组只有一个位置,接着将小数组归并为大数组.
// 

const merge = function(left, right){
	let res = [];
	let l = 0;
	let r = 0;
	
	while (l < left.length && r < right.length){
		if(left[l] < right[r]){
			res.push(left[l++]);
		}else {
			res.push(right[r++])
		}
	}
	// 将剩余的放后面
	while(l < left.length){
		res.push(left[l++])
	}
	
	while(r < right.length){
		res.push(right[r++])
	}
	return res;
}

const mergeSort = function(arr){
	let len = arr.length;
	if(len === 1) return arr;
	let mid = Math.floor(len/2);
	let left = arr.slice(0, mid);
	let right = arr.slice(mid, len);
	
	return merge(mergeSort(left), mergeSort(right))	
}

let arr = [5, 6, 2, 3, 1];
console.log(mergeSort(arr))