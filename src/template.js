

export default class Template {
	
	rangeList(items) {
		return items.reduce((a, item) => a + `<input type="range" class="input-range" data-id="${item.color}" value="${item.value}" min="0" max="100" />`, '');
	}

	
}
