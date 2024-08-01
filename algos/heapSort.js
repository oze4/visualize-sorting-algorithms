function* heapSort(array) {
	for (let i = Math.floor(array.length / 2); i >= 0; i--) {
		yield* heapify(array, i);
	}

	for (let i = array.length - 1; i >= 0; i--) {
		// Swap
		[array[0], array[i]] = [array[i], array[0]];
		yield new AlgoAnimation({ type: "swap", indexes: [0, i] });
		yield new AlgoAnimation({
			type: "colors",
			elements: [
				{ value: BAR_COLORS.correct, index: 0 },
				{ value: BAR_COLORS.correct, index: i },
			],
		});
		yield* heapify(array, 0, i);
	}

	// done. mark all as completed.
	for (let i = 0; i < array.length; i++) {
		yield new AlgoAnimation({ type: "color", value: BAR_COLORS.completed, index: i, sleepOverride: 1 });
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

	yield new AlgoAnimation({
		type: "colors",
		elements: [
			{ value: BAR_COLORS.compare, index: largest },
			{ value: BAR_COLORS.compare, index },
		],
	});

	if (largest !== index) {
		yield new AlgoAnimation({ type: "swap", indexes: [index, largest] });
		yield new AlgoAnimation({
			type: "colors",
			elements: [
				{ value: BAR_COLORS.correct, index },
				{ value: BAR_COLORS.correct, index: largest },
			],
		});
		// Swap
		[array[index], array[largest]] = [array[largest], array[index]];
		yield* heapify(array, largest, length);
	} else {
		yield new AlgoAnimation({
			type: "colors",
			elements: [
				{ value: BAR_COLORS.incorrect, index },
				{ value: BAR_COLORS.incorrect, index: largest },
			],
		});
	}
}
