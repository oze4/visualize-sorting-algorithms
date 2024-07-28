function mergeSort(array) {
  
}

function renderMergeSort(animations) {

}

/*
function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }

  let mid = Math.floor(array.length / 2);

  let leftArr = [];
  for (let i = 0; i < mid; i++) {
    leftArr.push({ element: array[i], originalIndex: i });
  }

  let rightArr = [];
  for (let i = mid; i < array.length; i++) {
    rightArr.push({ element: array[i], originalIndex: i });
  }

  let left = mergeSort(leftArr);
  let right = mergeSort(rightArr);
  return merge(left, right);
}

function merge(left, right) {
  let sortedArr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  while (left.length) {
    sortedArr.push(left.shift());
  }
  while (right.length) {
    sortedArr.push(right.shift());
  }
  return sortedArr;
}
*/