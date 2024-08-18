const firstInput = document.getElementById("first-number-input");
const secondInput = document.getElementById("second-number-input");
const calculateButton = document.getElementById("button");

firstInput.onkeydown = function (event) {
  if (isNaN(event.key) && event.key !== "Backspace") {
    event.preventDefault();
  }
};

secondInput.onkeydown = function (event) {
  if (isNaN(event.key) && event.key !== "Backspace") {
    event.preventDefault();
  }
};

calculateButton.addEventListener("click", () => {
  const firstNumber = firstInput.value;
  const secondNumber = secondInput.value;

  if (firstNumber && secondNumber) {
    calculateSum(firstNumber, secondNumber);
  }
});

const calculateSum = function (firstNumber, secondNumber) {
  fetch(
    `http://localhost:3001/sums/calculate?firstNumber=${firstNumber}&secondNumber=${secondNumber}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstNumber: parseFloat(firstNumber),
        secondNumber: parseFloat(secondNumber),
      }),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("There are some server problems");
      }
    })
    .then((data) => {
      const mainDiv = document.getElementById("main-div");
      const sumDiv = document.getElementById("sum-div");

      sumDiv.innerText = `${data}`;
      mainDiv.appendChild(sumDiv);

      clearContext();
    })
    .catch((error) => {
      console.error("Fetch error:", error.message);
    });
};

function clearContext() {
  const sumDiv = document.getElementById("sum-div");
  firstInput.value = "";
  secondInput.value = "";
  sumDiv.value = "";
}
