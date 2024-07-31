function* bubbleSort(array = []) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - 1 - i; j++) {
			yield new AlgoAnimation({ type: "colors", elements: [{ index: j, value: BAR_COLORS.compare }, { index: j+1, value: BAR_COLORS.compare }] });

			if (array[j].dataset.value > array[j + 1].dataset.value) {
				yield new AlgoAnimation({ type: "colors", elements: [{ index: j, value: BAR_COLORS.correct }, { index: j+1, value: BAR_COLORS.incorrect }] });
				yield new AlgoAnimation({ type: "swap", indexes: [j, j+1] });
				[array[j], array[j+1]] = [array[j+1], array[j]];
			}

			yield new AlgoAnimation({ type: "colors", elements: [{ index: j+1, value: BAR_COLORS.correct }, { index: j, value: BAR_COLORS.correct }] });
			yield new AlgoAnimation({ type: "colors", elements: [{ index: j, value: BAR_COLORS.default }, { index: j+1, value: BAR_COLORS.compare }] });
		}
		yield new AlgoAnimation({ type: "color", index: (array.length-1-i), value: BAR_COLORS.completed });
	}
}