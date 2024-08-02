/**
 * ALGOANIMATION
 */
class AlgoAnimation {
	constructor(animation = { type: "", value: null, index: null, indexes: [], elements: [], sleepOverride: null }) {
		this.type = animation.type;
		this.value = animation.value;
		this.index = animation.index;
		this.indexes = animation.indexes;
		this.elements = animation.elements;
		this._sleepOverride = animation.sleepOverride;
	}

	static color(index, value) {
		this.type = "color";
		this.index = index;
		this.value = value;
		return this;
	}

	static colors(elements = [{ index: null, value: null }]) {
		this.type = "colors";
		this.elements = elements;
		return this;
	}

	static height(index, value) {
		this.type = "height";
		this.index = index;
		this.value = value;
		return this;
	}

	static swap(indexA, indexB) {
		this.type = "swap";
		this.indexes = [indexA, indexB];
		return this;
	}

	static sleepOverride(ms) {
		this._sleepOverride = ms;
		return this;
	}
}

/**
 * ANIMATOR
 */
class Animator {
	/**
	 * @param {AlgoAnimation} animation
	 */
	constructor(animation) {
		this.animation = animation;
	}

	/**
	 * Animates an AlgoAnimation
	 * - Expects each div where our array is rendered to contain a `data-value` attribute.
	 * @param {HTMLDivElement} divWhereArrayIsRendered
	 * @param {Number} sleepTimeMilliseconds
	 */
	async animate(divWhereArrayIsRendered, sleepTimeMilliseconds) {
		if (!divWhereArrayIsRendered.childElementCount || !divWhereArrayIsRendered) {
			return;
		}

		if (this.animation._sleepOverride !== null) {
			sleepTimeMilliseconds = this.animation._sleepOverride;
		}

		switch (this.animation.type) {
			case "color": {
				const { index, value } = this.animation;
				if (index >= 0 && index <= divWhereArrayIsRendered.childElementCount - 1) {
					divWhereArrayIsRendered.childNodes[index].style.backgroundColor = value;
				}
				await sleep(sleepTimeMilliseconds);
				break;
			}

			case "colors": {
				for (let i = 0; i < this.animation.elements.length; i++) {
					const { index, value } = this.animation.elements[i];
					if (index >= 0 && index <= divWhereArrayIsRendered.childElementCount - 1) {
						divWhereArrayIsRendered.childNodes[index].style.backgroundColor = value;
					}
				}
				await sleep(sleepTimeMilliseconds);
				break;
			}

			case "swap": {
				const [left, right] = this.animation.indexes;
				const temp = divWhereArrayIsRendered.childNodes[left].style.height;
				divWhereArrayIsRendered.childNodes[left].style.height = divWhereArrayIsRendered.childNodes[right].style.height;
				divWhereArrayIsRendered.childNodes[right].style.height = temp;
				await sleep(sleepTimeMilliseconds);
				break;
			}

			case "height": {
				const { index, value } = this.animation;
				divWhereArrayIsRendered.childNodes[index].style.height = value;
				await sleep(sleepTimeMilliseconds);
				break;
			}

			default: {
				console.error(`[Animator.animate] animation type : "${this.animation.type}" : not found!`, this.animation);
			}
		}
	}
}
