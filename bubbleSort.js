function* bubbleSort(array=[]) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < (array.length - 1 - i); j++) {
      if (array[j].dataset.value > array[j+1].dataset.value) {
        yield {
          type: "swap",
          greater: { index: j, element: array[j] },
          lesser: { index: j+1, element: array[j+1] }
        }
      } else {
        yield {
          type: "nop",
          greater: { index: j+1, element: array[j+1] },
          lesser: { index: j, element: array[j] }
        }
      }
    }
  }
}

async function renderBubbleSort(animations) {
  for (const { type, greater, lesser } of animations) {
    greater.element.style.backgroundColor = 'green'; 
    lesser.element.style.backgroundColor = 'red'; 

    await sleep(sliderRenderDelayInput.dataset.value / 2);
    
    if (type === "swap") {
      [ARRAY[greater.index], ARRAY[lesser.index]] = [ARRAY[lesser.index], ARRAY[greater.index]];
      await renderBars(ARRAY, divRenderBars);
    }

    await sleep(sliderRenderDelayInput.dataset.value / 2);
    
    lesser.element.style.backgroundColor = "black";
    // Completed elements will be blue
    greater.element.style.backgroundColor = "blue"
  }

  ARRAY[0].style.backgroundColor = "blue";
  // Enable sort button once sorting has finished.
  buttonSortArray.disabled = false;
}