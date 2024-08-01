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
