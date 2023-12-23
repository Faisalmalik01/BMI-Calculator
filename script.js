const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const height = parseFloat(document.querySelector("#height").value);
  const weight = parseFloat(document.querySelector("#weight").value);
  const results = document.querySelector("#results");
  const unitDropdown = document.querySelector("#unit").value;

  if (isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
    results.innerHTML = "Please enter valid height and weight values.";
  } else {
    let heightInMeters;

    if (unitDropdown === "feet") {
      heightInMeters = height * 0.3048; // Convert height from feet to meters
    } else {
      heightInMeters = height / 100; // Convert height from centimeters to meters
    }

    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    if (bmi < 18.5) {
      results.innerHTML = `${bmi} - Underweight`;
      results.style.color = "skyblue";
    } else if (bmi > 25.0) {
      results.innerHTML = `${bmi} - Overweight`;
      results.style.color = "rgb(247, 9, 9)";
    } else {
      results.innerHTML = `${bmi} - Normal`;
      results.style.color = "rgb(89, 216, 89)";
    }
  }
});

function changeUnit() {
  let unitDropdown = document.getElementById("unit");
  let heightInput = document.getElementById("height");
  let unitLabel = document.querySelector("label[for='height']");

  let heightValue = parseFloat(heightInput.value);

  if (unitDropdown.value === "feet") {
    heightInput.value = (heightValue / 30.48).toFixed(2);
    unitLabel.textContent = "Height in Feet:";
  } else {
    heightInput.value = (heightValue * 30.48).toFixed(2);
    unitLabel.textContent = "Height in CM:";
  }
}

const shareButton = document.getElementById("share-button");
shareButton.addEventListener("click", shareBMI);

function shareBMI() {
  const bmiResult = document.querySelector("#results").textContent;
  // console.log(bmiResult);
  const shareText = `My BMI is ${bmiResult}. Check yours too!`;
  // console.log(shareText);

  // Choose a sharing method:
  navigator
    .share({
      title: "My BMI Result",
      text: `${shareText} https://faisalmalik01.github.io/BMI-Calculator/`,
    })
    .then(() => console.log("Shared successfully"))
    .catch((error) => console.error("Error sharing:", error));
}
