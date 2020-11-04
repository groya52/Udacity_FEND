var color = $("#colorPicker").val();

function makeGrid() {
// Your code goes here!
	let rows = $('#input_height').val();
	let columns = $('#input_width').val();
	let table = $('table');

	table.empty();

	for (var i = 0; i < rows; i++) {
		let row = $('<tr>');
		table.append(row)
		for (var j = 0; j < columns; j++) {
			let cell = $('<td id='+i + '-'+ j + '>')
			row.append(cell);
		}
	}

	$('tr').css('height', '11px'); //8
	$('td').css('width', '8px'); //5
};

$(document).on('click', 'tr td', function(){ // mouseover
	$(this).css('background-color', color);
});

$(document).on('dblclick', 'tr td', function(){
	$(this).css('background-color', '#ffffff');
});

$(document).on('change', '#colorPicker', function(){
	color = $(this).val();
});

function clickTable(id) {
	$(id).click();
}

$(document).ready(function(){
	makeGrid();

	let x = 30;
	for (var i = 0; i < x; i++) {
		clickTable('#' + i + '-' + i);
		clickTable('#' + (x - 1 - i) + '-' + i);
	}

});
