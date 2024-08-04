/**
 * Globals and constants
 */

// Global arrays to hold elements and generators (animations).
let ARRAY = [];
let ANIMATIONS = [];
let MANUAL_STOP = false; // If stop button was pressed

const MIN_SPEED = 1; // ms
const MAX_SPEED = 1000; // ms
const DEFAULT_SPEED = 1; // ms

const BAR_COLORS = {
	default: "black",
	compare: "yellow",
	correct: "green",
	incorrect: "red",
	completed: "blue",
	pending: "darkgray", // pending confirmation
};

const SORTING_ALGOS = {
	"Merge Sort": {
		sort: mergeSort,
		recommendedArraySizes: [100, 250],
	},
	"Bubble Sort": {
		sort: bubbleSort,
		recommendedArraySizes: [20, 30],
	},
	"Quick Sort": {
		sort: quickSort,
		recommendedArraySizes: [100, 250],
	},
	"Shaker Sort": {
		sort: shakerSort,
		recommendedArraySizes: [20, 30],
	},
	"Heap Sort (Max)": {
		sort: maxHeapSort,
		recommendedArraySizes: [100, 250],
	},
	"Heap Sort (Min)": {
		sort: minHeapSort,
		recommendedArraySizes: [100, 250],
	},
};

/**
 * Select necessary DOM elements.
 */
const buttonGenerateArray = document.getElementById("generate-array");
const buttonSortArray = document.getElementById("sort-array");
const buttonStopSorting = document.getElementById("stop-sorting");
const selectArraySize = document.getElementById("array-size");
const selectAlgo = document.getElementById("sorting-algo");
const divRenderBars = document.getElementById("bars");
const sliderSpeed = document.getElementById("algo-speed");

/**
 * Setup selected DOM elements, if needed.
 */
sliderSpeed.min = MIN_SPEED;
sliderSpeed.max = MAX_SPEED;
sliderSpeed.dataset.value = DEFAULT_SPEED;
sliderSpeed.value = MAX_SPEED - DEFAULT_SPEED;

// Add available algos to select
for (const algo of Object.keys(SORTING_ALGOS)) {
	selectAlgo.add(new Option(algo, algo));
}

/**
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * EVENT HANDLERS  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

/**
 * Handle sort array button click.
 */
buttonSortArray.addEventListener("click", async (event) => {
	// Disable controls while sorting.
	buttonSortArray.disabled = true;
	buttonGenerateArray.disabled = true;
	selectAlgo.disabled = true;
	selectArraySize.disabled = true;
	// Enable stop button while sorting
	buttonStopSorting.disabled = false;

	// Get the algo that is selected.
	const chosenSortingAlgo = SORTING_ALGOS[selectAlgo.value];
	ANIMATIONS = chosenSortingAlgo.sort(ARRAY);
	await renderAnimations(ANIMATIONS);
	// Verify we are sorted only if we were not manually interrupted.
	if (!MANUAL_STOP && !isSorted(ARRAY)) {
		alert("not sorted, something went wrong!");
	}

	// Enable controls after sorting
	buttonSortArray.disabled = false;
	buttonGenerateArray.disabled = false;
	selectAlgo.disabled = false;
	selectArraySize.disabled = false;
	// Disable stop button after sorting
	buttonStopSorting.disabled = true;

	// Reset manual stop "flag".
	MANUAL_STOP = false;
});

/**
 * Handle stop button click.
 * We replace ANIMATIONS with a fake generator.
 */
buttonStopSorting.addEventListener("click", (event) => {
	MANUAL_STOP = true;
	ANIMATIONS.return("stopped");
	const e = new MouseEvent("click");
	buttonGenerateArray.dispatchEvent(e);
});

/**
 * Handle generate array button click.
 */
buttonGenerateArray.addEventListener("click", async (event) => {
	buttonSortArray.disabled = false;
	const size = parseInt(selectArraySize.value);
	ARRAY = newUnsortedArray(size, (_, i) => {
		let val = ((i + 1) / size) * 100;
		if (size > 100) {
			val = val + i / size;
		}
		return newBar({ index: i, classes: ["bar"], defaultValue: val });
	});
	await renderBars(ARRAY, divRenderBars);
});

/**
 * Handle array size selection.
 */
selectArraySize.addEventListener("change", (event) => {
	buttonSortArray.disabled = true;
	if (selectAlgo.value) {
		buttonGenerateArray.disabled = false;
	}
	divRenderBars.innerHTML = "";
	buttonGenerateArray.click();
});

/**
 * Handle algorithm selection.
 */
