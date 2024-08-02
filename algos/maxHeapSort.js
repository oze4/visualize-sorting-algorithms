function* maxHeapSort(array) {
	for (let i = Math.floor(array.length / 2); i >= 0; i--) {
		yield* maxHeapify(array, i);
	}

	for (let i = array.length - 1; i >= 0; i--) {
		// Swap
		yield AlgoAnimation.swap(0, i);
		yield AlgoAnimation.color(i, BAR_COLORS.completed);
		swap(array, 0, i);
		yield* maxHeapify(array, 0, i);
	}
}

function* maxHeapify(array, index, length = array.length) {
	let largest = index;
	const left = index * 2 + 1;
	const right = index * 2 + 2;

	if (left < length && Number(array[left].dataset.value) > Number(array[largest].dataset.value)) {
		yield AlgoAnimation.color(left, BAR_COLORS.compare);
		largest = left;
	}

	if (right < length && Number(array[right].dataset.value) > Number(array[largest].dataset.value)) {
		if (largest === left) {
			// "left" is no longer largest.
			// Since we changed "left" to color.compare above, we should change it back to default here.
			yield AlgoAnimation.color(left, BAR_COLORS.default);
		}
		yield AlgoAnimation.color(right, BAR_COLORS.compare);
		largest = right;
	}

	if (largest !== index) {
		yield AlgoAnimation.swap(index, largest);
		yield AlgoAnimation.colors([
			{ index: largest, value: BAR_COLORS.incorrect },
			{ index: index, value: BAR_COLORS.correct },
		]);
		// Swap
		swap(array, index, largest);
		yield* maxHeapify(array, largest, length);
	}
}
