window.onload = init;
/*
TODOS:
	-edit GUI so that it shows up better on phone & other browsers
	-show result of chaining operations (3 + 6 will show 9 once another operator is entered)
		-maybe should current chain below main display
	-allow for negative subtracted from negative (-6 - -4 should be -2)
	-replace eval() with parser (maybe)
	-what was isNumber() for?
*/
function init(){
	var display = document.getElementsByClassName('text-display');
	calculate(display[0]);
	solar_hover(display[0]);
}

function calculate(screen){
	var mem;
	var resultArr = [];
	var symbols = ['+', '-', '*', '/'];

	var operations = {
		'MRC': function(){ screen.innerHTML = mem; },
		'M-': function(){ mem = ''; console.log(mem); },
		'M+': function(){ mem = screen.innerHTML; console.log(mem); },
		'CE/C': function(){ clear_screen(); clear_result(); },
		'√': function(){ square_root(); },
		'exponent': function(){},
		'=': function(){ equals(); },
		'Del': function(){ backspace(); },
		'%': function(){ percent(); },
		'n<sup>2</sup>': function(){ exponent(); },
		'<sup>+</sup>/<sub>-</sub>': function(){ negate(); }
	}

	var buttons = document.getElementsByTagName('button');
	for(var x = 0; x < buttons.length; x++){
		buttons[x].addEventListener('click', input, false);
	}

	function input(){
		var val = this.innerHTML;
		if(screen.innerHTML.length > 12){
			screen.innerHTML = 'error';
		}
		if(val in operations){
			// delete not working?
			operations[val]();
		} else if(symbols.indexOf(val) > -1){
			operate(val);
			clear_screen();
		} else {
			screen.innerHTML += val;
		}
	}

	function negate(){
		screen.innerHTML = screen.innerHTML * -1;
	}

	function square_root(){
		var result = Math.sqrt(screen.innerHTML);
		if(result.toString().length > 12){
			screen.innerHTML = result.toFixed(10);
		} else {
			screen.innerHTML = result;
		}
	}

	function exponent(){
		var result = Math.pow(screen.innerHTML, 2);
		if(result.toString().length > 12){
			screen.innerHTML = 'error';
		} else {
			screen.innerHTML = result;
		}
	}

	function percent(){
		var initial = resultArr[0];
		screen.innerHTML = (initial * screen.innerHTML / 100);
	}

	function backspace(){
		screen.innerHTML = screen.innerHTML.slice(0, -1);
	}

	function clear_screen(){
		while(screen.firstChild){
			screen.removeChild(screen.firstChild);
		}
	}

	function clear_result(){
		resultArr = [];
	}

	function equals(){
		if(screen.innerHTML !== '' || screen.innerHTML !== resultArr[resultArr.length - 1]){
			resultArr.push(screen.innerHTML);
		}
		var result = (resultArr.join(''));
		resultArr = [];
		console.log(result);
		screen.innerHTML = eval(result);
	}

	function operate(input){
		if(screen.innerHTML !== ''){
			resultArr.push(screen.innerHTML, input);
		}
	}

	function isNumber(input){
		if(typeof(input) === typeof(1)){
			return true;
		}
		return false;
	}

	// not used yet, need in place of eval()
	function parseResult(str){
		var total = 0;
		var str = str.match(/[-+\u002a\u002f]*(\.\d+|\d+(\.\d+)?)/g);
		while(str.length){
			total += parseFloat(str.shift());
		}
		return total;
	}
	//end
}

function solar_hover(screen){
	var solarCell = document.getElementsByClassName('solar-cell');
	solarCell[0].addEventListener('mouseover', darken, false);
	solarCell[0].addEventListener('mouseout', lighten, false);

	function darken(){
		screen.style.color = '#abab93';
	}

	function lighten(){
		screen.style.color = '#000';
	}
	//end
}
