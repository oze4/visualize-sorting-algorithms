function* mergeSort(array) {
  yield* mergePartition(0, array.length - 1);
}

function* merge(start, mid, end) {
  let backgroundColor = (start === 0 && end === ARRAY.length - 1) ? BAR_COLORS.completed : BAR_COLORS.correct;
	let p = start;
	let q = mid + 1;
  let arr = [];

	for (let i = start; i <= end; i++) {
		if (p > mid) {
      arr.push(ARRAY[q].cloneNode());
			yield { type: "backgroundColor", value: BAR_COLORS.incorrect, index: q };
			q++;
		} else if (q > end || (Number(ARRAY[p].dataset.value) < Number(ARRAY[q].dataset.value))) {
      arr.push(ARRAY[p].cloneNode());
			yield { type: "backgroundColor", value: BAR_COLORS.incorrect, index: p };
			p++;
		} else {
			arr.push(ARRAY[q].cloneNode());
			yield { type: "backgroundColor", value: BAR_COLORS.incorrect, index: q };
			q++;
		}
	}

  for (let i = 0; i < arr.length; i++) {
    ARRAY[start] = arr[i];
    yield { type: "backgroundColor", index: start, value: backgroundColor };
    yield { type: "height", index: start, value: arr[i].style.height }
    start++;
  }
}

function* mergePartition(start, end) {
	if (start < end) {
		const mid = Math.floor((start + end) / 2);
		yield { type: "backgroundColor", value: BAR_COLORS.compare, index: mid };
		yield* mergePartition(start, mid);
		yield* mergePartition(mid + 1, end);
		yield* merge(start, mid, end);
	}
}

async function renderMergeSort(animations) {
  let next = animations.next();
  if (next.done) {
    return;
  }

  const { type, value, index } = next.value;
  divRenderBars.childNodes[index].style[type] = value;
  await sleep(sliderRenderDelayInput.dataset.value);

  await renderMergeSort(animations);
}