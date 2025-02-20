var slider = document.getElementById("myRange");
var fahrenheitOutput = document.getElementById("fahrenheit");
var celsiusOutput = document.getElementById("celsius");
fahrenheitOutput.innerHTML = slider.value + "° F";

celsiusOutput.innerHTML = ((Number(slider.value) - 32) * (5/9)).toFixed(0) + "° C";

slider.oninput = function () {
	fahrenheitOutput.innerHTML = this.value + "° F";
	celsiusOutput.innerHTML = ((Number(this.value) - 32) * (5/9)).toFixed(0) + "° C";
};