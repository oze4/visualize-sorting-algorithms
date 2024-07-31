function* cocktailShakerSort(array) {
	let isSwap = true;
	// Since each iteration will produce the largest and smallest elements,
	// we can  keep track of how many loops we have completed as to not process
	// unnecessary elements (which we already know are correct).
	let loops = 0;

	while (isSwap) {
		isSwap = false;
		for (let i = 0 + loops; i < array.length - 1 - loops; i++) {
			yield {
				type: "colors",
				elements: [
					{ index: i, value: BAR_COLORS.compare },
					{ index: i + 1, value: BAR_COLORS.compare },
				],
			};
			if (Number(array[i].dataset.value) > Number(array[i + 1].dataset.value)) {
				yield {
					type: "colors",
					elements: [
						{ index: i, value: BAR_COLORS.incorrect },
						{ index: i + 1, value: BAR_COLORS.incorrect },
					],
				};
				yield { type: "swap", leftIndex: i, rightIndex: i + 1 };
				[array[i], array[i + 1]] = [array[i + 1], array[i]];
				isSwap = true;
			}
			yield {
				type: "colors",
				elements: [
					{ index: i, value: BAR_COLORS.default },
					{ index: i + 1, value: BAR_COLORS.correct },
				],
			};
		}

		// "Last" element is now in correct position.
		yield { type: "color", index: array.length - 1 - loops, value: BAR_COLORS.completed };

		// If nothing was swapped we know we are sorted and can break early.
		if (!isSwap) {
			break;
		}

		isSwap = false;
		for (let i = array.length - 2 - loops; i > 0 + loops; i--) {
			yield {
				type: "colors",
				elements: [
					{ index: i, value: BAR_COLORS.compare },
					{ index: i - 1, value: BAR_COLORS.compare },
				],
			};
			if (Number(array[i].dataset.value) < Number(array[i - 1].dataset.value)) {
				yield {
					type: "colors",
					elements: [
						{ index: i, value: BAR_COLORS.incorrect },
						{ index: i - 1, value: BAR_COLORS.incorrect },
					],
				};
				yield { type: "swap", leftIndex: i, rightIndex: i - 1 };
				[array[i], array[i - 1]] = [array[i - 1], array[i]];
				isSwap = true;
			}
			yield {
				type: "colors",
				elements: [
					{ index: i, value: BAR_COLORS.default },
					{ index: i - 1, value: BAR_COLORS.correct },
				],
			};
		}

		// "First" element is now in correct position.
		yield { type: "color", index: 0 + loops, value: BAR_COLORS.completed };

		loops++;
	}

	// Mark remaining as completed
	for (let i = loops; i < array.length - loops; i++) {
		yield { type: "color", index: i, value: BAR_COLORS.completed };
	}
}

async function renderCocktailShakerSort(animations) {
	for (const animation of animations) {
		if (animation.type === "color") {
			const { index, value } = animation;
			divRenderBars.childNodes[index].style.backgroundColor = value;
			await sleep(sliderSpeed.dataset.value);
		}
		if (animation.type === "colors") {
			for (let i = 0; i < animation.elements.length; i++) {
				const { index, value } = animation.elements[i];
				divRenderBars.childNodes[index].style.backgroundColor = value;
			}
			await sleep(sliderSpeed.dataset.value);
		}
		if (animation.type === "swap") {
			const { leftIndex, rightIndex } = animation;
			const temp = divRenderBars.childNodes[leftIndex].style.height;
			divRenderBars.childNodes[leftIndex].style.height = divRenderBars.childNodes[rightIndex].style.height;
			divRenderBars.childNodes[rightIndex].style.height = temp;
			await sleep(sliderSpeed.dataset.value);
		}
	}
}
