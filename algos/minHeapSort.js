function* minHeapSort(array) {
	// Build min heap.
	const LEN = array.length - 1;
	for (let i = Math.floor((LEN - 1) / 2); i >= 0; i--) {
		yield* minHeapify(array, i, LEN);
	}

	for (let i = LEN; i >= 0; i--) {
		// Move current heap-root to the sorted partition at the right.
		yield AlgoAnimation.swap(0, i);
		yield AlgoAnimation.color(i, BAR_COLORS.completed);
		swap(array, 0, i);
		yield* minHeapify(array, 0, i - 1);
	}
}

function* minHeapify(array, index, length) {
	let left = 2 * index + 1;
	let right = 2 * index + 2;
	let smallest = index;

	// Check if left element has smaller value, if so, select it.
	if (left <= length && Number(array[left].dataset.value) < Number(array[smallest].dataset.value)) {
		yield AlgoAnimation.color(left, BAR_COLORS.compare);
		smallest = left;
	}

	// Check if right element has smaller value, if so, select it.
	if (right <= length && Number(array[right].dataset.value) < Number(array[smallest].dataset.value)) {
		if (smallest === left) {
			// "left" is no longer smallest.
			// Since we changed "left" to color.compare above, we should change it back to default here.
			yield AlgoAnimation.color(left, BAR_COLORS.default).sleepOverride(0);
		}
		yield AlgoAnimation.color(right, BAR_COLORS.compare);
		smallest = right;
	}

	// If either child has smallest value, swap and repeat.
	if (smallest !== index) {
		yield AlgoAnimation.swap(index, smallest);
		yield AlgoAnimation.colors([
			{ index: smallest, value: BAR_COLORS.incorrect },
			{ index: index, value: BAR_COLORS.correct },
		]);
		swap(array, index, smallest);
		yield* minHeapify(array, smallest, length);
	}
}
