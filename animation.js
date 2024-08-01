class AlgoAnimation {
	constructor(animation = { type: "", value: null, index: null, indexes: [], elements: [], sleepOverride: null }) {
		this.type = animation.type;
		this.value = animation.value;
		this.index = animation.index;
		this.indexes = animation.indexes;
		this.elements = animation.elements;
		this.sleepOverride = animation.sleepOverride;
	}
}

class Animator {
	/**
	 *
	 * @param {AlgoAnimation} animation
	 */
	constructor(animation) {
		this.animation = animation;
	}

	/**
	 *
	 * @param {HTMLDivElement} divWhereArrayIsRendered
	 * @param {Number} sleepTimeMilliseconds
	 */
	async animate(divWhereArrayIsRendered, sleepTimeMilliseconds) {
		if (!divWhereArrayIsRendered.childElementCount || !divWhereArrayIsRendered) {
			return;
		}

		if (this.animation.sleepOverride) {
			sleepTimeMilliseconds = this.animation.sleepOverride;
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
				throw new Error(`[Animator.animate] animation type : "${this.animation.type}" : not found!`);
			}
		}
	}
}
