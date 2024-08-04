function* quickSort(array) {
	yield* sort(array, 0, array.length - 1);
}

function* partition(arr, start, end) {
	const mid = Math.floor((start + end) / 2);
	// select the pivot
	let pivot = Number(arr[mid].dataset.value);
	// move pivot to end;
	swap(arr, mid, end);
	yield AlgoAnimation.swap(mid, end);
	yield AlgoAnimation.color(end, "cyan");

	// set bounds
	let left = start;
	let right = end;

	while (left <= right) {
		yield AlgoAnimation.colors([
			{ index: left, value: BAR_COLORS.compare },
			{ index: right, value: right === end ? "cyan" : BAR_COLORS.compare },
		]);

		// Once we have left value greater or equal to pivot AND a right value that is less than the pivot we swap those two values
		// (or right bound crosses left bound, which would break the while condition)
		if (Number(arr[left].dataset.value) >= pivot && Number(arr[right].dataset.value) < pivot) {
			yield AlgoAnimation.colors([
				{ index: left, value: BAR_COLORS.incorrect },
				//{ index: right, value: BAR_COLORS.incorrect },
			]);
			yield AlgoAnimation.swap(left, right);
			swap(arr, left, right);
			continue;
		}

		if (Number(arr[left].dataset.value) < pivot) {
			yield AlgoAnimation.color(left, BAR_COLORS.default);
			left++;
		}
		if (Number(arr[right].dataset.value) >= pivot) {
			yield AlgoAnimation.color(right, right === end ? "cyan" : BAR_COLORS.default);
			right--;
		}

		yield AlgoAnimation.colors([
			{ index: left, value: BAR_COLORS.correct },
			{ index: right, value: BAR_COLORS.correct },
		]);
	}

	// right bound has crossed left bound
	yield AlgoAnimation.swap(left, end);
	yield AlgoAnimation.color(end, BAR_COLORS.correct);
	swap(arr, left, end);

	return left;
}

function* sort(arr, start, end) {
	if (start < end) {
		const pivot = yield* partition(arr, start, end);
		yield* sort(arr, start, pivot - 1);
		yield* sort(arr, pivot + 1, end);

		if (start === 0 && end === arr.length - 1) {
			for (let i = start; i <= end; i++) {
				yield AlgoAnimation.color(i, BAR_COLORS.completed);
			}
		}
	}
}