selectAlgo.addEventListener("change", (event) => {
	/** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 * - - - - - - - - - - - - TODO : CLEAN THIS UP - - - - - - - - - - - - - - - - - - - -
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
	// Clear recommended sizes and add new ones.
	const optGroup = selectArraySize.querySelector("#recommended-array-sizes");
	const chosenAlgo = SORTING_ALGOS[selectAlgo.value];
	optGroup.replaceChildren();
	selectArraySize.value = chosenAlgo.recommendedArraySizes[0] || "";
	if (!chosenAlgo.recommendedArraySizes.length) {
		optGroup.hidden = true;
	} else {
		for (let i = 0; i < chosenAlgo.recommendedArraySizes.length; i++) {
			const val = chosenAlgo.recommendedArraySizes[i];
			const option = new Option(val, val);
			if (val > 100) { // If val is greater than 100, hide it on mobile.
				option.classList.add("hidden-on-mobile");
			}
			console.log(val, option);
			optGroup.appendChild(option);
		}
		optGroup.appendChild(document.createElement("hr"));
		optGroup.hidden = false;
	}
	/** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - --
	 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

	// If array is generated, enable sort button, else disable.
	buttonSortArray.disabled = !ARRAY.length;
	if (selectArraySize.value) {
		buttonGenerateArray.disabled = false;
		buttonGenerateArray.click();
	}
});

/**
 * Handle delay slider change
 */
sliderSpeed.addEventListener("input", (event) => {
	const value = MAX_SPEED - event.target.value + 1;
	sliderSpeed.dataset.value = value;
});

/**
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

/**
 *
 * @param {HTMLElement[]} array We check the `dataset.value` attritube for a Number
 */
function isSorted(array) {
	let sorted = true;
	for (let i = 1; i < array.length; i++) {
		if (Number(array[i - 1].dataset.value) > Number(array[i].dataset.value)) {
			sorted = false;
			break;
		}
	}

	// Since we may have some arrays sorted from largest to smallest (min heap sort),
	// check if we are sorted in small-> large before returning.
	if (!sorted) {
		for (let i = array.length - 1; i > 0; i--) {
			if (Number(array[i].dataset.value) > Number(array[i - 1].dataset.value)) {
				return false;
			}
		}
	}

	return true;
}

/**
 *
 * @param {AlgoAnimation[]} animations
 */
async function renderAnimations(animations) {
	for (const animation of animations) {
		const animator = new Animator(animation);
		await animator.animate(divRenderBars, sliderSpeed.dataset.value);
	}
}

/**
 *
 * @param {Number} ms : time to sleep in milliseconds
 */
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 *
 * @param {Number} index
 * @param {DOMTokenList} classes
 */
function newBar({ index, classes = [], defaultValue = null } = {}) {
	const bar = document.createElement("div");

	let height = `${defaultValue}%`;
	if (defaultValue === undefined || defaultValue === null) {
		defaultValue = Math.random();
		height = `${defaultValue * divRenderBars.offsetHeight}px`;
	}

	bar.dataset.value = defaultValue;
	bar.dataset.index = index;
	bar.id = `${index}-${defaultValue}`;
	bar.style.backgroundColor = BAR_COLORS.default;
	bar.style.height = height;
	bar.classList = classes;
	return bar;
}

/**
 * Renders a bar graph, essentially.
 * @param {HTMLElement[]} array : Array of Bar where each Bar.value is < 1.
 * @param {HTMLElement} appendToElement
 */
function renderBars(array, appendToElement, sleepMS = 0) {
	return new Promise((resolve, reject) => {
		if (!array.length) {
			reject();
		}

		appendToElement.innerHTML = "";
		for (let i = 0; i < array.length; i++) {
			appendToElement.appendChild(array[i]);
		}

		resolve();
	});
}

/**
 * Creates an array, shuffles it, returns it.
 * @param {Number} numElements : Number of elements in array
 * @param {(currentElement:T, currentIndex:Number) => T} mapFn : Provide a value at each index.
 *        This function is passed to the built in Array map function. eg; `Array.from({}, mapFn)`.
 * @returns {Array<T>}
 */
function newUnsortedArray(numElements, mapFn) {
	const arr = Array.from({ length: numElements }, mapFn);
	shuffleArray(arr);
	return arr;
}

/**
 * Shuffles an array in place.
 * @param {Array<T>} array
 */
function shuffleArray(array) {
	const LEN = array.length;
	for (let i = 0; i < LEN; i++) {
		const randomIndex = Math.floor(Math.random() * LEN);
		array[i].dataset.index = randomIndex;
		array[randomIndex].dataset.index = i;
		[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
	}
}

/**
 * Returns random int inclusive to range.
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function randomInt(min = 0, max = 100) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
