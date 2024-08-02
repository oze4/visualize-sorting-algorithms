function* shakerSort(array) {
	let isSwap = true;
	// Since each iteration will produce the largest and smallest elements,
	// we can  keep track of how many loops we have completed as to not process
	// unnecessary elements (which we already know are correct).
	let loops = 0;

	while (isSwap) {
		isSwap = false;

		for (let i = 0 + loops; i < array.length - 1 - loops; i++) {
			yield AlgoAnimation.colors([
				{ index: i, value: BAR_COLORS.compare },
				{ index: i + 1, value: BAR_COLORS.compare },
			]);

			if (Number(array[i].dataset.value) > Number(array[i + 1].dataset.value)) {
				yield AlgoAnimation.colors([
					{ index: i, value: BAR_COLORS.incorrect },
					{ index: i + 1, value: BAR_COLORS.incorrect },
				]);
				yield AlgoAnimation.swap(i, i + 1);
				swap(array, i, i + 1);
				isSwap = true;
			}

			yield AlgoAnimation.colors([
				{ index: i, value: BAR_COLORS.default },
				{ index: i + 1, value: BAR_COLORS.correct },
			]);
		}

		// "Last" element is now in correct position.
		yield AlgoAnimation.color(array.length - 1 - loops, BAR_COLORS.completed);

		// If nothing was swapped we know we are sorted and can break early.
		if (!isSwap) {
			break;
		}

		isSwap = false;
		for (let i = array.length - 2 - loops; i > 0 + loops; i--) {
			yield AlgoAnimation.colors([
				{ index: i, value: BAR_COLORS.compare },
				{ index: i - 1, value: BAR_COLORS.compare },
			]);

			if (Number(array[i].dataset.value) < Number(array[i - 1].dataset.value)) {
				yield AlgoAnimation.colors([
					{ index: i, value: BAR_COLORS.incorrect },
					{ index: i - 1, value: BAR_COLORS.incorrect },
				]);
				yield AlgoAnimation.swap(i, i - 1);
				swap(array, i, i - 1);
				isSwap = true;
			}

			yield AlgoAnimation.colors([
				{ index: i, value: BAR_COLORS.default },
				{ index: i - 1, value: BAR_COLORS.correct },
			]);
		}

		// "First" element is now in correct position.
		yield AlgoAnimation.color(loops, BAR_COLORS.completed);
		loops++;
	}

	// Mark remaining as completed
	for (let i = loops; i < array.length - loops; i++) {
		yield AlgoAnimation.color(i, BAR_COLORS.completed);
	}
}
