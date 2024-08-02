function* maxHeapSort(array) {
	for (let i = Math.floor(array.length / 2); i >= 0; i--) {
		yield* heapify(array, i);
	}

	for (let i = array.length - 1; i >= 0; i--) {
		// Swap
		yield AlgoAnimation.swap(0, i);
		yield AlgoAnimation.colors([
			{ value: BAR_COLORS.correct, index: 0 },
			{ value: BAR_COLORS.correct, index: i },
		]);
		swap(array, 0, i);
		yield* heapify(array, 0, i);
	}

	// done. mark all as completed.
	for (let i = 0; i < array.length; i++) {
		yield AlgoAnimation.color(i, BAR_COLORS.completed).sleepOverride(1);
	}
}

function* heapify(array, index, length = array.length) {
	let largest = index;
	const left = index * 2 + 1;
	const right = index * 2 + 2;

	if (left < length && Number(array[left].dataset.value) > Number(array[largest].dataset.value)) {
		largest = left;
	}
	if (right < length && Number(array[right].dataset.value) > Number(array[largest].dataset.value)) {
		largest = right;
	}

	yield AlgoAnimation.colors([
		{ value: BAR_COLORS.compare, index: largest },
		{ value: BAR_COLORS.compare, index },
	]);

	if (largest !== index) {
		yield AlgoAnimation.swap(index, largest);
		yield AlgoAnimation.colors([
			{ value: BAR_COLORS.correct, index: index },
			{ value: BAR_COLORS.correct, index: largest },
		]);
		// Swap
		swap(array, index, largest);
		yield* heapify(array, largest, length);
	} else {
		yield AlgoAnimation.colors([
			{ value: BAR_COLORS.incorrect, index },
			{ value: BAR_COLORS.incorrect, index: largest },
		]);
	}
}
