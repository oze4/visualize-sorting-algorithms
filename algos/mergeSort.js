function* mergeSort(array) {
	yield* mergePartition(array, 0, array.length - 1);
	for (let i = 0; i < array.length; i++) {
		yield AlgoAnimation.color(i, BAR_COLORS.completed);
	}
}

function* merge(array, start, mid, end) {
	let p = start;
	let q = mid + 1;
	let arr = [];

	for (let i = start; i <= end; i++) {
		if (p > mid) {
			arr.push(array[q].cloneNode());
			yield AlgoAnimation.color(q, BAR_COLORS.incorrect);
			q++;
		} else if (q > end || Number(array[p].dataset.value) < Number(array[q].dataset.value)) {
			arr.push(array[p].cloneNode());
			yield AlgoAnimation.color(p, BAR_COLORS.incorrect);
			p++;
		} else {
			arr.push(array[q].cloneNode());
			yield AlgoAnimation.color(q, BAR_COLORS.incorrect);
			q++;
		}
	}

	for (let i = 0; i < arr.length; i++) {
		array[start] = arr[i];
		yield AlgoAnimation.color(start, BAR_COLORS.correct);
		yield AlgoAnimation.height(start, arr[i].style.height);
		start++;
	}
}

function* mergePartition(arr, start, end) {
	if (start < end) {
		const mid = Math.floor((start + end) / 2);
		yield AlgoAnimation.color(mid, BAR_COLORS.compare);
		yield* mergePartition(arr, start, mid);
		yield* mergePartition(arr, mid + 1, end);
		yield* merge(arr, start, mid, end);
	}
}
