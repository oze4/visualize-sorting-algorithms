function* bubbleSort(array = []) {
	for (let i = 0; i < array.length; i++) {
		let noSwaps = true;

		for (let j = 0; j < array.length - 1 - i; j++) {
			yield AlgoAnimation.colors([
				{ index: j, value: BAR_COLORS.compare },
				{ index: j + 1, value: BAR_COLORS.compare },
			]);

			if (array[j].dataset.value > array[j + 1].dataset.value) {
				yield AlgoAnimation.colors([
					{ index: j, value: BAR_COLORS.correct },
					{ index: j + 1, value: BAR_COLORS.incorrect },
				]);
				yield AlgoAnimation.swap(j, j + 1);
				swap(array, j, j + 1);
				noSwaps = false;
			}

			yield AlgoAnimation.colors([
				{ index: j + 1, value: BAR_COLORS.correct },
				{ index: j, value: BAR_COLORS.correct },
			]);
			yield AlgoAnimation.colors([
				{ index: j, value: BAR_COLORS.default },
				{ index: j + 1, value: BAR_COLORS.compare },
			]);
		}

		// no swaps this iteration means we are sorted and can safely skip remaining and break early.
		if (noSwaps) {
			for (let k = 0; k < array.length - i; k++) {
				yield AlgoAnimation.color(k, BAR_COLORS.completed);
			}
			break;
		}

		yield AlgoAnimation.color(array.length - 1 - i, BAR_COLORS.completed);
	}
}
