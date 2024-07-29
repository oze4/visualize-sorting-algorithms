/**
 * Globals and constants
 */

// Global array to hold elements
let ARRAY = [];

const MIN_SPEED = 1; // ms
const MAX_SPEED = 1000; // ms
const DEFAULT_SPEED = 10; // ms
const BAR_COLORS = {
  default: "black",
  compare: "yellow",
  correct: "green",
  incorrect: "red",
  completed: "blue"
}

const AVAILABLE_SORTING_ALGORITHMS = {
  "Merge Sort": {
    sort: mergeSort,
    render: renderMergeSort,
  },
  "Bubble Sort": {
    sort: bubbleSort,
    render: renderBubbleSort
  }
}

/**
 * Select necessary DOM elements.
 */
const buttonGenerateArray = document.getElementById("generate-array");
const buttonSortArray = document.getElementById("sort-array");
const selectArraySize = document.getElementById("array-size");
const selectAlgo = document.getElementById("sorting-algo");
const divRenderBars = document.getElementById("bars");
const sliderRenderDelayInput = document.getElementById("render-delay-slider");
const sliderRenderDelayValueDisplay = document.getElementById("render-delay-value");

/**
 * Setup selected DOM elements, if needed.
 */
sliderRenderDelayInput.min = MIN_SPEED;
sliderRenderDelayInput.max = MAX_SPEED;
sliderRenderDelayInput.dataset.value = DEFAULT_SPEED;
sliderRenderDelayInput.value = MAX_SPEED-DEFAULT_SPEED;
sliderRenderDelayValueDisplay.innerHTML = `${DEFAULT_SPEED}ms`;

// Add available algos to select
for (const algo of Object.keys(AVAILABLE_SORTING_ALGORITHMS)) {
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
  // Disable sort button while we are currently sorting.
  buttonSortArray.disabled = true;
  buttonGenerateArray.disabled = true;
  // Get the algo that is selected.
  const chosenSortingAlgo = AVAILABLE_SORTING_ALGORITHMS[selectAlgo.value];
  const animations = chosenSortingAlgo.sort(ARRAY);
	await chosenSortingAlgo.render(animations);
  buttonSortArray.disabled = false;
  buttonGenerateArray.disabled = false;
});

/**
 * Handle generate array button click.
 */
buttonGenerateArray.addEventListener("click", async (event) => {
  buttonSortArray.disabled = false;
	ARRAY = newUnsortedArray(parseInt(selectArraySize.value), (_, i) => newBar(i, ["bar"]));
	await renderBars(ARRAY, divRenderBars);
});

/**
 * Handle array size selection.
 */
selectArraySize.addEventListener("change", (event) => {
  // If sort button is enabled, disable it until a new array is generated.
  if (!buttonSortArray.disabled) {
    buttonSortArray.disabled = true;
  }
	if (selectAlgo.value) {
		buttonGenerateArray.disabled = false;
	}
  divRenderBars.innerHTML = "";
  ARRAY = [];
});

/**
 * Handle algorithm selection.
 */
selectAlgo.addEventListener("change", (event) => {
  // If sort button is enabled, disable it until a new array is generated.
  if (!buttonSortArray.disabled) {
    buttonSortArray.disabled = true;
  }
	if (selectArraySize.value) {
		buttonGenerateArray.disabled = false;
	}
});

/**
 * Handle delay slider change
 */
sliderRenderDelayInput.addEventListener('input', (event) => {
  const value = MAX_SPEED-(event.target.value)+1;
  sliderRenderDelayValueDisplay.innerHTML = `${value}ms`;
  sliderRenderDelayInput.dataset.value = value
});

/**
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 
 * @param {Number} index 
 * @param {DOMTokenList} classes 
 */
function newBar(index, classes=[]) {
  const bar = document.createElement("div");
  const value = Math.random();
  bar.dataset.value = value;
  bar.dataset.index = index;
  bar.id = `${index}-${value}`;
  bar.style.backgroundColor = BAR_COLORS.default;
  bar.style.height = `${value*100}%`;
  bar.classList = classes;
  return bar;
}

/**
 * Renders a bar graph, essentially.
 * @param {HTMLElement[]} array : Array of Bar where each Bar.value is < 1.
 * @param {HTMLElement} appendToElement
 */
function renderBars(array, appendToElement, sleepMS=0) {
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
