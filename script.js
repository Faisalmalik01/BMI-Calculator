const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const height = parseFloat(document.querySelector("#height").value);
  const weight = parseFloat(document.querySelector("#weight").value);
  const results = document.querySelector("#results");
  const heightDropdown = document.querySelector("#getHeight").value;
  const weightDropdown = document.querySelector("#getWeight").value;

  if (isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
    results.innerHTML = "Please enter valid height and weight values.";
  } else {
    let heightInMeters;
    let weightInKg;

    if (heightDropdown === "feet") {
      heightInMeters = height * 0.3048; // Convert height from feet to meters
    } else {
      heightInMeters = height / 100; // Convert height from centimeters to meters
    }

    if(weightDropdown === "Pounds") {
      weightInKg = weight * 0.45359237; // convert weight from pounds to kg
    } else{
      weightInKg = weight; // Don't change weight
    }

    const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);

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
