
function commaSeparator(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let InitiaizeCalculateEmergencyFund = function() {
	let initializeCalculate = function() {
		let minimum = $("#fund-minimum").val().trim();
		let maximum = $("#fund-maximum").val().trim();
		let actual 	= $("#fund-actual").val().trim();
		let minimumgap = 0;

		if (minimum == '' || maximum == '' || actual == '') { return false; }

		minimumgap = parseFloat(actual) - parseFloat(minimum);
		$("#minimum-ef-gap").empty().html(`₱ ${commaSeparator(minimumgap.toFixed(2))}`);
	}
	return {
		init: function() {
			initializeCalculate();
		}
	};
}();
// [end] Initialize emergency fund calc

let InitalizeCalculateProtectionRequirement = function() {
	let initializeCalculate = function() {
		let recommended = $("#protect-recommended").val().trim();
		let total 		= 0;
		let sub_total 	= 0;
		let gap 		= 0;

		$("#protection-fund-tbl").find('input[type="number"]').each(function(){
			if ($(this).val().trim() !== 0 || $(this).val().trim() !== '') {
				total += parseFloat($(this).val());	
			}
		});

		recommended = parseFloat(recommended);
		gap = total - recommended; 

		$("#protection-total").empty().html(`₱ ${commaSeparator(total.toFixed(2))}`);
		$("#insurance-gap").empty().html(`₱ ${commaSeparator(gap.toFixed(2))}`);

	}
	return {
		init: function() {
			initializeCalculate();
		}
	};
}();
// [end] Initialize protection requirement

let InitializeCalculateCriticalIllness = function() {
	let initializeCalculate = function() {
		let recommended = $("#critical-recommended").val().trim();
		let actual 		= $("#critical-actual").val().trim();
		let gap 		= 0;

		if ((recommended == 0 || recommended == '') || (actual == 0 || actual == '')) {
			return false;
		} 
		gap = actual - recommended;
		$("#illness-gap").empty().html(`₱ ${commaSeparator(gap.toFixed(2))}`)

	}
	return {
		init: function() {
			initializeCalculate();
		}
	};
}();
// [end] Initialize critical illness coverage

