const btnClear = document.getElementById("clearall-btn");
const btnClearNew = document.getElementById("clearnew-btn");
const newDisplay = document.getElementById("NEW");
const oldDisplay = document.getElementById("OLD");
const equalBtn = document.getElementById("equal-btn");
const backBtn = document.getElementById("back-btn");
let oldNumber = 0;
let operatorsign = "";

//numbers button
const numberBtn = document.querySelectorAll("#number-btn");
numberBtn.forEach((i) => {
  i.addEventListener("click", DisplayNumbers.bind(i));
});
//numbers button

//operators button
const operatorBtn = document.querySelectorAll("#operator-btn");
operatorBtn.forEach((i) => {
  i.addEventListener("click", DisplayOperator.bind(i));
});
//operators button

function CheckOld() {
  if (
    oldDisplay.textContent === "NaN" ||
    oldDisplay.textContent === "Infinity"
  ) {
    DeleteDisplay("all");
  }
}

function DisplayNumbers() {
  CheckOld();
  newDisplay.textContent += this.textContent;
}

function DisplayOperator() {
  CheckOld();
  // check if there is a chosen operator (if there skip)
  const textsign = oldDisplay.textContent.slice(-1);
  if (
    isNaN(parseInt(oldDisplay.textContent)) ||
    oldDisplay.textContent !== ""
  ) {
    // first if change operator if it already exist
    if (isNaN(parseInt(textsign)) && oldDisplay.textContent !== "") {
      oldDisplay.textContent = oldDisplay.textContent.slice(0, -1);
      oldDisplay.textContent += this.textContent;
    } else if (
      (newDisplay.textContent === "" && oldDisplay.textContent === "") ||
      (oldDisplay.textContent === "0" && oldNumber === 0)
    ) {
      DeleteDisplay("all");
    } else if (oldNumber === 0) {
      oldNumber = parseInt(newDisplay.textContent);
      oldDisplay.textContent = newDisplay.textContent + this.textContent;
      DeleteDisplay("new");
    } else if (oldNumber !== 0) {
      oldDisplay.textContent += this.textContent;
    }
  }
}

function equal() {
  if (newDisplay.textContent !== "") {
    IdendifyOperator();
    if (operatorsign === "+") {
      oldNumber = oldNumber + parseInt(newDisplay.textContent);
    } else if (operatorsign === "-") {
      oldNumber = oldNumber - parseInt(newDisplay.textContent);
    } else if (operatorsign === "*") {
      oldNumber = oldNumber * parseInt(newDisplay.textContent);
    } else if (operatorsign === "/") {
      oldNumber = oldNumber / parseInt(newDisplay.textContent);
    } else if (operatorsign === "%") {
      oldNumber = oldNumber % parseInt(newDisplay.textContent);
    }
    oldDisplay.textContent = oldNumber;
    DeleteDisplay("new");
  }
}

function IdendifyOperator() {
  oldText = oldDisplay.textContent;
  for (let i in oldText) {
    if (isNaN(parseInt(oldText[i]))) {
      operatorsign = oldText[i];
    }
  }
}

function DeleteDisplay(del) {
  if (del === "new") {
    newDisplay.textContent = "";
  } else if (del === "old") {
    oldDisplay.textContent = "";
  } else if (del === "back") {
    newDisplay.textContent = newDisplay.textContent.slice(0, -1);
  } else {
    oldDisplay.textContent = "";
    newDisplay.textContent = "";
    oldNumber = 0;
  }
}

backBtn.addEventListener("click", DeleteDisplay.bind(null, "back"));
btnClear.addEventListener("click", DeleteDisplay.bind(null, "all"));
btnClearNew.addEventListener("click", DeleteDisplay.bind(null, "new"));
equalBtn.addEventListener("click", equal);
