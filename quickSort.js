function* quickSort(array) {
  yield* sort(0, array.length-1);
}

function* quickPartition(start, end) {
  let left = start+1;
  let pivotElement = ARRAY[start]; 
  yield { type: "color", index: start, value: "cyan" };

  for (let j = start+1; j <= end; j++) {
    if (Number(ARRAY[j].dataset.value) < Number(pivotElement.dataset.value)) {
      yield { type: "color", index: j, value: BAR_COLORS.compare };
      yield { type: "color", index: left, value: BAR_COLORS.incorrect };
      yield { type: "color", index: j, value: BAR_COLORS.incorrect };
      // swap
      yield { type: "swap", leftIndex: left, rightIndex: j };
      [ARRAY[left], ARRAY[j]] = [ARRAY[j], ARRAY[left]];
      yield { type: "color", index: left, value: BAR_COLORS.incorrect };
      yield { type: "color", index: j, value: BAR_COLORS.incorrect };
      yield { type: "color", index: j, value: BAR_COLORS.default };
      yield { type: "color", index: left, value: BAR_COLORS.default };
      left++;
    } 
  }

  yield { type: "swap", leftIndex: start, rightIndex: left-1 };
  [ARRAY[start], ARRAY[left-1]] = [ARRAY[left-1], ARRAY[start]];
  yield { type: "color", index: start, value: BAR_COLORS.incorrect };
  yield { type: "color", index: left-1, value: BAR_COLORS.incorrect };

  for (let i = start; i <= left; i++) {
    yield { type: "color", index: i, value: BAR_COLORS.correct };
  }

  return left-1;
}

function* sort(start, end) {
  if (start < end) {
    const pivot = yield* quickPartition(start, end);
    yield* sort(start, pivot-1);
    yield* sort(pivot+1, end);
  }
}

async function renderQuickSort(animations) {
  for (const animation of animations) {
    if (animation.type === "color") {
      const { index, value } = animation;
      if (index < divRenderBars.childElementCount) {
        divRenderBars.childNodes[index].style.backgroundColor = value;
        await sleep(sliderSpeed.dataset.value);
      }
    }
    if (animation.type === "swap") {
      const { leftIndex, rightIndex } = animation;
      const temp = divRenderBars.childNodes[leftIndex].style.height;
      divRenderBars.childNodes[leftIndex].style.height = divRenderBars.childNodes[rightIndex].style.height;
      divRenderBars.childNodes[rightIndex].style.height = temp;
      await sleep(sliderSpeed.dataset.value);
    }
    if (animation.type === "sleep") {
      let v = animation.value;
      if (!animation.value) {
        v = sliderSpeed.dataset.value;
      }
      await sleep(v);
    }
  }
}