function* quickSort(array) {
	yield* sort(array, 0, array.length - 1);
}

function* partition(arr, start, end) {
	const mid = Math.floor((start + end) / 2);
	// select the pivot
	let pivot = Number(arr[mid].dataset.value);
	// move pivot to end;
	[arr[mid], arr[end]] = [arr[end], arr[mid]];
	yield new AlgoAnimation({ type: "swap", indexes: [mid, end] });
	yield new AlgoAnimation({ type: "color", value: "cyan", index: end });

	// set bounds
	let left = start;
	let right = end - 1;

	while (left <= right) {
		yield new AlgoAnimation({
			type: "colors",
			elements: [
				{ index: left, value: BAR_COLORS.compare },
				{ index: right, value: BAR_COLORS.compare },
				{ index: start, value: "orange" },
				{ index: end - 1, value: "orange" },
			],
		});

		// Once we have left value greater or equal to pivot AND a right value that is less than the pivot we swap those two values
		// (or right bound crosses left bound, which would break the while condition)
		if (Number(arr[left].dataset.value) >= pivot && Number(arr[right].dataset.value) < pivot) {
			yield new AlgoAnimation({
				type: "colors",
				elements: [
					{ index: left, value: BAR_COLORS.incorrect },
					{ index: right, value: BAR_COLORS.incorrect },
				],
			});
			yield new AlgoAnimation({ type: "swap", indexes: [left, right] });
			[arr[left], arr[right]] = [arr[right], arr[left]];
			continue;
		}

		if (Number(arr[left].dataset.value) < pivot) {
			yield new AlgoAnimation({ type: "color", value: BAR_COLORS.default, index: left });
			left++;
		}
		if (Number(arr[right].dataset.value) >= pivot) {
			yield new AlgoAnimation({ type: "color", value: BAR_COLORS.default, index: right });
			right--;
		}

		yield new AlgoAnimation({
			type: "colors",
			elements: [
				{ index: left, value: BAR_COLORS.correct },
				{ index: right, value: BAR_COLORS.correct },
			],
		});
	}

	// right bound has crossed left bound
	yield new AlgoAnimation({ type: "swap", indexes: [left, end] });
	yield new AlgoAnimation({ type: "color", index: end, value: BAR_COLORS.correct });
	[arr[left], arr[end]] = [arr[end], arr[left]];

	return left;
}

function* sort(arr, start, end) {
	if (start < end) {
		const pivot = yield* partition(arr, start, end);
		yield* sort(arr, start, pivot - 1);
		yield* sort(arr, pivot + 1, end);
		if (start === 0 && end === arr.length - 1) {
			for (let i = start; i <= end; i++) {
				yield new AlgoAnimation({ type: "color", value: BAR_COLORS.completed, index: i });
			}
		}
	}
}
