let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let del = document.querySelector('.delete');
let start = document.querySelector('.start');
let answer = document.querySelector('.answer'); //stores previous answer
let equal = document.querySelector('.equal');
let result = document.querySelector('#result');
let newExpression = '';
let previousAnswer = '0';

// Add eventlistner on all number buttons
numbers.forEach((number) => {
	number.addEventListener('click', () => {
		//prevent multiple "." within the same expression
		if (number.textContent === '.' && newExpression.includes('.')) return;
		addToOutput(number.textContent);
		newExpression += number.textContent;
	});
});

//Add eventlistner on all operator buttons
operators.forEach((operator) => {
	operator.addEventListener('click', () => {
		newExpression = '';
		let operation = operator.textContent;

		switch (operation) {
			case 'sin':
				trigonometry('sin');
				break;
			case 'cos':
				trigonometry('cos');
				break;
			case 'tan':
				trigonometry('tan');
				break;
			case 'log':
				log();
				break;
			case '√':
				squareRoot();
				break;
			case 'x²':
				square();
				break;
			case 'x!':
				factorial();
				break;
			case 'x^':
				addToOutput('^');
				break;
			case 'π':
				pi();
				break;
			case '%':
				percent();
				break;
			case '±':
				plusMinus();
				break;
			case 'x':
				addToOutput('*');
				break;
			default:
				addToOutput(operator.textContent);
				break;
		}
	});
});

//DEL button function (backspace)
del.addEventListener('click', () => {
	if (result.textContent === '0') return;
	result.textContent = result.textContent.slice(0, -1);
	//if everything has been removed, restart with default 0
	if (result.textContent.length === 0) {
		result.textContent = '0';
	}
	newExpression = '';
});

//AC button function (on/clear)
start.addEventListener('click', () => {
	result.textContent = '0';
	newExpression = '';
});

//EQUAL button function (=)
equal.addEventListener('click', () => {
	newExpression = '';
	let output = result.textContent;

	//Add right parentheses if it is less than left parentheses
	for (let i = 0; i < output.split('(').length - output.split(')').length; i++) {
		output += ')';
	}
	//exponent
	if (output.includes('^')) {
		let base = output.slice(0, output.indexOf('^'));
		let exponent = output.slice(output.indexOf('^') + 1);
		result.textContent = eval(`Math.pow(${base}, ${exponent})`);
		//Modulo
	} else if (output.includes('mod')) {
		let dividend = output.slice(0, output.indexOf('m'));
		let divisor = output.slice(output.indexOf('d') + 1);
		result.textContent = eval(`${dividend}%${divisor}`);
	} else {
		result.textContent = eval(output);
	}
	errorChecker();
	previousAnswer = result.textContent;
});

//ANS button function (Ans) - return the previous answer to the screen
answer.addEventListener('click', () => {
	addToOutput(previousAnswer);
});

// Adding element to the screen
function addToOutput(element) {
	if (result.value === null || result.textContent === '0') {
		result.textContent = element;
	} else {
		result.textContent += element;
	}
}

// ALL OPERATORS FUNCTION
/*
Sin, Tan and cos expects input in radian so the input which is in degree need to be converted to radian using 
Math.sin(number * Math.PI/180.0)
https://stackoverflow.com/questions/22745229/how-do-i-use-math-sin-in-javascript-to-get-correct-answer
*/
function trigonometry(element) {
	let trigoFunction = '';
	if (element === 'sin') {
		trigoFunction = Math.sin;
	} else if (element === 'tan') {
		trigoFunction = Math.tan;
	} else {
		trigoFunction = Math.cos;
	}
	result.textContent = trigoFunction(result.textContent * Math.PI / 180.0).toFixed(10);
	errorChecker();
	previousAnswer = result.textContent;
}

function log() {
	result.textContent = Math.log10(result.textContent).toFixed(10);
	errorChecker();
	previousAnswer = result.textContent;
}
function squareRoot() {
	result.textContent = Math.sqrt(result.textContent);
	errorChecker();
	previousAnswer = result.textContent;
}
function square() {
	result.textContent = result.textContent * result.textContent;
	errorChecker();
	previousAnswer = result.textContent;
}
function factorial() {
	let number;
	let factorialResult = 1;
	//Check factorial for both positive and with '-' sign
	if (result.textContent.charAt(0) === '-') {
		number = result.textContent.slice(1);
	} else {
		number = result.textContent;
	}
	if (number <= 1) {
		factorialResult = '1';
	} else {
		for (let i = 2; i <= number; i++) {
			factorialResult *= i;
		}
	}
	if (result.textContent.charAt(0) === '-') {
		result.textContent = '-' + factorialResult;
	} else {
		result.textContent = factorialResult;
	}
	errorChecker();
	previousAnswer = result.textContent;
}
function pi() {
	if (result.textContent === null || result.textContent === '0') {
		result.textContent = Math.PI;
	} else {
		result.textContent = Math.PI * result.textContent;
	}
	errorChecker();
	previousAnswer = result.textContent;
}
function percent() {
	result.textContent = result.textContent / 100;
	errorChecker();
	previousAnswer = result.textContent;
}
function plusMinus() {
	if (result.textContent.charAt(0) === '-') {
		result.textContent = result.textContent.splice(1);
	} else {
		result.textContent = '-' + result.textContent;
	}
}

function errorChecker() {
	if (isNaN(result.textContent) || result.textContent === 'Infinity' || result.textContent.length === 0) {
		result.textContent = 'syntax error';
		previousAnswer = '0';
	}
}
