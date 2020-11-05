function commaSeparator(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let InitializeIncomeAndExpenses = function() {
	let initialize = function() {
		let monthlyIncome 	= $("#income").val().trim();
		let monthlyExpenses = 0;
		let operatingTotal 	= 0;
		let financingTotal 	= 0;
		let investingTotal 	= 0;
		let yearlyIncome 	= 0;
		let yearlyExpenses 	= 0;

		if (monthlyIncome == '') { return false; }

		$("#financing-activities-tbl").find('input[type="number"]').each(function(){
			financingTotal += parseFloat($(this).val());
		});

		$("#investing-activities-tbl").find('input[type="number"]').each(function(){
			investingTotal += parseFloat($(this).val());
		});

		$("#operating-activities-tbl").find('input[type="number"]').each(function(){
			operatingTotal += parseFloat($(this).val());
		});

		yearlyIncome 	= parseInt(monthlyIncome) * 12;
		monthlyExpenses = ( financingTotal + investingTotal + operatingTotal );
		yearlyExpenses 	= monthlyExpenses * 12;

		$("#expenses").empty().html(`₱ ${commaSeparator(monthlyExpenses.toFixed(2))}`);
		$("#yearly-income").empty().html(`₱ ${commaSeparator(yearlyIncome.toFixed(2))}`);
		$("#yearly-expenses").empty().html(`₱ ${commaSeparator(yearlyExpenses.toFixed(2))}`);
	}
	return {
		init: function() {
			initialize();
		}
	};
}();
// [end] Initialize income and expenses

// [start] Operating Activities
let InitializeOperatingActivities = function() {
	let initOperatingAct = function() {
		$("body").on("click", "#add-operating-btn", function() {
			
			let table 	= $("#operating-activities-tbl tbody");
			let len 	= table.length;
			let rows 	= '';

			rows += `<tr>`
				+ `<td><input type="text" class="form-control form-control-sm" maxLength="20" placeholder="Description.."/></td>`
				+ `<td>
					<div class="input-group">		
						<input type="number" class="form-control form-control-sm" placeholder="Cost.." value="0" />
						<div class="input-group-prepend">
							<button class="btn btn-sm btn-danger remove" id="remove" type="button" id="button-addon1">x</button>
						</div>
					</div> 
				</td>`
				+ `</tr>`;
			table.append(rows);
		});
	};
	return {
		init:function() {
			initOperatingAct();
		}
	}
}();

let InitCalculateOperatingActivities = function () {
	let initCalculate = function() {
		$("#operating-activities-tbl #calculate").on("click", function() {
			let total 			= 0;
			let monthy 			= 0;
			let recommended 	= 0;
			let unused 			= 0;
			let exceed 			= 0;
			let income 			= parseFloat($("#income").val().trim());

			if ($("#income").val().trim() == '') { return false; }

			$("#operating-activities-tbl").find('input[type="number"]').each(function(){
				total += parseFloat($(this).val());
			});

			total 	= total.toFixed(2);
			monthly = (total / income) * 100;
			recommended = (0.6 * income);
			if (recommended > total) { unused = recommended - total; }
			if (total > recommended) { exceed = total - recommended; }


			$("#operating-activities-tbl #total").empty().html(`₱ ${commaSeparator(total)}`);
			$("#operating-activities-tbl #monthly").empty().html(`${commaSeparator(monthly.toFixed(2))}%`);
			$("#operating-activities-tbl #recommended").empty().html(`₱ ${commaSeparator(recommended.toFixed(2))}`);
			$("#operating-activities-tbl #unused").empty().html(`₱ ${commaSeparator(unused.toFixed(2))}`);
			$("#operating-activities-tbl #exceed").empty().html(`₱ ${commaSeparator(exceed.toFixed(2))}`);

			InitializeIncomeAndExpenses.init();
		});
	};
	return {
		init: function() {
			initCalculate();
		}
	}
}();
// [end] Operating Activities

// [start] Investing Activities
let InitializeInvestingActivities = function() {
	let initInvestingAct = function() {
		$("body").on("click", "#add-investing-btn", function() {
			
			let table 	= $("#investing-activities-tbl tbody");
			let len 	= table.length;
			let rows 	= '';

			rows += `<tr>`
				+ `<td><input type="text" class="form-control form-control-sm" maxLength="20" placeholder="Description.."/></td>`
				+ `<td>
					<div class="input-group">		
						<input type="number" class="form-control form-control-sm" placeholder="Cost.." value="0" />
						<div class="input-group-prepend">
							<button class="btn btn-sm btn-danger remove" id="remove" type="button" id="button-addon1">x</button>
						</div>
					</div> 
				</td>`
				+ `</tr>`;

			table.append(rows);
		});
	};
	return {
		init:function() {
			initInvestingAct();
		}
	}
}();

let InitCalculateInvestingActivities = function () {
	let initCalculate = function() {
		$("#investing-activities-tbl #calculate").on("click", function() {
			let total 			= 0;
			let monthy 			= 0;
			let minimum 		= 0;
			let notinvested 	= 0;
			let income 			= parseFloat($("#income").val().trim());

			if ($("#income").val().trim() == '') { return false; }

			$("#investing-activities-tbl").find('input[type="number"]').each(function(){
				total += parseFloat($(this).val());
			});

			total 	= total.toFixed(2);
			monthly = (total / income) * 100;
			minimum = (0.2 * income);
			if (total < minimum) { notinvested = minimum - total; }

			$("#investing-activities-tbl #total").empty().html(`₱ ${total}`);
			$("#investing-activities-tbl #monthly").empty().html(`${monthly.toFixed(2)}%`);
			$("#investing-activities-tbl #minimum").empty().html(`₱ ${minimum.toFixed(2)}`);
			$("#investing-activities-tbl #notinvested").empty().html(`₱ ${notinvested.toFixed(2)}`);

			InitializeIncomeAndExpenses.init();
		});
	};
	return {
		init: function() {
			initCalculate();
		}
	}
}();

// [end] Investing Activities


// [start] Financing Activities
let InitializeFinancingActivities = function() {
	let initFinancingAct = function() {
		$("body").on("click", "#add-financing-btn", function() {
			
			let table 	= $("#financing-activities-tbl tbody");
			let len 	= table.length;
			let rows 	= '';

			rows += `<tr>`
				+ `<td><input type="text" class="form-control form-control-sm" maxLength="20" placeholder="Description.."/></td>`
				+ `<td>
					<div class="input-group">		
						<input type="number" class="form-control form-control-sm" placeholder="Cost.." value="0" />
						<div class="input-group-prepend">
							<button class="btn btn-sm btn-danger remove" id="remove" type="button" id="button-addon1">x</button>
						</div>
					</div> 
				</td>`
				+ `</tr>`;
				
			table.append(rows);
		});
	};
	return {
		init:function() {
			initFinancingAct();
		}
	}
}();

let InitCalculateFinancingActivities = function () {
	let initCalculate = function() {
		$("#financing-activities-tbl #calculate").on("click", function() {
			let total 			= 0;
			let monthy 			= 0;
			let recommended 	= 0;
			let exceed 			= 0;
			let income 			= parseFloat($("#income").val().trim());

			if ($("#income").val().trim() == '') { return false; }

			$("#financing-activities-tbl").find('input[type="number"]').each(function(){
				total += parseFloat($(this).val());
			});

			total 		= total.toFixed(2);
			monthly 	= (total / income) * 100;
			recommended = (0.2 * income);
			if (total > recommended) { exceed = total - recommended; }

			$("#financing-activities-tbl #total").empty().html(`₱ ${total}`);
			$("#financing-activities-tbl #monthly").empty().html(`${monthly.toFixed(2)}%`);
			$("#financing-activities-tbl #recommended").empty().html(`₱ ${recommended.toFixed(2)}`);
			$("#financing-activities-tbl #exceed").empty().html(`₱ ${exceed.toFixed(2)}`);

			InitializeIncomeAndExpenses.init();
		});
	};
	return {
		init: function() {
			initCalculate();
		}
	}
}();


// [end] Financing Activities

let InitializeTabActivities = function() {
	let initTab = function() {
		$("body").on("click", "a.nav-link", function(e) {
			e.preventDefault();

			let id = $(this).data('id');

			if (id == "cashflow") {
				$("div#emergency").addClass('d-none');
				$("div#cashflow").removeClass('d-none');
				$('ul li a.cashflow').addClass('active');
				$('ul li a.emergency').removeClass('active');
			}

			if (id == "emergency") {
				$("div#emergency").removeClass('d-none');
				$("div#cashflow").addClass('d-none');
				$('ul li a.cashflow').removeClass('active');
				$('ul li a.emergency').addClass('active');
			}
		});
 	};

 	return {
 		init:function() {
 			initTab();
 		}
 	}
}();

let InitalizeDeleteRow = function() {
	let initDelete = function() {
		$("body").on("click", "button.remove", function(e) {
			e.preventDefault();
			$(this).closest("tr").remove();
			$("#operating-activities-tbl #calculate").click();
			$("#investing-activities-tbl #calculate").click();
			$("#financing-activities-tbl #calculate").click();
		});
 	};

 	return {
 		init:function() {
 			initDelete();
 		}
 	}
}();





