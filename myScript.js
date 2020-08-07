let display = document.getElementById("outputs");
let buttons = document.getElementsByClassName("button");
  
  Array.prototype.forEach.call(buttons, function(button) {
  button.addEventListener("click", function() {
    if (button.textContent != "=" && 
    button.textContent != "AC" && 
    button.textContent != "x" && 
    button.textContent != "÷" && 
    button.textContent != "√" && 
    button.textContent != "x²" && 
    button.textContent != "%" && 
    button.textContent != "<=" && 
    button.textContent != "±" && 
    button.textContent != "sin" && 
    button.textContent != "cos" && 
    button.textContent != "tan" && 
    button.textContent != "log" && 
    button.textContent != "ln" && 
    button.textContent != "x^" && 
    button.textContent != "x!" && 
    button.textContent != "π" && 
    button.textContent != "e" &&
    button.textContent != "DEL" &&
    button.textContent != "Ans" && 
    button.textContent != "mod" &&
    button.textContent != "rad" 
    && button.textContent != "∘") {
      display.innerHTML += button.textContent;
    } else if (button.textContent === "=") {
      equals();
    } else if (button.textContent === "AC") {
      clear();
    } else if (button.textContent === "x") {
      multiply();
    } else if (button.textContent === "÷") {
      divide();
    } else if (button.textContent === "±") {
      plusMinus();
    } else if (button.textContent === "<=") {
      backspace();
    } else if (button.textContent === "%") {
      percent();
    } else if (button.textContent === "π") {
      pi();
    } else if (button.textContent === "x²") {
      square();
    } else if (button.textContent === "√") {
      squareRoot();
    } else if (button.textContent === "sin") {
      sin();
    } else if (button.textContent === "cos") {
      cos();
    } else if (button.textContent === "tan") {
      tan();
    } else if (button.textContent === "log") {
      log();
    } else if (button.textContent === "ln") {
      ln();
    } else if (button.textContent === "x^") {
      exponent();
    } else if (button.textContent === "x!") {
      factorial();
    } else if (button.textContent === "e") {
      exp();
    } else if (button.textContent === "rad") {
      radians();
    } else if (button.textContent === "∘") {
      degrees();
    }
    else if (button.textContent === "DEL") {
      deleteLast();
    }
    /*else if (button.textContent === "Ans") {
      answer();
    }*/
  });
});


function syntaxError() {
  if (eval(display.innerHTML) == SyntaxError || eval(display.innerHTML) == ReferenceError || eval(display.innerHTML) == TypeError) {
    display.innerHTML == "Syntax Error";
  }
}


function equals() {
  if ((display.innerHTML).indexOf("^") > -1) {
    var base = (display.innerHTML).slice(0, (display.innerHTML).indexOf("^"));
    var exponent = (display.innerHTML).slice((display.innerHTML).indexOf("^") + 1);
    display.innerHTML = eval("Math.pow(" + base + "," + exponent + ")");
  } else {
    display.innerHTML = eval(display.innerHTML)
    checkLength()
    syntaxError()
  }
}

function clear() {
  display.innerHTML = 0;
}

function backspace() {
  display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
}

function multiply() {
  display.innerHTML += "*";
}

function divide() {
  display.innerHTML +=  "/";
}

function plusMinus() {
  if (display.innerHTML.charAt(0) === "-") {
    display.innerHTML = display.innerHTML.slice(1);
  } else {
    display.innerHTML = "-" + display.innerHTML;
  }
}

function factorial() {
  var number = 1;
  if (display.innerHTML === 0) {
    display.innerHTML = "1";
  } else if (display.innerHTML < 0) {
    display.innerHTML = "undefined";
  } else {
    var number = 1;
    for (var i = display.innerHTML; i > 0; i--) {
      number *=  i;
    }
    display.innerHTML = number;
  }
}

function pi() {
  display.innerHTML = (display.innerHTML * Math.PI);
}

function square() {
  display.innerHTML = eval(display.innerHTML * display.innerHTML);
}

function squareRoot() {
  display.innerHTML = Math.sqrt(display.innerHTML);
}

function percent() {
  display.innerHTML = display.innerHTML / 100;
}

function sin() {
  display.innerHTML = Math.sin(display.innerHTML);
}

function cos() {
  display.innerHTML = Math.cos(display.innerHTML);
}

function tan() {
  display.innerHTML = Math.tan(display.innerHTML);
}

function log() {
  display.innerHTML = Math.log10(display.innerHTML);
}

function ln() {
  display.innerHTML = Math.log(display.innerHTML);
}

function exponent() {
  display.innerHTML += "^";
}

function exp() {
  display.innerHTML = Math.exp(display.innerHTML);
}

function radians() {
  display.innerHTML = display.innerHTML * (Math.PI / 180);
}

function degrees() {
  display.innerHTML = display.innerHTML * (180 / Math.PI);
}

function deleteLast() {
  if(display.innerHTML.length === 1){
    display.innerHTML = 0;
  }else{
    display.innerHTML = display.innerHTML.slice(0, -1);
  }
}
