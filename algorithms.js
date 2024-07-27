const AVAILABLE_SORTING_ALGORITHMS = {
  /**
   * Bubble Sort
   * @param {Array<Bar>} array 
   */
  "Bubble Sort": {
    /**
     * 
     * @param {HTMLElement[]} array 
     */
    sort: function* (array=[]) {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < (array.length - 1 - i); j++) {
          if (array[j].dataset.value > array[j+1].dataset.value) {
            yield ["swap", [{index: j, element: array[j] }, {index: j+1, element: array[j+1] }]];
          } else {
            yield ["nop", [{index:j+1, element: array[j+1]}, {index: j, element: array[j]}]];
          }
        }
      }
    },
    render: async function(animations) {
      const beeper = new Beep();

      for (const [type, [i, j]] of animations) {
        i.element.style.backgroundColor = 'green';
        j.element.style.backgroundColor = 'red';
  
        await sleep(sliderRenderDelayInput.value);

        beeper.playNote(200+Number(i.element.dataset.value)*400, 0.08);
        beeper.playNote(200+Number(j.element.dataset.value)*400, 0.08);
  
        if (type === "nop") {
          i.element.style.backgroundColor = "green";
          j.element.style.backgroundColor = "black";
        }
        
        if (type === "swap") {
          [ARRAY[i.index], ARRAY[j.index]] = [ARRAY[j.index], ARRAY[i.index]];
          await renderBars(ARRAY, divRenderBars);
          i.element.style.backgroundColor = "green";
          j.element.style.backgroundColor = "black";
        }
      }
      ARRAY[0].style.backgroundColor = "green";
      // Enable sort button once sorting has finished.
      buttonSortArray.disabled = false;
    }
  }
}