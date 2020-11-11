let InitializeGenerateTable = function() {
	let initializeGenerate = function() {
		let tr = '';
		for (i = 1; i <= 80; i++) {
			tr += `<tr class='text-center' id="row-${i}"">`
				+ `<td>${i}</td>`
				+ `<td>${i}</td>`
				+ `<td>-</td>`
				+ `<td>-</td>`
				+ `<td>-</td>`
				+ `<td>-</td>`
				+ `<td>-</td>`
				+ `<td>-</td>`
				+ `<td>-</td>`
				+ `<td>-</td>`
				+ `<td>-</td>`
				+ `<td>-</td>`
			+ `</tr>`;
		}

		$("#generate-retirement-tbl").append(tr);
	}
	return {
		init: function() {
			initializeGenerate();
		}
	};
}();